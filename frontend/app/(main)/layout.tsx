import TopBar from "../components/layouts/TopBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {" "}
      <TopBar />
      {children}
    </div>
  );
}
