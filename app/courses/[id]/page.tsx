export const dynamic = 'force-dynamic';

import { fetchCourses } from '../../_utils/axios';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { getProgress } from '../../_utils/progressApis';

export default async function CoursePage({ params }: { params: any }) {
  const { id } = await params;

  // تعريف المتغيرات بره عشان نستخدمها بعد الـ try/catch
  let targetLessonId: string | number | null = null;
  let errorDetail = '';

  try {
    const [user, coursesData] = await Promise.all([
      currentUser(),
      fetchCourses(),
    ]);

    // معالجة شكل بيانات Strapi (سواء راجعة Array مباشر أو جوه .data)
    const courses = Array.isArray(coursesData)
      ? coursesData
      : coursesData?.data || [];

    if (!courses || courses.length === 0) {
      errorDetail = 'API returned an empty courses list.';
    } else {
      // البحث عن الكورس مع تحويل الـ IDs لـ Strings لتجنب مشاكل النوع (Type Mismatch)
      const course = courses.find((c: any) => String(c.id) === String(id));

      if (!course) {
        // لو مش لاقي الكورس، اعرض الـ IDs المتاحة عشان تعرف المشكلة فين
        const availableIds = courses.map((c: any) => c.id).join(', ');
        return (
          <div className="flex flex-col justify-center items-center h-screen text-center p-5">
            <h2 className="text-xl font-bold text-red-500">Course Not Found</h2>
            <p className="mt-2 text-gray-600">
              Requested ID:{' '}
              <span className="font-mono bg-gray-100 px-1">{id}</span>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Available IDs in Database: [{availableIds}]
            </p>
            <p className="mt-4 text-xs">
              تأكد أن البيانات في Strapi Production هي نفس البيانات محلياً.
            </p>
          </div>
        );
      }

      // ترتيب الدروس
      const lessons =
        course?.lessons?.sort((a: any, b: any) => a.order - b.order) || [];

      if (lessons.length === 0) {
        return (
          <div className="flex justify-center items-center h-screen">
            <p>هذا الكورس لا يحتوي على دروس حالياً.</p>
          </div>
        );
      }

      // تحديد الدرس المستهدف (الافتراضي هو الأول)
      targetLessonId = lessons[0].id;

      // لو اليوزر مسجل دخول، هات تقدمه الدراسي
      if (user) {
        try {
          const progressData = await getProgress(user.id, id);
          const completed = progressData?.completedLessons || [];

          if (completed.length > 0) {
            const lastCompletedId = completed[completed.length - 1];
            const currentIndex = lessons.findIndex(
              (l: any) => l.id === Number(lastCompletedId)
            );

            // اذهب للدرس التالي، أو ابقَ في الأخير لو خلصت كله
            targetLessonId =
              currentIndex !== -1 && currentIndex < lessons.length - 1
                ? lessons[currentIndex + 1].id
                : lastCompletedId;
          }
        } catch (progErr) {
          console.error('Progress API Error:', progErr);
          // سيب targetLessonId زي ما هو (أول درس) لو فشل الـ Progress
        }
      }
    }
  } catch (error: any) {
    // تجاهل خطأ الـ Redirect الخاص بـ Next.js
    if (error.digest?.startsWith('NEXT_REDIRECT')) throw error;

    console.error('Detailed Fetch Error:', error);
    errorDetail = error.message || 'Unknown Connection Error';
  }

  // معالجة حالة الخطأ في جلب البيانات
  if (errorDetail) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-5">
        <h2 className="text-xl font-bold text-red-600">
          Opps! Connection Error
        </h2>
        <div className="bg-gray-100 p-4 mt-4 rounded text-xs font-mono">
          {errorDetail}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          تأكد من إعدادات الـ Environment Variables (API URL) في Vercel.
        </p>
      </div>
    );
  }

  // تنفيذ التحويل النهائي
  if (targetLessonId) {
    redirect(`/courses/${id}/lessons/${targetLessonId}`);
  }

  return null;
}
