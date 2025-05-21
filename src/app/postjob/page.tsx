"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    locationType: "On-site",
    salary: "",
    jobType: "Full-time",
    description: "",
    requirements: "",
    responsibilities: "",
    applicationDeadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    // In a real application, you would send this data to your backend
    // For now, we'll just simulate a successful submission
    setFormSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  if (formSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-job-blue">
          Job Posted Successfully!
        </h2>
        <p className="mt-2 text-job-text">
          Thank you for posting a job. Your listing will be reviewed shortly.
        </p>
        <p className="mt-1 text-job-light-text">
          Redirecting you to the homepage...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-job-blue mb-8 text-center">
        Post a New Job
      </h1>

      <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-medium text-job-blue">Job Details</h2>
              <p className="mt-1 text-sm text-job-light-text">
                Basic information about the position you're hiring for.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-job-text"
                  >
                    Job Title *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      className="input-field"
                      placeholder="e.g. Frontend Developer"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-job-text"
                  >
                    Company Name *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      required
                      className="input-field"
                      placeholder="e.g. Acme Inc."
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-job-text"
                  >
                    Location *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      required
                      className="input-field"
                      placeholder="e.g. San Francisco, CA"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="locationType"
                    className="block text-sm font-medium text-job-text"
                  >
                    Location Type *
                  </label>
                  <div className="mt-1">
                    <select
                      id="locationType"
                      name="locationType"
                      required
                      className="select-field"
                      value={formData.locationType}
                      onChange={handleChange}
                    >
                      <option value="On-site">On-site</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="jobType"
                    className="block text-sm font-medium text-job-text"
                  >
                    Job Type *
                  </label>
                  <div className="mt-1">
                    <select
                      id="jobType"
                      name="jobType"
                      required
                      className="select-field"
                      value={formData.jobType}
                      onChange={handleChange}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium text-job-text"
                  >
                    Salary Range *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="salary"
                      id="salary"
                      required
                      className="input-field"
                      placeholder="e.g. $60,000 - $80,000"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="applicationDeadline"
                    className="block text-sm font-medium text-job-text"
                  >
                    Application Deadline
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="applicationDeadline"
                      id="applicationDeadline"
                      className="input-field"
                      value={formData.applicationDeadline}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-job-blue">
                Job Description
              </h2>
              <p className="mt-1 text-sm text-job-light-text">
                Provide detailed information about the job to attract qualified
                candidates.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-job-text"
                  >
                    Job Description *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      required
                      className="input-field"
                      placeholder="Describe the job, its purpose, and the value it brings to your company..."
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="requirements"
                    className="block text-sm font-medium text-job-text"
                  >
                    Requirements *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={4}
                      required
                      className="input-field"
                      placeholder="List the skills, qualifications, and experience required..."
                      value={formData.requirements}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-job-light-text mt-1">
                      Add each requirement on a new line.
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="responsibilities"
                    className="block text-sm font-medium text-job-text"
                  >
                    Responsibilities *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="responsibilities"
                      name="responsibilities"
                      rows={4}
                      required
                      className="input-field"
                      placeholder="Detail the roles and responsibilities for this position..."
                      value={formData.responsibilities}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-job-light-text mt-1">
                      Add each responsibility on a new line.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => router.push("/")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
