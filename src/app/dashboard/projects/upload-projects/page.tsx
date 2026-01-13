"use client";

import axios from "axios";
import { Loader2, UploadIcon, X } from "lucide-react";
import Image from "next/image";
import { title } from "process";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type InputErrors = {
  title?: string;
  description?: string;
  hostedUrl?: string;
  sourceCodeUrl?: string;
  imageUrl?: string;
};

const FILE_SIZE_LIMT = 5;

const UploadProjects = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    hostedUrl: "",
    sourceCodeUrl: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputErrors, setInputErrors] = useState<InputErrors>({});
  const [loading, setIsLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateFields(name, value);

    setInputErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only imges are allowed!");
      return;
    }

    if (file.size > FILE_SIZE_LIMT * 1024 * 1024) {
      setError("Image must be less than 5mb");
    }

    setError(null);
    setImage(file);
  };

  const previewUrl = useMemo(() => {
    if (!image) return null;

    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    if (previewUrl) {
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  const handleRemoveImage = () => {
    setImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const getImageSize = () => {
    if (!image) return null;

    const sizeInBytes = image.size;
    const sizeInKB = sizeInBytes / 1024;
    const sizeInMB = sizeInBytes / (1024 * 1024);

    if (sizeInMB >= 1) {
      return `${sizeInMB.toFixed(2)} MB`;
    }

    return `${sizeInKB.toFixed(0)} KB`;
  };

  const validateFields = (name: string, value: string): string | undefined => {
    if (!value.trim()) {
      return "This field is required";
    }

    if (
      (name === "hostedUrl" || name === "sourceCodeUrl") &&
      !/^https?:\/\/.+/i.test(value)
    ) {
      return "Enter a valid URL";
    }

    return undefined;
  };

  const validateForm = () => {
    const errors: InputErrors = {};

    Object.entries(form).forEach(([name, value]) => {
      const error = validateFields(name, value);
      if (error) {
        errors[name as keyof InputErrors] = error;
      }
    });
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    if (!image) {
      setInputErrors((prev) => ({
        ...prev,
        image: "Project image is required",
      }));
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title.trim());
    formData.append("description", form.description.trim());
    formData.append("hostedUrl", form.hostedUrl.trim());
    formData.append("sourceCodeUrl", form.sourceCodeUrl.trim());
    formData.append("image", image);

    try {
      setIsLoading(true);
      const response = await axios.post("/api/projects", formData);

      if (response.status === 200 || response.status === 201) {
        setForm({
          title: "",
          description: "",
          hostedUrl: "",
          sourceCodeUrl: "",
        });

        setImage(null);
        setInputErrors({});
        if (inputRef.current) inputRef.current.value = "";
        alert("Project uploaded successfully 🚀");
      }
    } catch (error) {
      console.error(error);
      alert("Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="bg-neutral-800/50 rounded-md p-4 space-y-2">
        <h1 className="text-4xl font-bold text-neutral-400">
          Great man you are finaly uploading something!
        </h1>
        <p className=" text-neutral-300">
          Upload your projects by filling this form
        </p>
      </div>
      <div className="mt-5 bg-neutral-800/30 rounded-md p-8">
        <div className="">
          <form onSubmit={onSubmit} className=" space-y-4">
            <div className="">
              {!previewUrl ? (
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
                    className="border-2 border-dashed border-neutral-400 rounded-md p-8 mt-2"
                  >
                    <div className=" flex items-center justify-center flex-col gap-4 ">
                      <div className="flex items-center justify-center w-10 h-10 bg-neutral-800/50 rounded-full">
                        <UploadIcon className="text-neutral-100" />
                      </div>
                      <h1 className="text-">
                        Drop a screenshot of you project
                      </h1>
                      <button
                        type="button"
                        className="px-4 py-2 bg-neutral-800/50 rounded-md hover:bg-neutral-800"
                      >
                        Browse Computer
                      </button>

                      <p className="text-neutral-300 text-sm">
                        *You can upload your screenshot by clicking anywhere in
                        this box.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full h-full">
                    {error && <p className="text-sm text-red-400">{error}</p>}
                  </div>
                  {inputErrors.title && (
                    <p className="text-sm text-red-400">{inputErrors.title}</p>
                  )}
                </div>
              ) : (
                <div className="">
                  <label htmlFor="file" className="text-sm text-neutral-200">
                    Upload project image
                  </label>
                  <div className="mt-2 w-full h-full border-2 border-dashed border-amber-400 p-4 rounded-md">
                    <div className=" relative flex items-center justify-center flex-col gap-3">
                      <Image
                        src={previewUrl || ""}
                        height={200}
                        width={400}
                        alt="project ss"
                        className="rounded-md max-h-48 object-cover"
                      />
                      <div
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center bg-neutral-600 cursor-pointer"
                      >
                        <X className="text-white size-4" />
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-neutral-300">
                          {image?.name}
                        </p>
                        {getImageSize() && (
                          <p className="text-sm text-neutral-400">
                            {getImageSize()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className=" space-y-1 w-full">
              <label htmlFor="title" className="text-sm text-neutral-200">
                Title
              </label>
              <div className="w-full">
                <input
                  name="title"
                  type="text"
                  placeholder="Give a title.."
                  value={form.title}
                  onChange={handleChange}
                  className="w-full text-neutral-100 bg-neutral-800/50 px-4 py-2 border border-neutral-600 rounded-md text-sm"
                />
                {inputErrors.title && (
                  <p className="text-sm text-red-400">{inputErrors.title}</p>
                )}
              </div>
            </div>

            <div className=" space-y-1 w-full">
              <label htmlFor="description" className="text-sm text-neutral-200">
                Description
              </label>
              <div className="w-full">
                <textarea
                  name="description"
                  placeholder="Describe your project..."
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full text-neutral-100 bg-neutral-800/50 px-4 py-2 border border-neutral-600 rounded-md text-sm"
                />
                {inputErrors.title && (
                  <p className="text-sm text-red-400">{inputErrors.title}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className=" space-y-1 w-full">
                <label htmlFor="hostedUrl" className="text-sm text-neutral-200">
                  Project Hosted url
                </label>
                <div className="w-full">
                  <input
                    name="hostedUrl"
                    type="text"
                    placeholder="https://example.com"
                    value={form.hostedUrl}
                    onChange={handleChange}
                    className="w-full text-neutral-100 bg-neutral-800/50 px-4 py-2 border border-neutral-600 rounded-md text-sm"
                  />
                  {inputErrors.title && (
                    <p className="text-sm text-red-400">{inputErrors.title}</p>
                  )}
                </div>
              </div>

              <div className=" space-y-1 w-full">
                <label
                  htmlFor="sourceCodeUrl"
                  className="text-sm text-neutral-200"
                >
                  Project Hosted url
                </label>
                <div className="w-full">
                  <input
                    name="sourceCodeUrl"
                    type="text"
                    placeholder="https://github.com/..."
                    value={form.sourceCodeUrl}
                    onChange={handleChange}
                    className="w-full text-neutral-100 bg-neutral-800/50 px-4 py-2 border border-neutral-600 rounded-md text-sm"
                  />
                </div>
                {inputErrors.title && (
                  <p className="text-sm text-red-400">{inputErrors.title}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-neutral-800/50 hover:bg-neutral-800 text-sm"
              >
                {loading ? (
                  <span className="flex gap-2 items-center">
                    <Loader2 className=" animate-spin size-4 text-neutral-400" />
                    Submitting..
                  </span>
                ) : (
                  <>Submit project</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProjects;
