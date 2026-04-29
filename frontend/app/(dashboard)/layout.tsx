import TopBar from "../components/layouts/TopBar";
import Sidebar from "../components/ui/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
}
