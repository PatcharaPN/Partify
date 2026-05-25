import Footer from "../components/layouts/Footer";
import TopBar from "../components/layouts/TopBar";
import PostJobForm from "../components/ui/PostJobForm";
import { AuthProvider } from "../providers/AuthProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {" "}
      <AuthProvider>
        <TopBar />
        {children}
        <Footer />
      </AuthProvider>
    </div>
  );
}
