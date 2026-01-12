'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  getProgress,
  updateProgress,
  createProgress,
} from '@/app/_utils/progressApis';

export default function LessonProgress({
  userId,
  courseId,
  lessonId,
  totalLessons,
}) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const isSyncing = useRef(false);

  useEffect(() => {
    const syncProgress = async () => {
      if (isSyncing.current) return;
      isSyncing.current = true;

      try {
        const currentLessonId = Number(lessonId);
        const record = await getProgress(userId, courseId);

        if (!record) {
          const percent = (1 / totalLessons) * 100;
          await createProgress({
            userId,
            course: courseId,
            completedLessons: [currentLessonId],
            progress: percent,
          });
          setProgress(percent);
          router.refresh();
        } else {
          const docId = record.documentId;
          let completed = record.completedLessons || [];
          completed = completed.map((id) => Number(id));

          if (!completed.includes(currentLessonId)) {
            const updatedCompleted = [...completed, currentLessonId];
            const percent = (updatedCompleted.length / totalLessons) * 100;

            const updateData = {
              completedLessons: updatedCompleted,
              progress: percent,
            };

            if (percent === 100) {
              updateData.certificateIssued = true;
            }

            await updateProgress(docId, updateData);

            setProgress(percent);
            router.refresh();
          } else {
            const percent = (completed.length / totalLessons) * 100;
            setProgress(percent);
          }
        }
      } catch (error) {
        console.error('Sync Error:', error);
      } finally {
        isSyncing.current = false;
      }
    };

    if (userId && courseId && lessonId) {
      syncProgress();
    }
  }, [lessonId, userId, courseId, router]);

  return (
    <div className="mb-6 w-full max-w-md">
      <div className="flex justify-between text-sm text-slate-500 mb-1">
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
