"use client";

import Link from "next/link";
import React, { useState } from "react";
import { deleteCookie } from "@/app/utils/cookies";
import { AssignmentData } from "@/app/types";
import DeleteCookieButton from "@/app/components/button/DeleteCookie";

interface ThanksModalProps {
  assignmentData: AssignmentData | null;
}

const AssignmentThanksModal: React.FC<ThanksModalProps> = ({
  assignmentData,
}) => {
  const [data, setData] = useState<AssignmentData | null>(assignmentData);

  const handleDeleteCookie = () => {
    deleteCookie("assignmentData");
    setData(null);
  };

  if (!data) {
    return (
      <div className="flex w-full max-w-md flex-col items-start gap-3 rounded-xl border bg-white p-6 shadow-md">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hidden sm:block"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>

          <div>
            <h1 className="text-base font-semibold text-gray-900">Heads up!</h1>
            <p className="text-sm text-gray-600">
              It seems you have not submitted any assignment yet.
            </p>
          </div>
        </div>
        <Link
          className="hover:bg-lightgray flex items-center justify-center rounded-full border border-solid border-black/[.08] px-5 py-2 text-sm transition-colors hover:border-transparent sm:px-5 sm:text-base"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-5 w-5 text-gray-700"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back
        </Link>
      </div>
    );
  }
  return (
    <div className="text-charcoal w-full max-w-lg rounded-lg border bg-white p-6 shadow-md">
      <h1 className="mb-4 text-pretty text-2xl font-semibold tracking-tight">
        🎉 <span>Thank you for your submission!</span> <br />
        <span>We&apos;re excited to review your work.</span>
      </h1>
      <div className="submitted-summary space-y-4">
        <h2 className="text-gray-muted text-pretty text-sm">
          Summary of some submitted data
        </h2>
        <div className="flex justify-between border-b pb-2 text-sm font-medium">
          <span className="text-gray-700">Name:</span>
          <span className="text-gray-900">{data.name}</span>
        </div>
        <div className="flex justify-between border-b pb-2 text-sm font-medium">
          <span className="text-gray-700">Email:</span>
          <span className="text-gray-900">{data.email}</span>
        </div>
        <div className="flex justify-between border-b pb-2 text-sm font-medium">
          <span className="text-gray-700">Candidate Level:</span>
          <span className="text-gray-900">{data.candidate_level}</span>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-between gap-2 sm:flex-nowrap">
        <Link
          className="hover:bg-lightgray flex items-center justify-center rounded-full border border-solid border-black/[.08] px-5 py-2 text-sm transition-colors hover:border-transparent sm:px-5 sm:text-base"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-5 w-5 text-gray-700"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back
        </Link>
        <DeleteCookieButton onDelete={handleDeleteCookie} />
      </div>
    </div>
  );
};

export default AssignmentThanksModal;
