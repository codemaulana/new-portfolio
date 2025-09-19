import { menu } from "@/common/constant/menu";
import Link from "next/link";
import { LuLeaf } from "react-icons/lu";
import { RiHomeSmile2Line } from "react-icons/ri";

export default function MenuItems({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed lg:static top-16 right-0 left-0 bottom-0 border-t-8 border-neutral-400 dark:border-neutral-600  bg-white  dark:bg-black p-4">
      {menu.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          onClick={onClick}
          className="flex items-center gap-5 dark:hover:text-neutral-400 hover:bg-neutral-600 hover:text-neutral-700 p-3 rounded-md transition-all duration-300"
        >
          {<item.icon size={25} />}
          <h1 className="text-sm font-bold">{item.title}</h1>
        </Link>
      ))}
    </div>
  );
}
