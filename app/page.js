'use client';

import { useEffect, useState } from 'react';
import Hero from './_components/Hero';
import FeaturedCourses from './_components/FeaturedCourses';
import { fetchCourses } from './_utils/axios';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Hero />
      <FeaturedCourses courses={courses} loading={loading} />
    </>
  );
}
