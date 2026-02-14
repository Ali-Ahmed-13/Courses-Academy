import Link from 'next/link';

interface CourseProps {
  course: {
    id: number | string;
    title: string;
    price: number;
    level?: string;
    thumbnail?: {
      url: string;
      formats?: {
        medium?: {
          url: string;
        };
      };
    };
  };
}

export default function CourseCard({ course }: CourseProps) {
  const title = course?.title;
  const price = course?.price;
  const level = course?.level;
  const id = course?.id;

  const imageUrl =
    course?.thumbnail?.formats?.medium?.url ||
    course?.thumbnail?.url ||
    '/placeholder-image.jpg';

  return (
    <Link href={`/courses/${id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer h-full border border-slate-100">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-44 w-full object-cover"
          />
        )}
        <div className="p-5 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 text-slate-800">
            {title}
          </h3>
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
