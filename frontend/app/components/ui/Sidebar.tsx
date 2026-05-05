"use client";
import { useEmployerJobs } from "@/app/hooks/useEmployerJobs";
import { useJobApplications } from "@/app/hooks/useJobApplications";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";

const getNavItems = (total: number) => [
  {
    path: "/dashboard/employer/overviews",
    label: "Dashboard",
    icon: <Icon icon="mdi:view-dashboard" className="w-4 h-4" />,
  },
  {
    path: "/dashboard/employer/job",
    label: "My Jobs",
    icon: <Icon icon="mdi:briefcase-outline" className="w-4 h-4" />,
  },
  {
    path: "/dashboard/employer/applicants",
    label: "Applicants",
    badge: total > 0 ? total : undefined,
    icon: <Icon icon="mdi:account-group-outline" className="w-4 h-4" />,
  },
  {
    path: "",
    label: "Messages",
    icon: <Icon icon="mdi:message-outline" className="w-4 h-4" />,
  },
];

const Sidebar = () => {
  const { totalApplicants } = useJobApplications();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const navItems = getNavItems(totalApplicants);
  return (
    <aside className="w-60 flex flex-col bg-white border-gray-100 shrink-0">
      {/* Nav */}
      <nav className="flex-1 px-6 space-y-0.5 py-4">
        {navItems.map((item) => {
          const isActive = activeNav === item.label;
          return (
            <Link key={item.label} href={item.path}>
              <button
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
