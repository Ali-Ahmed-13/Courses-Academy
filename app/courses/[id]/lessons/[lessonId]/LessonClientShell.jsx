// app/courses/[id]/lessons/[lessonId]/LessonClientShell.jsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Smile } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { getProgress } from '@/app/_utils/progressApis';
import LessonProgress from '../_components/LessonProgress';
import Quiz from '../_components/Quiz';

const LessonsSidebar = dynamic(() => import('../_components/LessonsSidebar'), {
  ssr: false,
});

export default function LessonClientShell({
  courseId,
  lessons,
  lesson,
  lessonId,
  prevLesson,
  nextLesson,
  hasQuiz,
  quiz,
}) {
  const { user, isLoaded } = useUser();
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    if (!user) return;

    getProgress(user.id, courseId).then((data) => {
      setProgressData(data);
      setCompletedLessons(data?.completedLessons || []);
    });
  }, [user, courseId]);

  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);

  const isLocked =
    currentIndex > 0 &&
    !completedLessons.includes(Number(lessons[currentIndex - 1].id));

  if (!isLoaded) return null;

  if (!user) {
    return (
      <div className="p-10 text-center text-4xl mt-20 w-full">
        Please Login First <Smile className="inline ml-2" />
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block w-65 shrink-0">
        <LessonsSidebar
          id={courseId}
          lessons={lessons}
          activeLessonId={lessonId}
          completedLessons={completedLessons}
        />
      </div>

      <main className="flex flex-col gap-4 items-center w-full p-10">
        {isLocked ? (
          <div className="flex flex-col items-center mt-20 gap-4">
            <h2 className="text-2xl font-bold text-slate-800">
              This lesson is locked 🔒
            </h2>
            <p className="text-slate-500">
              Please complete the previous lesson first.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

            <div className="h-16 w-full max-w-4xl">
              {progressData ? (
                <LessonProgress
                  userId={user.id}
                  courseId={courseId}
                  lessonId={lesson.id}
                  totalLessons={lessons.length}
                />
              ) : (
                <div className="h-full w-full rounded-lg bg-slate-200 animate-pulse" />
              )}
            </div>

            {lesson.videoUrl && (
              <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl border bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.videoUrl}`}
                  title="Lesson Video"
                  className="w-full h-full"
                  loading="lazy"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}

            <div className="flex flex-col items-center w-full mt-8">
              <div className="min-h-14">
                {prevLesson && (
                  <Link
                    href={`/courses/${courseId}/lessons/${prevLesson.id}`}
                    className="px-5 py-3 rounded-xl border hover:bg-slate-100 m-2"
                  >
                    ← {prevLesson.title}
                  </Link>
                )}
              </div>

              <div className="min-h-14">
                {nextLesson ? (
                  <Link
                    href={`/courses/${courseId}/lessons/${nextLesson.id}`}
                    className="px-5 py-3 rounded-xl bg-indigo-600 text-white m-2"
                  >
                    Next Lesson →
                  </Link>
                ) : (
                  <>
                    <button className="px-5 py-3 rounded-xl bg-green-600 text-white font-bold m-3 cursor-default">
                      Course Lessons Completed! 🎉
                    </button>

                    {hasQuiz && (
                      <div className="mt-10 w-full min-h-75 border-t pt-10 flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-5">
                          Final Exam 📝
                        </h2>
                        <Quiz questions={quiz} />
                      </div>
                    )}

                    {progressData?.certificateIssued && (
                      <Link
                        href={`/certificate/${courseId}`}
                        className="p-5 rounded-xl bg-indigo-700 text-white hover:bg-indigo-800 font-bold m-3"
                      >
                        Get the Certificate 🎓
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
