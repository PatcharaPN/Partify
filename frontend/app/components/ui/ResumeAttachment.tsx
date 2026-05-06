"use client";

import { Icon } from "@iconify/react";

interface ResumeAttachmentProps {
  resumeUrl: string;
}

export default function ResumeAttachment({ resumeUrl }: ResumeAttachmentProps) {
  const fileName = resumeUrl;
  console.log(resumeUrl);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 hover:border-[#2563EB]/40 hover:bg-blue-50/40 transition-all group">
      {/* PDF Thumbnail */}
      <div className="relative shrink-0 w-10 h-12 rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 bg-white flex items-center justify-center">
            <Icon icon="vscode-icons:file-type-pdf2" width={22} height={22} />
          </div>
          <div className="bg-red-500 py-0.5 text-center">
            <span className="text-[8px] font-bold text-white tracking-wider">
              PDF
            </span>
          </div>
        </div>
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="m-0 text-[13px] font-medium text-gray-700 truncate">
          {fileName}
        </p>
        <p className="m-0 text-[11px] text-gray-400 mt-0.5">Resume / CV</p>
      </div>

      {/* Open button — Outlined style */}
      <a
        href={resumeUrl}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2563EB] text-[#2563EB] text-[12px] font-semibold no-underline bg-white hover:bg-[#2563EB] hover:text-white transition-all"
      >
        <Icon
          icon="material-symbols:open-in-new-rounded"
          width={14}
          height={14}
        />
        เปิด
      </a>
    </div>
  );
}
