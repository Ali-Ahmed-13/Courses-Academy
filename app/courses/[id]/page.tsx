export const dynamic = 'force-dynamic';

import { fetchCourses } from '../../_utils/axios';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { getProgress } from '../../_utils/progressApis';

export default async function CoursePage({ params }: { params: any }) {
  const { id } = await params;

  try {
    // حاول تجيب البيانات
    const [user, courses] = await Promise.all([currentUser(), fetchCourses()]);

    if (!courses) {
      return <div>لا توجد بيانات حالياً.</div>;
    }

    const course = courses.find((c: { id: number }) => c.id === parseInt(id));
    if (!course) notFound();

    const lessons =
      course?.lessons?.sort((a: any, b: any) => a.order - b.order) || [];
    if (lessons.length === 0) return <p>No lessons available</p>;

    let targetLessonId = lessons[0].id;

    if (user) {
      const progressData = await getProgress(user.id, id);
      if (progressData?.completedLessons?.length > 0) {
        const completed = progressData.completedLessons;
        const lastCompletedId = completed[completed.length - 1];
        const currentIndex = lessons.findIndex(
          (l: any) => l.id === Number(lastCompletedId)
        );
        targetLessonId =
          currentIndex !== -1 && currentIndex < lessons.length - 1
            ? lessons[currentIndex + 1].id
            : lastCompletedId;
      }
    }

    redirect(`/courses/${id}/lessons/${targetLessonId}`);
  } catch (error: any) {
    // هنا السر: اطبع الخطأ عشان تشوفه في الـ Runtime Logs في Vercel
    console.error('CRITICAL_ERROR:', error.message);

    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-xl font-bold">Erorr in loading</h2>
        <p className="text-sm text-gray-500">{error.message}</p>
        <p>Please try again later.</p>
      </div>
    );
  }
}
