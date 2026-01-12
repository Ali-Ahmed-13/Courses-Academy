'use client';

import { motion } from 'framer-motion';
import CourseCard from './../_components/CourseCard';
import { useEffect, useState } from 'react';
import { fetchCourses } from '../_utils/axios';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then(setCourses);
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
            Our Courses
          </h2>
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
