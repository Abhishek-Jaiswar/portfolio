"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="contact" className="py-20 text-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-[#66FCF1] font-mono text-md mb-4">
            04. What&#39;s Next?
          </h2>
          <h2 className="flex items-center text-4xl font-bold text-[#E2E8F0] mb-12 relative justify-center">
            Get In Touch
            <span className="flex-grow block h-[1px] bg-[#4A5568] ml-4"></span>
          </h2>
          <p className="text-[#A0AEC0] mb-8">
            I&#39;m currently looking for new opportunities, and my inbox is
            always open. Whether you have a question or just want to say hi,
            I&#39;ll do my best to get back to you!
          </p>
          <Link
            href="mailto:abhisheknduw@gmail.com"
            className="text-[#66FCF1] border border-[#66FCF1] px-8 py-4 rounded font-mono text-sm hover:bg-[#66FCF1]/10 transition-colors inline-block"
          >
            Say Hello
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
