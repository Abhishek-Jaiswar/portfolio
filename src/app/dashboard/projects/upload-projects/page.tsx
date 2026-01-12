"use client";

import { UploadIcon } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";

const UploadProjects = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    hostedUrl: "",
    sourceCodeUrl: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (!file) return;

    setImage(file);
  };

  return (
    <div className="w-full h-full">
      <div className="">
        <h1 className="text-xl font-bold text-neutral-400">
          Great man you are finaly uploading something!
        </h1>
      </div>
      <div className="mt-10">
        <div className="">
          <form>
            <div className=" w-full">
              <label htmlFor="file" className="text-sm text-neutral-200">
                Upload project image
              </label>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                onClick={() => inputRef.current?.click()}
                className="border border-dashed border-red-300 rounded-md p-4"
              >
                <div className=" flex items-center justify-center flex-col gap-2">
                  <div className="flex items-center justify-center w-10 h-10 bg-neutral-800/50 rounded-full">
                    <UploadIcon className="text-neutral-100" />
                  </div>
                  <h1 className="text-">Drop a screenshot of you project</h1>
                </div>
              </div>
            </div>
            
            <div className=" space-y-1">
              <label htmlFor="title" className="text-sm text-neutral-200">
                Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="Give a title.."
                value={form.title}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProjects;
