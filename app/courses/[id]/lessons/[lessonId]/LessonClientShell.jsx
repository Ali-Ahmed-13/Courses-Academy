'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Smile,
  Menu,
  X,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    getProgress(user.id, courseId).then((data) => {
      setProgressData(data);

      setCompletedLessons(data?.completedLessons || []);
    });
  }, [user, courseId]);

  if (!isLoaded) return <div className="min-h-screen bg-slate-50" />;

  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);

  const isLocked =
    currentIndex > 0 &&
    !completedLessons.includes(Number(lessons[currentIndex - 1].id));

  if (!user) {
    return (
      <div className="p-10 text-center text-2xl md:text-4xl mt-20 w-full font-bold text-slate-800">
        Please Login First <Smile className="inline ml-2" />
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-slate-50 relative overflow-x-hidden">
      {/* Mobile/Tablet Fixed Toggle Button */}

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-60 flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all active:scale-90 border-4 border-white"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar Drawer */}

      <aside
        className={`

        fixed inset-y-0 left-0 z-50 w-70 bg-white border-r shadow-2xl transform transition-transform duration-300 ease-out

        lg:relative lg:translate-x-0 lg:shadow-none lg:z-0

        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}

      `}
      >
        <LessonsSidebar
          id={courseId}
          lessons={lessons}
          activeLessonId={lessonId}
          completedLessons={completedLessons}
        />
      </aside>

      {/* Background Overlay */}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:px-10">
        {isLocked ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center bg-white rounded-3xl border p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Lesson Locked 🔒
            </h2>

            <p className="text-slate-500">
              Please complete the previous lessons to unlock this content.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header Section */}

            <header className="flex flex-col gap-3">
              <nav className="flex items-center gap-2 text-sm font-medium text-slate-400">
                <Link href="/courses" className="hover:text-indigo-600">
                  Courses
                </Link>

                <span>/</span>

                <span className="text-slate-600 truncate">
                  Lesson {currentIndex + 1}
                </span>
              </nav>

              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                {lesson.title}
              </h1>
            </header>

            {/* Progress Bar Wrapper */}

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              {progressData ? (
                <LessonProgress
                  userId={user.id}
                  courseId={courseId}
                  lessonId={lesson.id}
                  totalLessons={lessons.length}
                />
              ) : (
                <div className="h-2 w-full bg-slate-100 rounded-full animate-pulse" />
              )}
            </div>

            {/* Video Player Section */}

            {lesson.videoUrl && (
              <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-white ring-1 ring-slate-200">
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.videoUrl}`}
                  title="Lesson Video"
                  className="w-full h-full"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            )}

            {/* Navigation Buttons */}

            <div className="flex flex-col sm:flex-row gap-4">
              {prevLesson && (
                <Link
                  href={`/courses/${courseId}/lessons/${prevLesson.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <ChevronLeft size={20} /> Previous
                </Link>
              )}

              {nextLesson ? (
                <Link
                  href={`/courses/${courseId}/lessons/${nextLesson.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                >
                  Next Lesson <ChevronRight size={20} />
                </Link>
              ) : (
                <div className="flex-1 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-center font-bold">
                  All lessons completed! 🎉
                </div>
              )}
            </div>

            {/* Improved Final Exam / Quiz Section */}

            {hasQuiz && (
              <section className="mt-16 bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-900 p-8 text-white flex flex-col items-center sm:items-start sm:flex-row sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Final Quiz 📝</h2>

                    <p className="text-slate-400 text-sm mt-1">
                      Test your knowledge to earn your certificate.
                    </p>
                  </div>

                  <div className="px-4 py-2 bg-white/10 rounded-full text-xs font-mono uppercase tracking-widest">
                    Assessment
                  </div>
                </div>

                <div className="p-6 md:p-10">
                  <Quiz questions={quiz} />
                </div>
              </section>
            )}

            {/* Certificate Section */}

            {progressData?.certificateIssued && (
              <div className="py-10 flex justify-center">
                <Link
                  href={`/certificate/${courseId}`}
                  className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-700 text-white font-black shadow-xl hover:shadow-indigo-200 transition-all hover:-translate-y-1"
                >
                  <GraduationCap size={28} />
                  Claim Certificate 🎓
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
