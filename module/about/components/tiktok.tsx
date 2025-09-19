import { profileData } from "@/common/constant/tiktok";
import ProfileHeader from "@/components/layouts/elements/profile_tiktok";
import TabNavigation from "@/components/layouts/elements/tab_navigation_tiktok";
import VideoGrid from "@/components/layouts/elements/video_grid_tiktok";
import { FaTiktok } from "react-icons/fa6";

export default function Tiktok() {
  return (
    <section className="bg-black text-white min-h-screen flex flex-col justify-center gap-3">
      <div className="flex items-center gap-2 ">
        <FaTiktok size={25} className="text-shadow-md text-shadow-white" />
        <h2 className="text-lg font-bold">Tiktok</h2>
      </div>
      <div className="w-full max-w-4xl bg-[#121212]">
        <ProfileHeader data={profileData} />
        <TabNavigation />
        <VideoGrid videos={profileData.videos} />
      </div>
    </section>
  );
}
