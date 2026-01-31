'use client';
import { useEffect, useState, useRef } from 'react';
import {
  getProgress,
  createProgress,
  updateProgress,
} from '@/app/_utils/progressApis';

export default function LessonProgress({
  userId,
  courseId,
  lessonId,
  Certificate,
  totalLessons,
}) {
  const [progress, setProgress] = useState(0);
  const lastProcessedLesson = useRef(null);
  const isSyncing = useRef(false);

  useEffect(() => {
    if (!userId || !courseId || !lessonId || !totalLessons) return;

    const updateUserProgress = async () => {
      if (isSyncing.current) return;

      isSyncing.current = true;

      try {
        const currentLesson = Number(lessonId);
        const existingData = await getProgress(userId, courseId);

        if (existingData) {
          const previousLessons = (existingData.completedLessons || []).map(Number);
          const isLessonAlreadyCompleted = previousLessons.includes(currentLesson);

          // شرط تحديث الشهادة: إذا كانت true في الـ props و false في الداتابيز
          const needsCertificateUpdate = Certificate && !existingData.certificateIssued;

          if (!isLessonAlreadyCompleted || needsCertificateUpdate) {
            const updatedLessons = isLessonAlreadyCompleted
              ? previousLessons
              : [...previousLessons, currentLesson];

            const newProgress = (updatedLessons.length / totalLessons) * 100;

            await updateProgress(existingData.documentId || existingData.id, {
              completedLessons: updatedLessons,
              progress: newProgress,
              certificateIssued: Certificate ? true : !!existingData.certificateIssued,
            });

            setProgress(newProgress);
          } else {
            // تحديث الـ state فقط إذا كانت القيمة مختلفة فعلياً لتجنب الـ Infinite Loop
            if (progress !== existingData.progress) {
              setProgress(existingData.progress);
            }
          }
        } else {
          const newProgress = (1 / totalLessons) * 100;
          await createProgress({
            userId,
            courseId,
            completedLessons: [currentLesson],
            progress: newProgress,
            certificateIssued: !!Certificate,
          });
          setProgress(newProgress);
        }
      } catch (error) {
        console.error("Progress Sync Error:", error);
      } finally {
        isSyncing.current = false;
      }
    };

    updateUserProgress();

  }, [userId, courseId, lessonId, Certificate, totalLessons]);

  return (
    <div className="mb-6 w-full mx-auto">
      <div className="w-full flex justify-between text-sm text-slate-500 mb-1">
        <span>Course Progress</span>
        <span className="font-bold text-indigo-600">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}