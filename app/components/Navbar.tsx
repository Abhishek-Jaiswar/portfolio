"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0a192f]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-[#64ffda] font-mono text-lg">
            &lt;YourName /&gt;
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#about"
              className="text-[#8892b0] hover:text-[#64ffda] transition-colors font-mono text-sm"
            >
              <span className="text-[#64ffda]">01.</span> About
            </Link>
            <Link
              href="#experience"
              className="text-[#8892b0] hover:text-[#64ffda] transition-colors font-mono text-sm"
            >
              <span className="text-[#64ffda]">02.</span> Experience
            </Link>
            <Link
              href="#projects"
              className="text-[#8892b0] hover:text-[#64ffda] transition-colors font-mono text-sm"
            >
              <span className="text-[#64ffda]">03.</span> Work
            </Link>
            <Link
              href="#contact"
              className="text-[#8892b0] hover:text-[#64ffda] transition-colors font-mono text-sm"
            >
              <span className="text-[#64ffda]">04.</span> Contact
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64ffda] border border-[#64ffda] px-4 py-2 rounded font-mono text-sm hover:bg-[#64ffda]/10 transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
