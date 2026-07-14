import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <span>{siteConfig.announcement}</span>
      <span aria-hidden="true">Katman 01 / Atölye Notu</span>
    </div>
  );
}
