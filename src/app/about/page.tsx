import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-job-blue mb-6 text-center">
          About JobConnect
        </h1>
        
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6 lg:p-8">
          <p className="text-job-text mb-6">
            JobConnect is a leading job board platform connecting talented professionals with exciting
            career opportunities. Our mission is to make the job search process simple, efficient, and
            effective for both job seekers and employers.
          </p>
          
          <h2 className="text-xl font-semibold text-job-blue mb-4">For Job Seekers</h2>
          <p className="text-job-text mb-6">
            We offer a seamless job search experience with advanced filtering options, allowing you to
            find the perfect match for your skills and career goals. Whether you're looking for remote work,
            flexible hours, or a specific industry, our platform helps you discover opportunities that align
            with your preferences.
          </p>
          
          <h2 className="text-xl font-semibold text-job-blue mb-4">For Employers</h2>
          <p className="text-job-text mb-6">
            Posting jobs on our platform gives you access to a diverse talent pool. Our user-friendly
            interface makes it easy to create detailed job listings that attract qualified candidates.
            We provide analytics and insights to help you optimize your recruitment process.
          </p>
          
          <div className="mt-8 p-6 bg-job-light-blue rounded-lg">
            <h3 className="text-lg font-semibold text-job-blue mb-3">Why Choose JobConnect?</h3>
            <ul className="space-y-2 text-job-text">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-job-blue mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Extensive database of job opportunities across industries</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-job-blue mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>User-friendly interface with advanced search and filter options</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-job-blue mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Dedicated support for both job seekers and employers</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-job-blue mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Regular updates with new features and improvements</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-job-blue mb-3">Ready to get started?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <Link href="/" className="btn-primary">
                Browse Jobs
              </Link>
              <Link href="/post-job" className="btn-secondary">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page