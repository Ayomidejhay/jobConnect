"use client"

import { useState } from "react";

interface JobFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  locationType: string[];
  jobType: string[];
  location: string;
}

const JobFilter = ({ onFilterChange }: JobFilterProps) => {
      const [filters, setFilters] = useState<FilterState>({
    search: '',
    locationType: [],
    jobType: [],
    location: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, location: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (type: 'locationType' | 'jobType', value: string) => {
    const currentValues = filters[type];
    let newValues: string[];
    
    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    
    const newFilters = { ...filters, [type]: newValues };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      search: '',
      locationType: [],
      jobType: [],
      location: '',
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    
    <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-5">
      <div className="space-y-5">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-job-text">
            Search Jobs
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="input-field pl-10"
              placeholder="Job title or keyword"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-job-text">
            Location
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="location"
              id="location"
              className="input-field pl-10"
              placeholder="City, state, or zip code"
              value={filters.location}
              onChange={handleLocationChange}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-job-text">Job Type</h3>
          <div className="mt-2 space-y-2">
            {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
              <div key={type} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`job-type-${type}`}
                    name={`job-type-${type}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-job-blue focus:ring-job-blue"
                    checked={filters.jobType.includes(type)}
                    onChange={() => handleCheckboxChange('jobType', type)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`job-type-${type}`} className="text-job-text">
                    {type}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-job-text">Location Type</h3>
          <div className="mt-2 space-y-2">
            {['Remote', 'Hybrid', 'On-site'].map((type) => (
              <div key={type} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`location-type-${type}`}
                    name={`location-type-${type}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-job-blue focus:ring-job-blue"
                    checked={filters.locationType.includes(type)}
                    onChange={() => handleCheckboxChange('locationType', type)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`location-type-${type}`} className="text-job-text">
                    {type}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-job-text hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-job-blue"
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobFilter