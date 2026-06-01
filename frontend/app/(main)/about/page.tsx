import { Icon } from "@iconify/react";
import React from "react";

const imageSource = [
  "./images/project_img_1.webp",
  "./images/project_img_2.webp",
  "./images/project_img_3.webp",
  "./images/project_img_4.webp",
  "./images/project_img_5.webp",
  "./images/project_img_6.webp",
];

const AboutPage = () => {
  return (
    <main className="flex flex-col items-center min-h-[calc(100vh-56px)] px-8 py-12">
      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-6xl font-bold mb-6">
          เกี่ยวกับ <span className="text-primary">Partify</span>
        </h1>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
          แพลตฟอร์มหางานพาร์ทไทม์แบบ Full-Stack
        </p>
        <p className="mt-4 text-lg text-gray-500">
          พัฒนาด้วย Next.js, NestJS, Prisma และ Supabase
        </p>
      </div>

      {/* Architecture */}
      <div className="max-w-5xl mx-auto mb-24">
        <h2 className="text-4xl font-bold text-center mb-10">โครงสร้างระบบ</h2>
        <div className="bg-white border border-gray-100 rounded-3xl p-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div className="space-y-6">
              <div>
                <div className="font-semibold text-lg">Frontend</div>
                <div className="text-primary">Next.js 14 (App Router)</div>
                <div className="text-sm text-gray-500">
                  TypeScript + Tailwind + Redux Toolkit
                </div>
              </div>
            </div>

            <div className="text-4xl text-gray-300 hidden md:block">→</div>

            <div className="space-y-6">
              <div>
                <div className="font-semibold text-lg">API Layer</div>
                <div className="text-primary">RESTful API</div>
                <div className="text-sm text-gray-500">
                  JWT Authentication + Guards
                </div>
              </div>
            </div>

            <div className="text-4xl text-gray-300 hidden md:block">→</div>

            <div className="space-y-6">
              <div>
                <div className="font-semibold text-lg">Backend</div>
                <div className="text-primary">NestJS</div>
                <div className="text-sm text-gray-500">
                  Modular Architecture
                </div>
              </div>
            </div>

            <div className="text-4xl text-gray-300 hidden md:block">→</div>

            <div className="space-y-6">
              <div>
                <div className="font-semibold text-lg">Database Access</div>
                <div className="text-primary">Prisma ORM</div>
                <div className="text-sm text-gray-500">
                  Type-safe Queries + Migrations
                </div>
              </div>
            </div>

            <div className="text-4xl text-gray-300 hidden md:block">→</div>

            <div>
              <div className="font-semibold text-lg">Database</div>
              <div className="text-primary">Supabase (PostgreSQL)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges & Solutions */}
      <div className="max-w-5xl mx-auto mb-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          ปัญหาที่เจอและวิธีแก้ไข
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-100 rounded-3xl p-8">
            <h3 className="font-semibold text-xl mb-4">
              ป้องกันการสมัครงานซ้ำ
            </h3>
            <p className="text-gray-600 mb-4">
              ผู้สมัครไม่ควรสามารถสมัครงานเดียวกันได้ซ้ำ
            </p>
            <div className="text-sm text-gray-500 space-y-2">
              <div>
                <strong>วิธีแก้ไข:</strong> Composite Unique Constraint + Upsert
                Logic
              </div>
              <div>
                <strong>การใช้งาน:</strong> Prisma + Validation ที่ Backend
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8">
            <h3 className="font-semibold text-xl mb-4">
              การจัดการสมาชิกในบริษัท
            </h3>
            <p className="text-gray-600 mb-4">
              รองรับหลายระดับสิทธิ์ (Owner, Admin, HR, Recruiter, Viewer)
            </p>
            <div className="text-sm text-gray-500 space-y-2">
              <div>
                <strong>วิธีแก้ไข:</strong> Role-Based Access Control (RBAC)
              </div>
              <div>
                <strong>กระบวนการ:</strong> ระบบเชิญสมาชิก + การแจ้งเตือน +
                การจัดการสถานะ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Database Overview */}
      <div className="max-w-5xl mx-auto mb-24">
        <h2 className="text-4xl font-bold text-center mb-8">
          โครงสร้างฐานข้อมูล
        </h2>
        <div className="bg-neutral-900 text-white rounded-3xl p-10 font-mono text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <span className="text-primary">Users</span>
              <span className="text-gray-400">
                {" "}
                → Profile, Resume, Bookmarks, Applications
              </span>
            </div>
            <div>
              <span className="text-primary">Company</span>
              <span className="text-gray-400"> → Jobs, Members, Invites</span>
            </div>
            <div>
              <span className="text-primary">Jobs</span>
              <span className="text-gray-400">
                {" "}
                → Applications, Bookmarks, Notifications
              </span>
            </div>
            <div>
              <span className="text-primary">Applications</span>
              <span className="text-gray-400">
                {" "}
                → ติดตามสถานะ (PENDING → INTERVIEW → ACCEPTED)
              </span>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          10+ Prisma Models • Supabase Hosting • Relational Integrity
        </p>
      </div>

      {/* Metrics */}
      <div className="max-w-5xl mx-auto mb-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          ขนาดของโปรเจกต์
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10+", label: "Database Models" },
            { number: "15+", label: "Backend Modules" },
            { number: "50+", label: "Reusable Components" },
            { number: "20+", label: "API Endpoints" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {item.number}
              </div>
              <div className="text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 text-sm text-gray-500">
          Role-Based Access Control • OAuth (Google + Line) • JWT Authentication
          • Supabase • Cloudinary • Optimistic Updates
        </div>
      </div>

      {/* Screenshots */}
      <div className="max-w-5xl mx-auto mb-24">
        <h2 className="text-4xl font-bold text-center mb-12">ภาพหน้าจอ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageSource.map((src, index) => (
            <div
              key={index}
              className="aspect-video bg-neutral-100 rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={src}
                alt={`Partify Screenshot ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Future Improvements */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">
          แผนพัฒนาในอนาคต
        </h2>
        <div className="bg-gray-50 rounded-3xl p-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-green-500">•</span>{" "}
              การแจ้งเตือนแบบเรียลไทม์ด้วย WebSocket
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">•</span> การค้นหาขั้นสูงด้วย
              Elasticsearch
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">•</span> ระบบจับคู่งานด้วย AI
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-green-500">•</span> Docker + CI/CD Pipeline
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">•</span> การทดสอบแบบครอบคลุม
            </li>
            <li className="flex gap-3">
              <span className="text-green-500">•</span> ระบบส่งอีเมลเชิญสมาชิก
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto flex justify-center mt-16 mb-10">
        <a
          href="https://github.com/PatcharaPN/Partify"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl transition-all duration-200 text-lg font-medium shadow-lg shadow-gray-900/30 hover:scale-105"
        >
          <Icon icon="mdi:github" className="w-7 h-7" />
          <span>ดู Source Code บน GitHub</span>
          <Icon
            icon="mdi:arrow-top-right"
            className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </main>
  );
};

export default AboutPage;
