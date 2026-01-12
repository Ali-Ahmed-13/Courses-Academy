'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, ShieldCheck, Zap, Users, Code } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: 'Interactive Learning',
    description:
      'Experience smooth lesson transitions and real-time progress tracking.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
    title: 'Official Certification',
    description:
      'Earn verified certificates upon passing our R-T-F framework assessments.',
  },
  {
    icon: <Code className="w-6 h-6 text-indigo-500" />,
    title: 'Built for Developers',
    description:
      'Powered by the latest tech stack: Next.js 15, Strapi CMS, and Clerk Auth.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-slate-900 mb-6"
          >
            Empowering the Next Generation of{' '}
            <span className="text-indigo-600">AI Experts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Our platform provides a structured path to mastering Generative AI
            through practical frameworks like R-T-F, ensuring you stay ahead in
            the rapidly evolving tech landscape.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-8 border rounded-3xl bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-4xl font-bold text-indigo-600 mb-2">10+</h3>
            <p className="text-slate-500 font-medium">Expert Courses</p>
          </div>
          <div className="p-8 border rounded-3xl bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-4xl font-bold text-indigo-600 mb-2">1k+</h3>
            <p className="text-slate-500 font-medium">Active Students</p>
          </div>
          <div className="p-8 border rounded-3xl bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-4xl font-bold text-indigo-600 mb-2">100%</h3>
            <p className="text-slate-500 font-medium">Project Based</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Learn With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 bg-indigo-600 rounded-[3rem] p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to start your AI journey?
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of learners and get certified in Advanced Prompting
            and Generative AI today.
          </p>
          <Link href="/courses">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl"
            >
              Browse All Courses
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
