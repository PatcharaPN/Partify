export function formatTimeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);

  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 5) return "ขณะนี้";
  if (diffInSeconds < 60) return `${diffInSeconds} วินาทีที่แล้ว`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} นาทีที่แล้ว`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} ชั่วโมงที่แล้ว`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "เมื่อวานนี้";
  if (diffInDays < 30) return `${diffInDays} วันที่แล้ว`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} เดือนที่แล้ว`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ปีที่แล้ว`;
}
