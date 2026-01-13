import Link from 'next/link';

export default function CourseCard({ course }) {
  const { title, price, level, id, thumbnail } = course
    ? { ...course, id: course.id }
    : course;
  const imageUrl = thumbnail?.formats?.medium?.url || thumbnail?.url;

  return (
    <Link href={`/courses/${id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-44 w-full object-cover"
          />
        )}
        <div className="p-5 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <p className="text-sm text-slate-500">{level}</p>
          <div className="flex justify-between items-center pt-3">
            <span className="font-bold text-indigo-600">
              {price === 0 ? 'Free' : `$${price}`}
            </span>
            <span className="text-sm text-indigo-600 hover:underline">
              View Course →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
