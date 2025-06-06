"use client";

import { useState, useEffect, useMemo } from "react";
import JobFilter, { FilterState } from "@/components/JobFilter";
import JobCard from "@/components/JobCard";
//import { mockJobs, Job } from "@/data/jobData";
import { useAuth } from "../context/AuthContext";
import { getJobPosts } from "../appwrite";
import { Job } from "@/types";

const JobListing = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const [jobPosts, setJobPosts] = useState<Job[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6; // Maximum of 6 per page

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    locationType: [],
    jobType: [],
    location: "",
  });

  const filteredJobs = useMemo(() => {
    return jobPosts.filter((job) => {
      // Filter by search term
      if (
        filters.search &&
        !job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !job.company.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Filter by location
      if (
        filters.location &&
        !job.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Filter by location type
      if (
        filters.locationType.length > 0 &&
        !filters.locationType.includes(job.locationType)
      ) {
        return false;
      }

      // Filter by job type
      if (
        filters.jobType.length > 0 &&
        !filters.jobType.includes(job.jobType)
      ) {
        return false;
      }

      return true;
    });
  }, [filters, jobPosts]);

  useEffect(() => {
    type JobPostsResult = {
      success: boolean;
      data: Job[];
      total: number;
      message?: string;
    };

    const fetchJobs = async () => {
      // Only attempt to fetch jobs if authentication status is known
      // and if the user is authenticated (as this is a protected route)
      if (!authLoading && currentUser) {
        setDataLoading(true);
        setError("");
        try {
          
          const apiResult = await getJobPosts();
          const result: JobPostsResult =
            apiResult &&
            typeof apiResult === "object" &&
            "success" in apiResult &&
            "data" in apiResult
              ? (apiResult as JobPostsResult)
              : {
                  success: false,
                  data: [],
                  total: 0,
                  message: "Invalid response from server.",
                };
          if (result.success) {
            setJobPosts(result.data);

            // Calculate total pages based on total documents and items per page
           // const calculatedTotalPages = Math.ceil(result.total / itemsPerPage);
            //setTotalPages(calculatedTotalPages);
          } else {
            setError(result.message || "Failed to load job posts.");
          }
        } catch (err: any) {
          setError(`An unexpected error occurred: ${err.message}`);
          console.error("Error fetching jobs in component:", err);
        } finally {
          setDataLoading(false);
        }
      } else if (!authLoading && !currentUser) {
        // If not authenticated, the middleware should have redirected,
        // but this client-side check provides a fallback message.
        setError("You must be logged in to view job listings.");
        setDataLoading(false);
      }
    };

    fetchJobs();
  }, [authLoading, currentUser, currentPage]);



  // Display error message if any
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
        <p className="text-lg text-red-700">{error}</p>
      </div>
    );
  }

  // This page is protected by middleware, but a client-side check is good for robustness
  if (!currentUser) {
    // This case should ideally be handled by middleware redirection
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">
        <p className="text-lg text-red-700">
          Access Denied. Please log in to view job listings.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-job-blue mb-2">
          Find Your Dream Job
        </h1>
        <p className="text-lg text-job-text max-w-3xl mx-auto">
          Browse through hundreds of opportunities and discover your perfect
          career match
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
          <JobFilter onFilterChange={setFilters} />
        </div>
        <div className="md:col-span-9">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-job-text">
              {/** filteredJobs*/}
              {filteredJobs.length} Jobs Available
            </h2>
            <div>
              <select className="select-field" defaultValue="recent">
                <option value="recent">Most Recent</option>
                <option value="relevant">Most Relevant</option>
                <option value="salary-high">Highest Salary</option>
                <option value="salary-low">Lowest Salary</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job.$id} job={job} />)
            ) : (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No jobs found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>

          {filteredJobs.length > 0 && (
            <div className="mt-6 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-job-blue border-job-blue text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
              {/* Pagination Controls */}
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListing;
