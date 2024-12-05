"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
}

const navigationLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/thank-you", label: "ThankYou" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string): boolean => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          <Link href="/" className="font-light tracking-wide transition-colors">
            Portal
          </Link>
        </h1>
        <button
          className="flex items-center justify-center p-2 text-gray-500 hover:text-black sm:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute left-0 top-full w-full bg-white text-base font-medium text-zinc-500 sm:static sm:flex sm:w-auto sm:items-center sm:space-x-6`}
        >
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-charcoal block px-4 py-2 sm:p-0 ${
                isActive(href) ? "text-ds-blue hover:text-ds-blue" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
