'use client';

import { useEffect, useState } from 'react';
import Hero from './_components/Hero';
import FeaturedCourses from './_components/FeaturedCourses';
import { fetchCourses } from './_utils/axios';

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then(setCourses);
  }, []);

  return (
    <>
      <Hero />
      {courses.length > 0 && <FeaturedCourses courses={courses} />}
    </>
  );
}
