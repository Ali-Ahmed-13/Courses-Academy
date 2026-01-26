'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, PlayCircle, Menu, X } from 'lucide-react';

export default function LessonsSidebar({
  id,
  lessons,
  activeLessonId,
  completedLessons = [],
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-white border-r p-5 transition-transform duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:shrink-0 h-screen overflow-y-auto
      `}
      >
        <h2 className="font-bold text-xl mb-5 mt-10 md:mt-0">Course Content</h2>

        <div className="flex flex-col gap-2">
          {[...lessons]
            .sort((a, b) => a.order - b.order)
            .map((lesson) => {
              const isCompleted = completedLessons.includes(Number(lesson.id));
              const isActive = parseInt(activeLessonId) === lesson.id;

              return (
                <Link
                  key={lesson.id}
                  href={`/courses/${id}/lessons/${lesson.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-lg transition ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <PlayCircle className="w-5 h-5 opacity-50" />
                    )}
                    <span className="text-sm font-medium">{lesson.title}</span>
                  </div>

                  {isActive && (
                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}
