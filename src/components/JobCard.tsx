"use client"

import Link from 'next/link'
import React from 'react'
import { Job } from '@/data/jobData'

interface JobCardProps {
  job: Job;
}

const JobCard = ({job} : JobCardProps) => {
    const daysAgo = calculateDaysAgo(job.postedDate);
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
            <Link href={`/joblisting/${job.id}`} className="text-lg font-semibold text-job-blue hover:text-job-dark-blue">{job.title}</Link>
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
            <div className={`badge ${getLocationTypeBadgeColor(job.locationType)}`}>
              {job.locationType}
            </div>
            <div className="badge badge-blue">
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