"use client";

import React, { useState } from "react";
import { projectData } from "@/src/app/data/data";
import Link from "next/link";

const Page = () => {
  const [projects, setProjects] = useState([]);

  return (
    <div className=" w-full h-full">
      <div className="flex items-center justify-between bg-neutral-800/40 p-4 rounded-md">
        <h1 className="text-xl text-neutral-400">List of projects you have.</h1>
        <Link
          href={"/dashboard/projects/upload-projects"}
          className="px-4 py-2 text-sm bg-neutral-800/50 rounded-md hover:bg-neutral-800 transition-all duration-150 ease-in"
        >
          Upload New
        </Link>
      </div>

      <div className="mt-8 flex items-center w-full justify-center">
        {projects.length === 0 && (
          <div className="flex items-center justify-center max-w-xl bg-neutral-800/50 rounded-md p-10">
            <div className="">
              <h1 className="text-xl font-bold text-neutral-200">
                Hi, Abhishek what&apos;s up
              </h1>
              <p className="text-neutral-300 font-semibold mt-5">
                It looks like you are not working these days?
              </p>
              <p className="text-neutral-300 ">Are you away off your track</p>
              <p>You dont have any projects</p>
              <Link
                href={"/dashboard/projects/upload-projects"}
                className="px-4 py-2 text-sm bg-neutral-800/50 rounded-md hover:bg-neutral-800 transition-all duration-150 ease-in mt-10"
              >
                Wan&apos;t to upload
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
