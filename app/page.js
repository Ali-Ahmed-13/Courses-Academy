'use client';

import { useEffect, useState } from 'react';
import Hero from './_components/Hero';
import FeaturedCourses from './_components/FeaturedCourses';
import { fetchCourses } from './_utils/axios';
import { domAnimation, LazyMotion } from 'framer-motion';

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
      <LazyMotion features={domAnimation}>
        <Hero />
      </LazyMotion>

      <FeaturedCourses courses={courses} loading={loading} />
    </>
  );
}
