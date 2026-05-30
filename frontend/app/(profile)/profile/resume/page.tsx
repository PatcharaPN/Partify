"use client";

import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { axiosInstance } from "@/app/lib/axiosInstance";
import { Resume } from "@/app/types/job.type";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const ResumeSection = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useCurrentUser();

  const [resume, setResume] = useState<Resume | null>(
    currentUser?.resume?.[0] ?? null,
  );
  useEffect(() => {
    setResume(currentUser?.resume?.[0] ?? null);
  }, [currentUser]);

  const handleUploadResume = async (file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResume(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!resume) return;
    try {
      await axiosInstance.delete(`/resume/${resume.id}`);
      setResume(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-70px)] p-6 flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold text-gray-900 text-base">
            Resume Uploading
          </h2>
        </div>
        <p className="text-xs text-gray-400 mb-5">
          Upload your resume to let employers know more about you
        </p>

        {!resume && (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all">
            {loading ? (
              <Icon
                icon="svg-spinners:ring-resize"
                className="w-6 h-6 text-gray-400"
              />
            ) : (
              <>
                <Icon
                  icon="solar:upload-linear"
                  className="w-6 h-6 text-gray-400 mb-2"
                />
                <span className="text-sm text-gray-500">Click to upload</span>
                <span className="text-xs text-gray-400 mt-1">
                  PDF, DOC up to 5MB
                </span>
              </>
            )}
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUploadResume(file);
              }}
              className="hidden"
              accept=".pdf,.doc,.docx"
              disabled={loading}
            />
          </label>
        )}

        {resume && (
          <>
            <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-xl">
              <Icon
                icon="solar:file-text-linear"
                className="w-5 h-5 text-gray-400 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">
                  {resume.fileName}
                </p>
                <p className="text-xs text-gray-400">
                  {/* {(resume.fileSize / 1024 / 1024).toFixed(2)} MB */}
                </p>
              </div>
              <button
                onClick={handleRemove}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
              </button>
            </div>

            {/* Preview */}
            {(resume.url ?? "").endsWith(".pdf") ? (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                <iframe
                  src={resume.url}
                  className="w-full h-[70vh]"
                  title="Resume Preview"
                />
              </div>
            ) : (
              <div className="mt-3 flex flex-col items-center justify-center h-24 rounded-xl border border-dashed border-gray-200 bg-gray-50">
                <Icon
                  icon="solar:file-text-linear"
                  className="w-6 h-6 text-gray-300 mb-1"
                />
                <p className="text-xs text-gray-400">
                  ไม่สามารถ preview ไฟล์ .doc ได้
                </p>
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-400 hover:underline mt-1"
                >
                  เปิดไฟล์
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeSection;
