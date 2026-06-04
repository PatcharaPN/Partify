import Footer from "@/app/components/layouts/Footer";
import TopBar from "@/app/components/layouts/TopBar";

export default function CompanyLaout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {" "}
      <TopBar />
      {children}
      <Footer />
    </div>
  );
}
