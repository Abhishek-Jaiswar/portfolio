"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open("/Abhishek-jaiswar.pdf", "_blank");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1A202C]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="text-[#66FCF1] font-mono text-lg z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            &lt;Abhishek Jaiswar /&gt;
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#about"
              className="text-[#A0AEC0] hover:text-[#66FCF1] transition-colors font-mono text-sm"
            >
              <span className="text-[#66FCF1]">01.</span> About
            </Link>
            <Link
              href="#experience"
              className="text-[#A0AEC0] hover:text-[#66FCF1] transition-colors font-mono text-sm"
            >
              <span className="text-[#66FCF1]">02.</span> Experience
            </Link>
            <Link
              href="#projects"
              className="text-[#A0AEC0] hover:text-[#66FCF1] transition-colors font-mono text-sm"
            >
              <span className="text-[#66FCF1]">03.</span> Work
            </Link>
            <Link
              href="#contact"
              className="text-[#A0AEC0] hover:text-[#66FCF1] transition-colors font-mono text-sm"
            >
              <span className="text-[#66FCF1]">04.</span> Contact
            </Link>
            <a
              href="/Abhishek-jaiswar.pdf"
              onClick={handleResumeClick}
              className="text-[#66FCF1] border border-[#66FCF1] px-4 py-2 rounded font-mono text-sm hover:bg-[#66FCF1]/10 transition-colors"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-[#66FCF1] focus:outline-none focus:ring-2 focus:ring-[#66FCF1] z-50"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#1A202C]/95 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link
            href="#about"
            className="text-[#E2E8F0] hover:text-[#66FCF1] transition-colors font-mono text-2xl"
            onClick={toggleMobileMenu}
          >
            <span className="text-[#66FCF1]">01.</span> About
          </Link>
          <Link
            href="#experience"
            className="text-[#E2E8F0] hover:text-[#66FCF1] transition-colors font-mono text-2xl"
            onClick={toggleMobileMenu}
          >
            <span className="text-[#66FCF1]">02.</span> Experience
          </Link>
          <Link
            href="#projects"
            className="text-[#E2E8F0] hover:text-[#66FCF1] transition-colors font-mono text-2xl"
            onClick={toggleMobileMenu}
          >
            <span className="text-[#66FCF1]">03.</span> Work
          </Link>
          <Link
            href="#contact"
            className="text-[#E2E8F0] hover:text-[#66FCF1] transition-colors font-mono text-2xl"
            onClick={toggleMobileMenu}
          >
            <span className="text-[#66FCF1]">04.</span> Contact
          </Link>
          <a
            href="/Abhishek-jaiswar.pdf"
            onClick={(e) => {
              handleResumeClick(e);
              toggleMobileMenu();
            }}
            className="text-[#66FCF1] border border-[#66FCF1] px-6 py-3 rounded font-mono text-xl hover:bg-[#66FCF1]/10 transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
