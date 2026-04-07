export const dynamic = 'force-dynamic';

import { fetchCourses } from '../../_utils/axios';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { getProgress } from '../../_utils/progressApis';

export default async function CoursePage({ params }: { params: any }) {
  const { id } = await params;

  // 1. تعريف متغيرات الداتا بره عشان نستخدمها بعد الـ try/catch
  let targetLessonId: string | number | null = null;
  let hasError = false;

  try {
    const [user, courses] = await Promise.all([
      currentUser(),
      fetchCourses()
    ]);

    if (!courses || !Array.isArray(courses)) {
      hasError = true;
    } else {
      const course = courses.find((c: { id: number }) => c.id === parseInt(id));

      if (!course) {
        notFound();
      }

      const lessons = course?.lessons?.sort((a: any, b: any) => a.order - b.order) || [];

      if (lessons.length === 0) {
        return <p className="p-10 text-center">No lessons available</p>;
      }

      // تحديد الدرس الأول كافتراضي
      targetLessonId = lessons[0].id;

      if (user) {
        const progressData = await getProgress(user.id, id);
        const completed = progressData?.completedLessons || [];

        if (completed.length > 0) {
          const lastCompletedId = completed[completed.length - 1];
          const currentIndex = lessons.findIndex((l: any) => l.id === Number(lastCompletedId));

          targetLessonId = (currentIndex !== -1 && currentIndex < lessons.length - 1)
            ? lessons[currentIndex + 1].id
            : lastCompletedId;
        }
      }
    }
  } catch (error) {
    // لو الـ error سببه redirect سيبه يكمل طريقه (متمسكوش)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error("Fetch Error:", error);
    hasError = true;
  }

  // 2. معالجة حالة الخطأ الحقيقي (بعيداً عن الـ redirect)
  if (hasError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-xl font-bold text-red-500">Opps</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  // 3. الـ Redirect النهائي (لازم يكون بره الـ try/catch)
  if (targetLessonId) {
    redirect(`/courses/${id}/lessons/${targetLessonId}`);
  }

  return null;
}