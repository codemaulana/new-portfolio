import { Play } from "lucide-react";
import Image from "next/image";

type Video = {
  id: number;
  thumbnailUrl: string;
  views: string;
};

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid my-2 grid-cols-3 gap-2 p-1">
      {videos.map((video) => (
        <a
          target="_blank"
          href="https://www.tiktok.com/@elitescr"
          key={video.id}
          className="relative h-32 md:h-72 bg-gray-800"
        >
          <Image
            src={video.thumbnailUrl}
            alt="Video thumbnail"
            fill
            className="object-cover bg-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white font-bold text-sm">
            <Play size={16} />
            <span>{video.views}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
