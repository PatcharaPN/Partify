import TopBar from "../components/layouts/TopBar";

export default function AuthLayout({
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
