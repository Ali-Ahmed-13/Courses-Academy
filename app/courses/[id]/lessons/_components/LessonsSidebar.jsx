// LessonsSidebar.jsx
'use client';
import Link from 'next/link';
import { CheckCircle, PlayCircle } from 'lucide-react';

export default function LessonsSidebar({ id, lessons, activeLessonId, completedLessons = [] }) {
  return (
    <div className="w-full bg-white h-full p-5 overflow-y-auto">
      <h2 className="font-bold text-xl mb-5">Course Content</h2>
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
                className={`flex items-center justify-between p-3 rounded-lg transition ${
                  isActive ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCompleted ? <CheckCircle className="w-5 h-5 text-green-500" /> : <PlayCircle className="w-5 h-5 opacity-50" />}
                  <span className="text-sm font-medium">{lesson.title}</span>
                </div>
                {isActive && <div className="w-2 h-2 bg-indigo-600 rounded-full" />}
              </Link>
            );
          })}
      </div>
    </div>
  );
}