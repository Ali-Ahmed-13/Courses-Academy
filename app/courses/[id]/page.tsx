export const dynamic = 'force-dynamic'; // الحل السحري لتخطي مشاكل الـ Build

import { fetchCourses } from '../../_utils/axios';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { getProgress } from '../../_utils/progressApis';

export default async function CoursePage({ params }: { params: any }) {
  const { id } = await params;

  // تغليف الكود بـ try/catch عشان لو الـ API مقفول وقت الـ Build ميفشلش المشروع كله
  try {
    const [user, courses] = await Promise.all([
      currentUser(),
      fetchCourses()
    ]);

    // التأكد من وجود بيانات الكورسات
    if (!courses || !Array.isArray(courses)) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p>عذراً، لا يمكن تحميل بيانات الكورسات حالياً.</p>
        </div>
      );
    }

    const course = courses.find((c: { id: number }) => c.id === parseInt(id));

    if (!course) {
      notFound();
    }

    const lessons =
      course?.lessons?.sort(
        (a: { order: number }, b: { order: number }) => a.order - b.order
      ) || [];

    if (lessons.length === 0) return <p className="p-5 text-center">No lessons available for this course.</p>;

    let targetLessonId = lessons[0].id;

    // منطق الـ Progress والـ User
    if (user) {
      const progressData = await getProgress(user.id, id);
      const completed = progressData?.completedLessons || [];

      if (completed.length > 0) {
        const lastCompletedId = completed[completed.length - 1];
        const currentIndex = lessons.findIndex(
          (l: { id: number }) => l.id === Number(lastCompletedId)
        );

        if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
          targetLessonId = lessons[currentIndex + 1].id;
        } else {
          targetLessonId = lastCompletedId;
        }
      }
    }

    // الـ Redirect هيشتغل هنا في الـ Runtime بس بفضل force-dynamic
    redirect(`/courses/${id}/lessons/${targetLessonId}`);

  } catch (error) {
    console.error("Error in CoursePage:", error);
    // رسالة خطأ بسيطة تظهر للمستخدم بدلاً من انهيار الموقع
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-xl font-bold">Opps</h2>
        <p>Please try again later.</p>
      </div>
    );
  }
}