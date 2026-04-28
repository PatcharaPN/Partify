type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "INTERVIEW";

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const styles: Record<ApplicationStatus, string> = {
    PENDING: "bg-amber-50 text-amber-700",
    ACCEPTED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-700",
    INTERVIEW: "bg-blue-50 text-blue-600",
  };

  return (
    <span
      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
