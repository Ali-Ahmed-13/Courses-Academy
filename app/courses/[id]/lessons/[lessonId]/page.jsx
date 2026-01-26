import { fetchCourseById } from '../../../../_utils/axios';
import LessonClientShell from './LessonClientShell';

export default async function LessonPage({ params }) {
  const { id, lessonId } = await params;

  const course = await fetchCourseById(id);
  const lessons = course?.lessons || [];
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  const currentIndex = sortedLessons.findIndex((l) => l.id == lessonId);

  const lesson = sortedLessons[currentIndex];
  if (!lesson) return <p className="p-10">Lesson not found</p>;

  const prevLesson = sortedLessons[currentIndex - 1];
  const nextLesson = sortedLessons[currentIndex + 1];

  return (
    <div className="flex">
      <LessonClientShell
        courseId={id}
        lessons={sortedLessons}
        lesson={lesson}
        lessonId={lessonId}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        hasQuiz={!!course.quiz}
        quiz={course.quiz}
      />
    </div>
  );
}
