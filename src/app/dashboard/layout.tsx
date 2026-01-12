"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-screen font-sans!">
      <section className=" m-0 p-0">
        <aside
          className={`h-full transition-all duration-100 ease-linear border-r border-neutral-700 ${
            isOpen ? "w-[16rem]" : "w-0 overflow-hidden border-none"
          }
            `}
        >
          <Sidebar isOpen={isOpen} />
        </aside>
      </section>

      <section className="flex flex-col w-full h-full">
        <header className="h-14 flex items-center justify-center border-b border-neutral-700">
          <Header handleOpen={handleOpen} />
        </header>

        <main className="flex h-full w-full p-4">{children}</main>
      </section>
    </div>
  );
};

export default DashboardLayout;
