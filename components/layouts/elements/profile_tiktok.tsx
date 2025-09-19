import Image from "next/image";
import { Settings, Share2 } from "lucide-react";
import { profileData } from "@/common/constant/tiktok";
import { TbShare3 } from "react-icons/tb";

interface ProfileHeaderProps {
  data: typeof profileData;
}

export default function ProfileHeader({ data }: ProfileHeaderProps) {
  return (
    <div className="p-4">
      <div className="flex items-start gap-4">
        <a href="https://www.tiktok.com/@elitescr" target="_blank">
          <Image
            src={data.avatarUrl}
            alt="User Avatar"
            width={90}
            height={90}
            className="rounded-full object-cover"
          />
        </a>
        <div className="flex-1 flex flex-col">
          <a
            href="https://www.tiktok.com/@elitescr"
            target="_blank"
            className="text-2xl font-bold"
          >
            {data.username}
          </a>
          <a
            href="https://www.tiktok.com/@elitescr"
            target="_blank"
            className="font-semibold"
          >
            {data.name}
          </a>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.tiktok.com/@elitescr"
              target="_blank"
              className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-sm"
            >
              Follow
            </a>
            <a
              href="https://www.tiktok.com/@elitescr"
              target="_blank"
              className="bg-neutral-800 text-white font-bold px-4 py-2 rounded-lg text-sm"
            >
              Message
            </a>
            <a href="https://www.tiktok.com/@elitescr" target="_blank">
              <TbShare3 size={24} className="cursor-pointer" />
            </a>
            <a href="https://www.tiktok.com/@elitescr" target="_blank">
              <Share2 size={24} className="cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex gap-6 my-4">
        <a
          href="https://www.tiktok.com/@elitescr"
          target="_blank"
          className="hover:underline"
        >
          <span className="font-bold">{data.stats.following}</span>
          <span className="text-gray-400">Following</span>
        </a>
        <a
          href="https://www.tiktok.com/@elitescr"
          target="_blank"
          className="hover:underline"
        >
          <span className="font-bold">{data.stats.followers}</span>
          <span className="text-gray-400">Followers</span>
        </a>
        <a
          href="https://www.tiktok.com/@elitescr"
          target="_blank"
          className="hover:underline"
        >
          <span className="font-bold">{data.stats.likes}</span>
          <span className="text-gray-400">Likes</span>
        </a>
      </div>

      <div className="flex flex-col gap-1">
        <a href="https://www.tiktok.com/@elitescr" target="_blank">
          {data.bio}
        </a>
        <a
          href="https://www.tiktok.com/@elitescr"
          target="_blank"
          className="text-gray-400 text-sm mt-1"
        >
          {data.igLink}
        </a>
      </div>
    </div>
  );
}
