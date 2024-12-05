"use server";

import Link from "next/link";

export default async function NotFound() {
  return (
    <main className="flex flex-grow items-center justify-center bg-gray-50">
      <div className="relative w-full max-w-2xl">
        <div className="animate-blob absolute -left-20 top-0 hidden h-72 w-72 rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter sm:block"></div>
        <div className="animate-blob animation-delay-2000 absolute right-12 top-0 hidden h-72 w-72 rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter sm:block"></div>
        <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 hidden h-72 w-72 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter sm:block"></div>
        <div className="relative m-0 space-y-6 text-pretty sm:m-8">
          <div className="rounded-2xl bg-white p-6 sm:shadow-md">
            <h1 className="text-charcoal text-2xl font-semibold">
              Oops! Looks like this page doesn&apos;t exist
            </h1>
            <p className="text-gray-muted mt-2">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <div className="mt-2 flex justify-start">
              <Link
                className="hover:bg-lightgray inline-flex items-center justify-center rounded-full border border-solid border-black/[.08] px-5 py-2 text-sm transition-colors hover:border-transparent sm:px-5 sm:text-base"
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
          </div>
        </div>
      </div>
    </main>
  );
}
