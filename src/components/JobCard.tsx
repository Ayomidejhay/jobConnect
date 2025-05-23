"use client"

import Link from 'next/link'
import React from 'react'
//import { Job } from '@/data/jobData'
import { getJobPosts } from '@/app/appwrite'
import { Job } from '@/types'



interface JobCardProps {
  job: Job;
}

const JobCard = ({job} : JobCardProps) => {
    const daysAgo = calculateDaysAgo(job.$createdAt);
  return (
    <div className="job-card animate-slide-up">
      <div className="flex justify-between">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md overflow-hidden">
            <img 
              src={job.logo || "/placeholder.svg"} 
              alt={`${job.company} logo`} 
              className="h-full w-full object-contain p-1"
            />
          </div>
          <div>
            <Link href={`/joblisting/${job.$id}`} className="text-lg capitalize font-semibold text-job-blue hover:text-job-dark-blue">{job.title}</Link>
            <p className="text-job-text">{job.company}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              <span className="text-sm text-job-light-text flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="space-y-1">
            <div className={`badge capitalize ${getLocationTypeBadgeColor(job.locationType)}`}>
              {job.locationType}
            </div>
            <div className="badge capitalize badge-blue">
              {job.jobType}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-end">
        <div className="text-job-text font-medium">{job.salary}</div>
        <div className="text-sm text-job-light-text">{daysAgo}</div>
      </div>
    </div>
  )
}

/**
 * Utility function to format a timestamp into "time ago" string.
 * @param {string} timestamp - The ISO 8601 timestamp string (e.g., job.$createdAt).
 * @returns {string} Formatted time ago string (e.g., "5 minutes ago", "2 days ago").
 */
interface FormatTimeAgo {
  (timestamp: string): string;
}

const formatTimeAgo: FormatTimeAgo = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000; // seconds in a year
  if (interval > 1) {
    return Math.floor(interval) + " year" + (Math.floor(interval) === 1 ? "" : "s") + " ago";
  }
  interval = seconds / 2592000; // seconds in a month
  if (interval > 1) {
    return Math.floor(interval) + " month" + (Math.floor(interval) === 1 ? "" : "s") + " ago";
  }
  interval = seconds / 86400; // seconds in a day
  if (interval > 1) {
    return Math.floor(interval) + " day" + (Math.floor(interval) === 1 ? "" : "s") + " ago";
  }
  interval = seconds / 3600; // seconds in an hour
  if (interval > 1) {
    return Math.floor(interval) + " hour" + (Math.floor(interval) === 1 ? "" : "s") + " ago";
  }
  interval = seconds / 60; // seconds in a minute
  if (interval > 1) {
    return Math.floor(interval) + " minute" + (Math.floor(interval) === 1 ? "" : "s") + " ago";
  }
  return Math.floor(seconds) + " second" + (Math.floor(seconds) === 1 ? "" : "s") + " ago";
};

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

export default JobCard