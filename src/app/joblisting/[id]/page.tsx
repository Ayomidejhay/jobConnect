"use client"

import { getJobPostById } from "@/app/appwrite";
import { getJobById, mockJobs } from "@/data/jobData";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Job } from "@/types";


import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser, loading: authLoading } = useAuth();
  

  useEffect(() => {
    const fetchJob = async () => {
      // Wait for authentication status to be determined
      if (authLoading) {
        return;
      }

      // If not authenticated, redirect to login page
      if (!currentUser) {
        router.push('/auth/signin');
        return; // Stop execution
      }

      // If ID is not available (e.g., direct navigation without ID), set error
      if (!id) {
        setError("Job ID is missing in the URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        type JobPostByIdResult = {
          success: boolean;
          data?: Job;
          message?: string;
        };
        const result = await getJobPostById(id.toString()) as JobPostByIdResult; // Ensure ID is a string and type
        if (result.success) {
          setJob(result.data!);
        } else {
          setError(result.message || "Failed to load job details.");
        }
      } catch (err: any) {
        setError(`An unexpected error occurred: ${err.message}`);
        console.error("Error fetching job details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob(); // Call the fetch function
  }, [id, authLoading, currentUser, router]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Loading...</h2>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <p className="mb-6">The job listing you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className="btn-primary">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center text-job-blue hover:text-job-dark-blue"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Jobs
        </button>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6 lg:p-8">
        <div className="lg:flex lg:items-start lg:justify-between">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 h-20 w-20 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={job.logo || "/placeholder.svg"} 
                alt={`${job?.company} logo`} 
                className="h-full w-full object-contain p-2"
              />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-job-blue">{job?.title}</h1>
              <p className="text-lg text-job-text mt-1">{job?.company}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-sm text-job-light-text flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
                <span className="text-sm text-job-light-text flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Posted {calculateDaysAgo(job?.$createdAt)}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <div className={`badge ${getLocationTypeBadgeColor(job?.locationType)}`}>
                  {job?.locationType}
                </div>
                <div className="badge badge-blue">
                  {job?.jobType}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-3">
            <div className="text-xl font-semibold text-job-text">{job?.salary}</div>
            <button className="btn-accent">
              Apply Now
            </button>
            <button className="btn-secondary">
              Save Job
            </button>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-100 pt-8">
          <h2 className="text-xl font-semibold text-job-blue mb-4">Job Description</h2>
          <div className="prose max-w-none text-job-text">
            <p>{job.description}</p>
          </div>
          
          <h2 className="text-xl font-semibold text-job-blue mt-8 mb-4">Requirements</h2>
          <ul className="list-disc pl-5 space-y-2 text-job-text">
           {/* job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}*/}
            {job?.requirements && job?.requirements.length > 0 && (
              job?.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))
            )}
          </ul>
          
          <h2 className="text-xl font-semibold text-job-blue mt-8 mb-4">Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2 text-job-text">
            {job?.responsibilities && job?.responsibilities.length > 0 && (
              job?.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))
            )}
          </ul>
          
          {job?.applicationDeadline && (
            <div className="mt-8 p-4 bg-job-light-blue rounded-lg">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-job-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-job-blue font-medium">
                  Application Deadline: {formatDate(job.applicationDeadline)}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 border-t border-gray-100 pt-8 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium text-job-blue">Share this job</h3>
            <div className="mt-2 flex space-x-4">
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
          <button className="btn-accent">
            Apply Now
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-job-blue mb-4">Similar Jobs</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {mockJobs.slice(0, 3).map((similarJob) => (
            <Link
              key={similarJob.id}
              href={`/joblisting/${similarJob.id}`}
              className="bg-white shadow-sm rounded-lg border border-gray-100 p-4 hover:shadow-md hover:border-blue-100 transition duration-200"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={similarJob.logo || "/placeholder.svg"} 
                    alt={`${similarJob.company} logo`} 
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-job-blue">{similarJob.title}</h3>
                  <p className="text-sm text-job-text">{similarJob.company}</p>
                  <p className="text-xs text-job-light-text mt-1">{similarJob.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function calculateDaysAgo(dateString: string): string {
  const postedDate = new Date(dateString);
  const currentDate = new Date();
  
  // Calculate the difference in days
  const diffTime = currentDate.getTime() - postedDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} days ago`;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function getLocationTypeBadgeColor(locationType: 'Remote' | 'Hybrid' | 'On-site'): string {
  switch (locationType) {
    case 'Remote':
      return 'badge-green';
    case 'Hybrid':
      return 'badge-yellow';
    case 'On-site':
      return 'badge-purple';
    default:
      return 'badge-blue';
  }
}

export default page