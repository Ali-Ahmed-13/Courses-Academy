'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import Link from 'next/link';
import { domAnimation, LazyMotion } from 'framer-motion';

export default function Hero() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-slate-50 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-25 -left-25 w-75 h-75 bg-indigo-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute -bottom-30 -right-30 w-75 h-75 bg-purple-200 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
              🔥 New Courses
            </span>

            <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              Learn Anything, Anytime
            </h1>

            <p className="mt-4 text-lg text-slate-500 max-w-md">
              High quality courses with real projects to boost your skills and
              career.
            </p>

            <div className="flex gap-4 mt-8">
              <Link href="/courses">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Browse Courses
                </m.button>
              </Link>
            </div>
          </m.div>

          {/* Right Image */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Image
              src="/hero.png"
              alt="Students learning on laptop"
              width={520}
              height={420}
              className="rounded-xl"
              priority
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
