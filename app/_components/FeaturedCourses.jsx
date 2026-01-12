'use client';

import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import { useEffect, useState } from 'react';

export default function FeaturedCourses({ courses }) {
  let [modernCourses, setModernCourses] = useState([]);
  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      setModernCourses((prev) => [...prev, courses[1]]);
    }
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900">
            Featured Courses
          </h2>
          <p className="mt-3 text-slate-500">
            Hand-picked courses to get you started.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
