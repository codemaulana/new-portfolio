import { Video, Heart } from "lucide-react";
import { TiArrowRepeat } from "react-icons/ti";

export default function TabNavigation() {
  const tabs = [
    { name: "Videos", icon: <Video size={20} /> },
    {
      name: "Reposts",
      icon: <TiArrowRepeat size={20} className="rotate-90" />,
    },
    { name: "Liked", icon: <Heart size={20} /> },
  ];

  return (
    <div className="flex border-b border-gray-700">
      {tabs.map((tab, index) => (
        <a
          target="_blank"
          href="https://www.tiktok.com/@elitescr"
          key={tab.name}
          className={`flex-1 flex justify-center items-center gap-2 py-3 cursor-pointer ${
            index === 0 ? "text-white border-b-2 border-white" : "text-gray-400"
          }`}
        >
          {tab.icon}
          <span className="font-semibold">{tab.name}</span>
        </a>
      ))}
    </div>
  );
}
