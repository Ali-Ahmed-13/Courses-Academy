export default function CourseSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-44 w-full bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-200 rounded-md w-3/4" />
        <div className="h-4 bg-slate-200 rounded-md w-1/4" />
        <div className="flex justify-between items-center pt-3">
          <div className="h-6 bg-slate-200 rounded-md w-16" />
          <div className="h-4 bg-slate-200 rounded-md w-20" />
        </div>
      </div>
    </div>
  );
}