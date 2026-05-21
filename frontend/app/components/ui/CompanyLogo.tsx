import { Icon } from "@iconify/react";

function CompanyLogo({ url }: { url?: string }) {
  return (
    <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
      {url ? (
        <img src={url} alt="" className="w-full h-full object-cover" />
      ) : (
        <Icon
          icon="mdi:office-building-outline"
          width="20"
          className="text-gray-400"
        />
      )}
    </div>
  );
}
export default CompanyLogo;
