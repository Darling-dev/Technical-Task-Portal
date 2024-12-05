"use client";

import React from "react";

interface DeleteCookieButtonProps {
  onDelete: () => void;
}

const DeleteCookieButton: React.FC<DeleteCookieButtonProps> = ({
  onDelete,
}) => {
  return (
    <button
      className="flex items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700 sm:px-5 sm:text-base"
      onClick={onDelete}
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
        className="h-5 w-5 text-white"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
      Delete Cookie
    </button>
  );
};

export default DeleteCookieButton;
