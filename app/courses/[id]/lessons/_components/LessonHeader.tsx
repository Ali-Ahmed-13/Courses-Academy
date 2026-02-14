import Link from 'next/link';

export default function LessonHeader({
  lesson,
  currentIndex,
}: {
  lesson: any;
  currentIndex: number;
}) {
  return (
    <header className="flex flex-col gap-3">
      <nav className="flex items-center gap-2 text-sm font-medium text-slate-400">
        <Link href="/courses" className="hover:text-indigo-600">
          Courses
        </Link>

        <span>/</span>

        <span className="text-slate-600 truncate">
          Lesson {currentIndex + 1}
        </span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
        {lesson.title}
      </h1>
    </header>
  );
}
