import TopBar from "../components/layouts/TopBar";
import PostJobForm from "../components/ui/PostJobForm";
import Sidebar from "../components/ui/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar />
      <PostJobForm />
      {children}
    </div>
  );
}
