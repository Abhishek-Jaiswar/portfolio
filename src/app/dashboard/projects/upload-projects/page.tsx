"use client";

import axios from "axios";
import { Loader2, UploadIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type InputErrors = {
  title?: string;
  description?: string;
  hostedUrl?: string;
  sourceCodeUrl?: string;
  imageUrl?: string;
};

const FILE_SIZE_LIMIT = 5;

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
  const router = useRouter();

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
      setError("Only images are allowed!");
      return;
    }

    if (file.size > FILE_SIZE_LIMIT * 1024 * 1024) {
      setError("Image must be less than 5MB");
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
        toast.success("Project uploaded successfully 🚀");
        router.push("/dashboard/projects");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to upload project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl p-6 sm:p-8 space-y-2 shadow-xl shadow-background/50">
        <h1 className="text-3xl font-bold italic tracking-tight text-foreground">
          Upload New Project
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Fill in the details below to showcase your latest work. Make sure to use high-quality screenshots for the best presentation.
        </p>
      </div>

      <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-10 shadow-lg">
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-foreground italic flex items-center gap-2">
              <UploadIcon className="w-4 h-4 text-primary" />
              Project Cover Image
            </label>

            {!previewUrl ? (
              <div
                onClick={() => inputRef.current?.click()}
                className="group relative border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-12 transition-all duration-300 cursor-pointer bg-secondary/20 hover:bg-secondary/40"
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <UploadIcon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Click or drag to upload</h3>
                    <p className="text-sm text-muted-foreground mt-1">PNG, JPG or WebP (Max 5MB)</p>
                  </div>
                  <button
                    type="button"
                    className="mt-2 px-6 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group rounded-2xl overflow-hidden border border-border bg-secondary/30 p-4">
                <div className="relative aspect-video w-full max-h-[300px] overflow-hidden rounded-xl bg-background">
                  <Image
                    src={previewUrl}
                    fill
                    alt="Project preview"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-xl"
                      title="Remove image"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between px-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground truncate max-w-[200px]">{image?.name}</span>
                    <span className="text-xs text-muted-foreground">{getImageSize()}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors italic"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            )}
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            {inputErrors.imageUrl && <p className="text-xs text-red-500 font-medium">{inputErrors.imageUrl}</p>}
          </div>

          {/* Form Fields Section */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-semibold text-foreground italic">Project Title</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Ex: Lume Chat"
                value={form.title}
                onChange={handleChange}
                className="w-full bg-secondary/40 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary/20 transition-all"
              />
              {inputErrors.title && <p className="text-xs text-red-500 font-medium">{inputErrors.title}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-semibold text-foreground italic">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Tell us about the project, features, and tech stack..."
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full bg-secondary/40 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary/20 transition-all resize-none"
              />
              {inputErrors.description && <p className="text-xs text-red-500 font-medium">{inputErrors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="hostedUrl" className="text-sm font-semibold text-foreground italic font-mono uppercase tracking-widest text-[10px]">Live URL</label>
                <input
                  id="hostedUrl"
                  name="hostedUrl"
                  type="text"
                  placeholder="https://yourapp.com"
                  value={form.hostedUrl}
                  onChange={handleChange}
                  className="w-full bg-secondary/40 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary/20 transition-all"
                />
                {inputErrors.hostedUrl && <p className="text-xs text-red-500 font-medium">{inputErrors.hostedUrl}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="sourceCodeUrl" className="text-sm font-semibold text-foreground italic font-mono uppercase tracking-widest text-[10px]">Github URL</label>
                <input
                  id="sourceCodeUrl"
                  name="sourceCodeUrl"
                  type="text"
                  placeholder="https://github.com/..."
                  value={form.sourceCodeUrl}
                  onChange={handleChange}
                  className="w-full bg-secondary/40 border border-border focus:border-primary/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary/20 transition-all"
                />
                {inputErrors.sourceCodeUrl && <p className="text-xs text-red-500 font-medium">{inputErrors.sourceCodeUrl}</p>}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground italic">
              *All fields marked as required must be filled correctly.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/dashboard/projects"
                className="flex-1 sm:flex-none text-center px-8 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground px-10 py-3 rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-primary/20 italic"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Publish Project"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProjects;
