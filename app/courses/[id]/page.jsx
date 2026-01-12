import Link from 'next/link';
import { fetchCourses } from '../../_utils/axios';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { Smile } from 'lucide-react';
import { getProgress } from '@/app/_utils/progressApis';
import Image from 'next/image';

export default async function CoursePage({ params }) {
  const { id } = await params;

  const user = await currentUser();

  const courses = await fetchCourses();

  const course = courses.find((c) => c.id === parseInt(id));

  const { title, slug, thumbnail } = course;

  const imageUrl = thumbnail?.medium?.url || thumbnail?.url;

  if (!course) {
    notFound();
  }

  const lessons = course?.lessons?.sort((a, b) => a.order - b.order) || [];

  if (lessons.length === 0) return <p>No lessons available</p>;

  let targetLessonId = lessons[0].id;

  if (user) {
    const progressData = await getProgress(user.id, id);
    const completed = progressData?.completedLessons || [];

    if (completed.length > 0) {
      const lastCompletedId = completed[completed.length - 1];
      const currentIndex = lessons.findIndex(
        (l) => l.id === Number(lastCompletedId)
      );

      if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
        targetLessonId = lessons[currentIndex + 1].id;
      } else {
        targetLessonId = lastCompletedId;
      }
    }
  }

  redirect(`/courses/${id}/lessons/${targetLessonId}`);

  return (
    <>
      <div
        className="flex flex-row gap-4 max-w-5xl mx-auto px-6 py-20"
        style={{ flexDirection: 'column' }}
      >
        <div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>

          {imageUrl && (
            <Image
              src={`http://localhost:1337${imageUrl}`}
              alt="title"
              width={150}
              height={130}
              unoptimized
              className="rounded-t-lg  object-cover w-1/2 mx-auto rounded-xl mb-6"
            />
          )}

          <p className="text-slate-500 whitespace-pre-line mb-6">{slug}</p>

          <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
          <ul className="space-y-3">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <span>
                    {lesson.order}. {lesson.title}
                  </span>
                  <span className="text-sm text-slate-500">
                    {lesson.duration} min
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {lessons?.length > 0 && (
          <Link
            href={user ? `/courses/${id}/lessons/${lessons[0].id}` : ''}
            className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl "
          >
            Start Learning →
          </Link>
        )}
        {!user && (
          <h1 className="text-red-800  flex justify-center items-center gap-1">
            Sign In First <Smile />
          </h1>
        )}
      </div>
    </>
  );
}
