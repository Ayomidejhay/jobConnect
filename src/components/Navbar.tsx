"use client"

import Link from 'next/link';
import React, { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-job-blue font-bold text-2xl">
                JobConnect
              </span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/joblisting" className="text-job-text hover:text-job-blue px-3 py-2 font-medium">
                Find Jobs
              </Link>
              <Link href="/postjob" className="text-job-text hover:text-job-blue px-3 py-2 font-medium">
                Post a Job
              </Link>
              <Link href="/about" className="text-job-text hover:text-job-blue px-3 py-2 font-medium">
                About
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/signin" className="text-job-text hover:text-job-blue font-medium">
              Sign In
            </Link>
            <Link href="/auth/signup" className="btn-primary">
              Sign Up
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/joblisting" 
            className="text-job-text hover:text-job-blue block px-3 py-2 rounded-md font-medium"
            onClick={() => setIsOpen(false)}
          >
            Find Jobs
          </Link>
          <Link 
            href="/postjob" 
            className="text-job-text hover:text-job-blue block px-3 py-2 rounded-md font-medium"
            onClick={() => setIsOpen(false)}
          >
            Post a Job
          </Link>
          <Link 
            href="/about" 
            className="text-job-text hover:text-job-blue block px-3 py-2 rounded-md font-medium"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="px-2 space-y-1">
            <Link
              href="/auth/signin"
              className="block px-3 py-2 rounded-md text-base font-medium text-job-text hover:text-job-blue"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="block px-3 py-2 rounded-md text-base font-medium bg-job-blue text-white hover:bg-job-dark-blue text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar