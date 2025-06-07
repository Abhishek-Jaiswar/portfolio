"use client";

const FixedElements = () => {
  return (
    <>
      {/* Left Side - Social Links */}
      <div className="fixed left-8 bottom-0 hidden md:flex flex-col items-center after:content-[''] after:block after:w-[1px] after:h-32 after:bg-[#A0AEC0]">
        <div className="flex flex-col gap-6 mb-8">
          <a
            href="https://github.com/Abhishek-Jaiswar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A0AEC0] hover:text-[#66FCF1] transition-colors"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hover:-translate-y-1 transition-transform"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/abhishek-jaiswar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A0AEC0] hover:text-[#66FCF1] transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hover:-translate-y-1 transition-transform"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a
            href="https://twitter.com/abhishek_jaiswar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A0AEC0] hover:text-[#66FCF1] transition-colors"
            aria-label="Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hover:-translate-y-1 transition-transform"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Right Side - Email */}
      <div className="fixed right-8 bottom-0 hidden md:flex flex-col items-center after:content-[''] after:block after:w-[1px] after:h-32 after:bg-[#A0AEC0]">
        <div className="mb-8">
          <a
            href="mailto:abhisheknduw@gmail.com"
            className="text-[#A0AEC0] hover:text-[#66FCF1] transition-colors font-mono text-sm vertical-rl"
            style={{ writingMode: "vertical-rl" }}
          >
            abhisheknduw@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default FixedElements;
