import LessonsSidebar from '../_components/LessonsSidebar';
import { fetchCourseById } from '../../../../_utils/axios';
import { getProgress, updateProgress } from '@/app/_utils/progressApis';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { Smile } from 'lucide-react';
import LessonProgress from '../_components/LessonProgress';
import Quiz from '../_components/Quiz';

export default async function LessonPage({ params }) {
  const user = await currentUser();
  const { id, lessonId } = await params;
  const course = await fetchCourseById(id);
  const lessons = course?.lessons || [];
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  let progressData = null;
  let completedLessons = [];

  if (user) {
    progressData = await getProgress(user.id, id);
    completedLessons = progressData?.completedLessons || [];
  }

  const currentIndex = sortedLessons.findIndex(
    (l) => l.id === parseInt(lessonId)
  );
  const lesson = sortedLessons[currentIndex];
  if (!lesson) return <p className="p-10">Lesson not found</p>;

  const isLocked =
    currentIndex > 0 &&
    !completedLessons.includes(Number(sortedLessons[currentIndex - 1].id));
  const isLastLesson = currentIndex === sortedLessons.length - 1;
  const prevLesson = sortedLessons[currentIndex - 1];
  const nextLesson = sortedLessons[currentIndex + 1];

  return (
    <>
      {user && (
        <div className="flex">
          <LessonsSidebar
            id={id}
            lessons={sortedLessons}
            activeLessonId={lessonId}
            completedLessons={completedLessons}
          />

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
                <LessonProgress
                  userId={user.id}
                  courseId={id}
                  lessonId={lesson.id}
                  totalLessons={lessons.length}
                />

                {lesson.videoUrl && (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${lesson.videoUrl}`}
                    title="Video"
                    className="rounded-lg shadow-lg"
                    allowFullScreen
                  ></iframe>
                )}

                <div className="flex justify-between items-center flex-col w-full max-w-140 mt-8">
                  {prevLesson && (
                    <Link
                      href={`/courses/${id}/lessons/${prevLesson.id}`}
                      className="px-5 py-3 rounded-xl border hover:bg-slate-100 m-2"
                    >
                      ← {prevLesson.title}
                    </Link>
                  )}

                  {nextLesson ? (
                    <Link
                      href={`/courses/${id}/lessons/${nextLesson.id}`}
                      className="px-5 py-3 rounded-xl bg-indigo-600 text-white m-2"
                    >
                      Next Lesson →
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center">
                      <button className="px-5 py-3 rounded-xl bg-green-600 text-white font-bold m-3 cursor-default">
                        Course Lessons Completed! 🎉
                      </button>

                      {course.quiz && (
                        <div className="mt-10 w-full border-t pt-10 flex flex-col items-center">
                          <h2 className="text-2xl font-bold mb-5">
                            Final Exam 📝
                          </h2>
                          <Quiz questions={course.quiz} />
                        </div>
                      )}

                      {progressData?.certificateIssued && (
                        <Link
                          href={`/certificate/${id}`}
                          className="p-5 rounded-xl bg-indigo-700 text-white hover:bg-indigo-800 transition font-bold m-3"
                        >
                          Get the Certificate 🎓
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      )}
      {!user && (
        <div className="p-10 text-center text-4xl mt-20">
          Please Login First <Smile className="inline ml-2" />
        </div>
      )}
    </>
  );
}
