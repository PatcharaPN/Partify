"use client";
import { useCompany } from "@/app/hooks/useCompany";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const CompanyPage = () => {
  const { id } = useParams();
  const { fetchCompanyById, isLoading, company } = useCompany();

  useEffect(() => {
    if (id) {
      fetchCompanyById(id as string);
    }
  }, [id]);

  if (isLoading || !company) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-4xl shadow-lg h-[calc(100vh-70px)]">
        {/* Company Background */}
        <div className="relative w-full bg-gray-500/30 h-60">
          {company.companyImageURL && (
            <img
              src={company.companyImageURL}
              className="absolute left-2 -bottom-20 w-40 h-40 rounded-full p-2 bg-white object-cover"
            />
          )}
        </div>

        <div className="pl-50 pt-5">
          <h1 className="text-2xl font-bold">{company.companyName}</h1>

          <p className="text-gray-600 mt-2">
            {company.companyBio || "No description"}
          </p>

          <div className="mt-4 text-sm text-gray-500">
            <p>Category: {company.category || "-"}</p>
            <p>Size: {company.companySize || "-"}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyPage;
