'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Smile, Menu, X, GraduationCap } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { getProgress } from '../../../../_utils/progressApis';
import LessonHeader from '../_components/LessonHeader';
import LessonNav from '../_components/LessonNav';
import LessonVideo from '../_components/LessonVideo';
import LessonProgress from '../_components/LessonProgress';

export interface LessonProps {
  id: any;
  order: number;
  title: string;
  videoUrl: string;
}

interface QuizProps {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

interface LessonClientShellProps {
  userId: string;
  courseId: string;
  lessons: LessonProps[];
  lesson: LessonProps;
  lessonId: string;
  prevLesson: LessonProps | null;
  nextLesson: LessonProps | null;
  hasQuiz: boolean;
  quiz: QuizProps[];
}

interface DynamicQuizProps {
  questions: QuizProps[];
  setCertificate: (val: boolean) => void;
  onComplete?: any;
}

interface DynamicSidebarProps {
  id: string;
  lessons: LessonProps[];
  activeLessonId: string;
  completedLessons: string[];
}

const Quiz = dynamic<DynamicQuizProps>(
  () => import('../_components/Quiz') as any,
  {
    ssr: false,
    loading: () => (
      <div className="h-40 animate-pulse bg-slate-100 rounded-xl" />
    ),
  }
);

const LessonsSidebar = dynamic<DynamicSidebarProps>(
  () => import('../_components/LessonsSidebar') as any,
  {
    ssr: false,
  }
);

export default function LessonClientShell({
  userId,
  courseId,
  lessons,
  lesson,
  lessonId,
  prevLesson,
  nextLesson,
  hasQuiz,
  quiz,
}: LessonClientShellProps) {
  const { isLoaded } = useUser();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [progressData, setProgressData] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [Certificate, setCertificate] = useState(false);

  useEffect(() => {
    if (!userId || !courseId) return;

    getProgress(userId, courseId).then((data: any) => {
      setProgressData(data);
      setCompletedLessons((data?.completedLessons || []).map(Number));
    });
  }, [userId, courseId]);

  if (!isLoaded) return <div className="min-h-screen bg-slate-50" />;

  const currentIndex = lessons.findIndex(
    (l) => Number(l.id) === Number(lessonId)
  );

  const isLocked =
    currentIndex > 0 &&
    !completedLessons.includes(Number(lessons[currentIndex - 1].id));

  if (!userId) {
    return (
      <div className="p-10 text-center text-2xl md:text-4xl mt-20 w-full font-bold text-slate-800">
        Please Login First <Smile className="inline ml-2" />
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-slate-50 relative overflow-x-hidden">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-60 flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 transition-all active:scale-90 border-4 border-white"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r shadow-2xl transform transition-transform duration-300 ease-out lg:relative lg:translate-x-0 lg:shadow-none lg:z-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <LessonsSidebar
          id={courseId}
          lessons={lessons}
          activeLessonId={lessonId}
          completedLessons={completedLessons.map(String)}
        />
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

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
            <LessonHeader currentIndex={currentIndex} lesson={lesson} />

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <LessonProgress
                userId={userId}
                courseId={courseId}
                lessonId={lesson.id}
                Certificate={Certificate}
                totalLessons={lessons.length}
              />
            </div>

            <LessonVideo videoUrl={lesson.videoUrl} />

            <LessonNav
              courseId={courseId}
              nextLesson={nextLesson}
              prevLesson={prevLesson}
            />

            {hasQuiz && (
              <section className="mt-16 bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden w-auto">
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
                <div className="p-6 md:p-10 text-center">
                  <Quiz questions={quiz} setCertificate={setCertificate} />
                </div>
              </section>
            )}

            {progressData?.certificateIssued && Certificate && (
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
