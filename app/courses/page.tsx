import CourseCard from '../_components/CourseCard';
import { Course } from '../_components/FeaturedCourses';
import { getCourses } from '../page';

export default async function Courses() {
  const courses = await getCourses();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Our Courses</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.data.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
