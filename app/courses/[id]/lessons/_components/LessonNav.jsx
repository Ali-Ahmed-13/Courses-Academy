import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LessonNav({ prevLesson, nextLesson, courseId }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {prevLesson && (
        <Link
          href={`/courses/${courseId}/lessons/${prevLesson.id}`}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 transition-all"
        >
          <ChevronLeft size={20} /> Previous
        </Link>
      )}

      {nextLesson ? (
        <Link
          href={`/courses/${courseId}/lessons/${nextLesson.id}`}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
        >
          Next Lesson <ChevronRight size={20} />
        </Link>
      ) : (
        <div className="flex-1 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-center font-bold">
          All lessons completed! 🎉
        </div>
      )}
    </div>
  );
}
