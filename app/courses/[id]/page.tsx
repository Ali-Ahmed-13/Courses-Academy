export const dynamic = 'force-dynamic';

import { fetchCourses } from '../../_utils/axios';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { getProgress } from '../../_utils/progressApis';

export default async function CoursePage({ params }: { params: any }) {
  const { id } = await params;

  // 1. تعريف متغيرات الداتا بره عشان نستخدمها بعد الـ try/catch
  let targetLessonId: string | number | null = null;

  try {
    const [user, courses] = await Promise.all([currentUser(), fetchCourses()]);

    if (!courses || !Array.isArray(courses)) {
      return <div>عذراً، لا يمكن تحميل الكورسات حالياً.</div>;
    }

    const course = courses.find((c: { id: number }) => c.id === parseInt(id));
    if (!course) notFound();

    const lessons =
      course?.lessons?.sort((a: any, b: any) => a.order - b.order) || [];
    if (lessons.length === 0) return <p>No lessons available</p>;

    // تحديد الدرس الأول كافتراضي
    targetLessonId = lessons[0].id;

    if (user) {
      const progressData = await getProgress(user.id, id);
      const completed = progressData?.completedLessons || [];

      if (completed.length > 0) {
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
  } catch (error) {
    console.error('Fetch Error:', error);
    // لو حصل مشكلة في الداتا، اعرض رسالة الخطأ هنا
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-xl font-bold">Opps</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  // 2. الـ Redirect لازم يكون بره الـ try/catch تماماً
  if (targetLessonId) {
    redirect(`/courses/${id}/lessons/${targetLessonId}`);
  }
}
