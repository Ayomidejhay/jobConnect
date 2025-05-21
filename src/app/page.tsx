'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import JobListing from "./joblisting/page";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', searchTerm);
    // In a real app, this would update the filters on the job listings
  };

  return (
     <div>
      <div className="bg-gradient-to-r from-job-blue to-job-dark-blue py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 animate-fade-in">
              Find Your Dream Job Today
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Browse thousands of job opportunities and take the next step in your career journey
            </p>
            
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow bg-white rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="pl-10 pr-4 py-3 w-full rounded-md border-0 shadow-sm focus:ring-job-accent focus:border-job-accent"
                    placeholder="Job title, company, or keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-job-accent hover:bg-orange-600 text-white px-6 py-3 font-medium rounded-md shadow-sm transition-colors"
                >
                  Search Jobs
                </button>
              </div>
            </form>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="text-blue-100">Popular searches:</span>
              <a href="#" className="text-blue-100 hover:text-white hover:underline">Developer</a>
              <a href="#" className="text-blue-100 hover:text-white hover:underline">Designer</a>
              <a href="#" className="text-blue-100 hover:text-white hover:underline">Marketing</a>
              <a href="#" className="text-blue-100 hover:text-white hover:underline">Remote</a>
              <a href="#" className="text-blue-100 hover:text-white hover:underline">Part-time</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl font-semibold text-job-text mb-6 text-center">
            Trusted by leading companies worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center">
                <div className="h-12 w-24 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500 font-medium">Company {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <JobListing />
      
      <div className="bg-job-light-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-job-blue">
                For Employers
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-job-text">
                Looking to hire? Post your job opening to reach thousands of qualified candidates.
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/post-job"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-job-blue hover:bg-job-dark-blue"
                >
                  Post a Job
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-job-blue bg-white hover:bg-gray-50"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
