import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center">
              <span className="text-job-blue font-bold text-xl">JobConnect</span>
            </Link>
            <p className="mt-2 text-sm text-job-light-text">
              Connecting talented professionals with exciting career opportunities.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-job-text tracking-wider uppercase">For Job Seekers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-job-light-text hover:text-job-blue">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-job-light-text hover:text-job-blue">
                  Create Profile
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-job-light-text hover:text-job-blue">
                  Job Alerts
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-job-light-text hover:text-job-blue">
                  Career Resources
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-job-text tracking-wider uppercase">For Employers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/post-job" className="text-sm text-job-light-text hover:text-job-blue">
                  Post a Job
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-job-light-text hover:text-job-blue">
                  Browse Candidates
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-job-light-text hover:text-job-blue">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-job-light-text hover:text-job-blue">
                  Recruitment Tools
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-job-text tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-job-light-text hover:text-job-blue">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-job-light-text hover:text-job-blue">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-job-light-text hover:text-job-blue">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-job-light-text hover:text-job-blue">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-job-light-text hover:text-job-text">
              Privacy
            </a>
            <a href="#" className="text-job-light-text hover:text-job-text">
              Terms
            </a>
            <a href="#" className="text-job-light-text hover:text-job-text">
              Contact
            </a>
          </div>
          <p className="mt-8 text-sm text-job-light-text md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} JobConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer