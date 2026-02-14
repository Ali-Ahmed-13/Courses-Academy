import { currentUser } from '@clerk/nextjs/server';
import { getUserAllProgress } from '../_utils/progressApis';
import DashboardProgressCard from './_components/DashboardProgressCard';
import { LayoutDashboard, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Item {
  course: {
    id: number;
    title: string;
  };
  progress: number;
}

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="p-10 text-center text-2xl">
        Please log in first
      </div>
    );
  }

  const userProgressList = await getUserAllProgress(user.id);

  return (
    <div className="p-8 max-w-7xl mx-auto h-lvh">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
      </div>

      {userProgressList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProgressList.map((item: Item) => (
            <DashboardProgressCard key={item.course.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed">
          <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg">
            You haven't started any courses yet.
          </p>
          <Link
            href="/courses"
            className="mt-4 text-indigo-600 font-medium hover:underline"
          >
            Browse available courses here
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
