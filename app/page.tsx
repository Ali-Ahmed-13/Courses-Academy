import Hero from './_components/Hero';
import FeaturedCourses from './_components/FeaturedCourses';

export async function getCourses() {
  const baseUrl = process.env.API_URL;
  const endpoint = `${baseUrl}/courses?populate=*`;

  const res = await fetch(endpoint, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Erorr');
  }
  return res.json();
}
export default async function Home() {
  const courses = await getCourses();
  return (
    <div>
      <Hero />
      <FeaturedCourses courses={courses.data} loading={false} />
    </div>
  );
}
