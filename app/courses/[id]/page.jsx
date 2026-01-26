import { fetchCourses } from '../../_utils/axios';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { getProgress } from '@/app/_utils/progressApis';

export default async function CoursePage({ params }) {
  const { id } = await params;

  const [user, courses] = await Promise.all([currentUser(), fetchCourses()]);

  const course = courses.find((c) => c.id === parseInt(id));

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
}
