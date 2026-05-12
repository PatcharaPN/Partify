import { Icon } from "@iconify/react";

const ResumeSection = () => {
  const resumeFile = 1;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold text-gray-900 text-base">
          Resume Uploading
        </h2>
      </div>
      <p className="text-xs text-gray-400 mb-5">
        Upload your resume to let employers know more about you
      </p>

      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-all">
        <Icon
          icon="solar:upload-linear"
          className="w-6 h-6 text-gray-400 mb-2"
        />
        <span className="text-sm text-gray-500">Click to upload</span>
        <span className="text-xs text-gray-400 mt-1">PDF, DOC up to 5MB</span>
        <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
      </label>

      {resumeFile && (
        <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-xl">
          <Icon
            icon="solar:file-text-linear"
            className="w-5 h-5 text-gray-400 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700 truncate">Alibaba</p>
            <p className="text-xs text-gray-400">500MB</p>
          </div>
          <button className="text-gray-400 hover:text-red-400 transition-colors">
            <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeSection;
