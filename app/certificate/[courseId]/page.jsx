import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { fetchCourses } from '@/app/_utils/axios';
import { notFound } from 'next/navigation';
import PrintButton from '../_components/PrintButton'; 

export default async function Certificate({ params }) {
  const { courseId } = await params;
  const user = await currentUser();
  const courses = await fetchCourses();
  const course = courses.find((c) => c.id === parseInt(courseId));

  if (!course) notFound();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      {/* منطقة الشهادة */}
      <div
        id="certificate-area"
        className="bg-white p-16 rounded-none shadow-2xl text-center border-[15px] border-double border-indigo-600 max-w-4xl w-full relative"
      >
        <div className="absolute top-5 right-5 opacity-10 text-indigo-600 text-6xl font-bold">
          OFFICIAL
        </div>

        <h1 className="text-5xl font-serif font-bold mb-8 text-indigo-900 italic">
          Certificate of Completion
        </h1>

        <p className="text-xl text-gray-600">This certifies that</p>

        <h2 className="text-4xl font-serif font-bold mt-4 text-slate-800 underline decoration-indigo-200 decoration-4 underline-offset-8">
          {user?.fullName || 'Student Name'}
        </h2>

        <p className="mt-8 text-xl text-gray-600">
          has successfully completed the course
        </p>

        <h3 className="text-2xl font-bold mt-4 text-indigo-700 uppercase tracking-wide">
          {course.title}
        </h3>

        <div className="mt-12 flex justify-between items-end px-10">
          <div className="text-left">
            <p className="text-sm text-gray-400">Date Issued</p>
            <p className="font-bold">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Instructor Signature</p>
            <p className="font-serif italic border-t border-gray-300 mt-1 px-4">
              AI Academy Team
            </p>
          </div>
        </div>
      </div>

      <PrintButton />
    </div>
  );
}
