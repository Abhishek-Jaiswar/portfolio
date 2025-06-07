"use client";

import { useEffect, useRef, useState } from "react";

interface GSAPProps {
  opacity?: number;
  y?: number;
  duration?: number;
  ease?: string;
  delay?: number;
}

interface GSAP {
  from: (element: HTMLElement | null, props: GSAPProps) => void;
  to: (element: HTMLElement | null, props: GSAPProps) => void;
  set: (element: HTMLElement | null, props: GSAPProps) => void;
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle initial mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle animations
  useEffect(() => {
    if (!isMounted) return;

    // Simple GSAP mock
    const gsap: GSAP = {
      from: (element: HTMLElement | null, props: GSAPProps) => {
        if (element) {
          element.style.opacity = "0";
          element.style.transform = `translateY(${props.y || 0}px)`;
          setTimeout(() => {
            element.style.transition = `all ${props.duration || 0.8}s ${
              props.ease || "ease-out"
            }`;
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }, props.delay || 0);
        }
      },
      to: (element: HTMLElement | null, props: GSAPProps) => {
        if (element) {
          element.style.transition = `all ${props.duration || 0.3}s ${
            props.ease || "ease-out"
          }`;
          element.style.opacity = props.opacity?.toString() || "1";
          element.style.transform = `translateY(${props.y || 0}px)`;
        }
      },
      set: (element: HTMLElement | null, props: GSAPProps) => {
        if (element) {
          element.style.opacity = props.opacity?.toString() || "1";
          element.style.transform = `translateY(${props.y || 0}px)`;
        }
      },
    };

    // Set initial states for each element individually
    const elements = [
      greetingRef.current,
      headingRef.current,
      textRef.current,
      buttonRef.current,
    ];
    elements.forEach((element) => {
      if (element) {
        gsap.set(element, {
          opacity: 0,
          y: 20,
        });
      }
    });

    // Simple fade-in animations with delays
    if (greetingRef.current) {
      gsap.from(greetingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "ease-out",
      });
    }

    if (headingRef.current) {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "ease-out",
      });
    }

    if (textRef.current) {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: "ease-out",
      });
    }

    if (buttonRef.current) {
      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        ease: "ease-out",
      });
    }
  }, [isMounted]);

  if (!isMounted) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-[#1A202C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-6">
            <div>
              <p className="text-[#66FCF1] font-mono mb-4">
                <span className="inline-block">👋</span> Hi, my name is
              </p>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#E2E8F0]">
                <span>Abhishek Jaiswar</span>
                <span className="text-[#66FCF1]">.</span>
              </h1>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#A0AEC0]">
                I build things for the web.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-[#A0AEC0] max-w-2xl text-lg leading-relaxed">
                I&#39;m a software engineer specializing in building exceptional
                digital experiences. Currently, I&#39;m focused on building
                accessible, human-centered products.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/Abhishek-jaiswar"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-[#66FCF1] border border-[#66FCF1] px-8 py-4 rounded font-mono text-sm overflow-hidden hover:bg-[#66FCF1]/10 transition-colors"
              >
                <span className="relative z-10">Check out my work!</span>
                <div className="absolute inset-0 bg-[#66FCF1]/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              <button className="group text-[#E2E8F0] hover:text-[#66FCF1] font-mono text-sm flex items-center gap-2 transition-colors">
                Let's talk
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
                  className="transform transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-[#1A202C]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-6">
          <div ref={greetingRef}>
            <p className="text-[#66FCF1] font-mono mb-4">
              <span className="inline-block">👋</span> Hi, my name is
            </p>
          </div>
          <div ref={headingRef} className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#E2E8F0]">
              <span ref={nameRef}>Abhishek Jaiswar</span>
              <span className="text-[#66FCF1]">.</span>
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#A0AEC0]">
              I build things for the web.
            </h2>
          </div>
          <div ref={textRef} className="space-y-6">
            <p className="text-[#A0AEC0] max-w-2xl text-lg leading-relaxed">
              I&#39;m a software engineer specializing in building exceptional
              digital experiences. Currently, I&#39;m focused on building
              accessible, human-centered products.
            </p>
          </div>
          <div ref={buttonRef} className="flex flex-wrap gap-4">
            <a
              href="https://github.com/abhishekjaiswar"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-[#66FCF1] border border-[#66FCF1] px-8 py-4 rounded font-mono text-sm overflow-hidden hover:bg-[#66FCF1]/10 transition-colors"
            >
              <span className="relative z-10">Check out my work!</span>
              <div className="absolute inset-0 bg-[#66FCF1]/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
            <button className="group text-[#E2E8F0] hover:text-[#66FCF1] font-mono text-sm flex items-center gap-2 transition-colors">
              Let's talk
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
                className="transform transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
