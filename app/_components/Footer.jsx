'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const footerLinks = [
    { name: 'Courses', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const socialLinks = [
    { label: 'Facebook', icon: <Facebook className="size-6" />, href: '#' },
    { label: 'Instagram', icon: <Instagram className="size-6" />, href: '#' },
    { label: 'Twitter', icon: <Twitter className="size-6" />, href: '#' },
  ];

  return (
    <footer className="bg-Dark relative bottom-0 left-0 w-full h-auto">
      <div className="mx-auto max-w-5xl px-4 py-1 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Image src={'/logosvg.png'} width={100} height={100} alt="Logo" />
        </div>

        <nav className="mt-1">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="my-5 flex justify-center gap-6 md:gap-8">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <Link
                href={social.href}
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
              >
                <span className="sr-only">{social.label}</span>
                {social.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
