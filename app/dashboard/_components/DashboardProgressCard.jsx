import Link from 'next/link';

export default function DashboardProgressCard({ item }) {
  const course = item.course;
  const progress = Math.round(item.progress || 0);

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
      <h3 className="font-bold text-lg mb-2 line-clamp-1">{course?.title}</h3>

      <div className="flex justify-between text-sm text-slate-500 mb-2">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Link
        href={`/courses/${course?.id}`}
        className="block text-center w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
      >
        {progress === 100 ? 'Course review' : 'Continue learning'}
      </Link>
    </div>
  );
}
