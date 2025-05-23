"use client";

import Link from "next/link";
import React, { useState } from "react";
import { account } from "../../appwrite";
import { useRouter } from "next/navigation";
import { registerUser } from "../../appwrite";
import { useAuth } from "@/app/context/AuthContext";


const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [check, setCheck] = useState(false)
  const {register} = useAuth()
  const router = useRouter();

interface RegisterResult {
    success: boolean;
    message: string;
}

interface RegisterUserFunction {
    (email: string, password: string, name: string): Promise<RegisterResult>;
}

interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

const handleSubmit = async (e: HandleSubmitEvent): Promise<void> => {
    e.preventDefault();
    setMessage("Registering...");
    setIsError(false);
    try {
        if (typeof register === "function") {
            const result: RegisterResult = await register(email, password, name);
            if (result.success) {
                setMessage(result.message);
                // Optionally redirect user after successful registration
                router.push('/'); 
            } else {
                setMessage(result.message);
                setIsError(true);
            }
        } else {
            setMessage("Registration function is not available.");
            setIsError(true);
        }
    } catch (error: any) {
        setMessage(`An unexpected error occurred: ${error.message}`);
        setIsError(true);
        console.error("Registration form submission error:", error);
    }
};

  return (
    <section className="lg:px-8 py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-job-blue mb-6 text-center">
            Sign Up
          </h2>
          <p className="text-lg text-job-text max-w-3xl mx-auto">
            Join the community of job seekers and employers
          </p>
        </div>

        <div className="relative max-w-md mx-auto mt-8 ">
          <div className="overflow-hidden bg-white rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <form onSubmit={handleSubmit} method="POST">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      First & Last name{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>

                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your full name"
                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>

                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter email to get started"
                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                          />
                        </svg>
                      </div>

                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="check"
                      required
                      id="check"
                      className="w-5 h-5 text-green-500 bg-white border-gray-200 rounded"
                      onChange={() => setCheck(!check)}
                    />

                    <label
                      htmlFor="agree"
                      className="ml-3 text-sm font-medium text-gray-500"
                    >
                      I agree to JobConnect’s{" "}
                      <Link
                        href="#"
                        title=""
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="#"
                        title=""
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                    >
                      Create account
                    </button>
                  </div>

                  {message && (
                    <p className={`mt-5 text-center text-base font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}

                  <div className="text-center">
                    <p className="text-base text-gray-600">
                      Already have an account?{" "}
                      <Link
                        href="/auth/signin"
                        title=""
                        className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline"
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
