'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'; // أضفنا useState
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Menu, X } from 'lucide-react'; // أضفنا أيقونة X للغلق

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: 'contact' },
  ];

  return (
    <header className="sticky bg-Dark shadow-2xl ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <Image src={'/logosvg.png'} width={100} height={100} alt="Logo" />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      className="text-slate-50 transition hover:text-slate-50/75"
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-hover cursor-pointer text-Text rounded-full font-medium text-sm px-4 py-2 hover:bg-primary transition-all">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-primary cursor-pointer text-Text rounded-full font-medium text-sm px-4 py-2 hover:bg-hover transition-all hidden sm:block">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <Link
                href={'/dashboard'}
                className="border border-slate-300 text-Text hover:border-indigo-600 hover:text-gray-300 text-sm  px-2 py-1 md:text-md  md:px-6 md:py-3 rounded-lg font-medium transition"
              >
                Go To Dashboard
              </Link>

              <div className="block md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="rounded-md bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200"
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-Dark border-t border-gray-700">
          <ul className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block px-3 py-2 text-slate-50 hover:bg-gray-800 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <SignedOut>
              <div className="pt-2">
                <SignUpButton mode="modal">
                  <button className="w-full bg-primary text-white rounded-md py-2 text-sm">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
