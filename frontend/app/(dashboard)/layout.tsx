import TopBar from "../components/layouts/TopBar";
import PostJobForm from "../components/ui/PostJobForm";
import { Suspense } from "react";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar />
      <Suspense fallback={null}>
        <PostJobForm />
      </Suspense>
      {children}
    </div>
  );
}
