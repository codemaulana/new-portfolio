import Image from "next/image";
import Link from "next/link";
import { LuLeaf } from "react-icons/lu";
import { RiHomeSmile2Line } from "react-icons/ri";
import { ChangeMode } from "./elements/change_mode_toggle";
import { MdVerified } from "react-icons/md";
import Stars from "./elements/stars";
import { stars } from "@/common/constant/stars";
import { menu } from "@/common/constant/menu";

export default function DesktopNavbar() {
  return (
    <nav className="group hidden lg:block bg-white dark:bg-black overflow-hidden fixed top-0 left-0 bottom-0 py-8 ease-in-out duration-500 transition-all">
      <div className="static group-hover:px-3 group-hover:animate-unblur px-8">
        <div className="ease-in-out duration-500 transition-all group-hover:py-4 group-hover:px-4 group-hover:border-2 group-hover:border-neutral-300 dark:group-hover:border-neutral-700 rounded-tl-4xl rounded-tr-md rounded-br-4xl rounded-bl-md flex flex-col gap-2">
          {stars.map((star, index) => (
            <Stars
              key={index}
              size={star.size}
              position={{ top: star.position.top, left: star.position.left }}
              duration={star.duration}
              delay={star.delay}
            />
          ))}
          <div className="w-10 h-10 mx-auto group-hover:w-20 group-hover:h-20 rounded-full ease-in-out duration-500 transition-all overflow-hidden">
            <Image
              src={"/images/my.png"}
              width={200}
              height={200}
              alt="logo"
              className="object-contain"
            />
          </div>
          <h1 className="hidden absolute -left-full group-hover:static  ease-in-out duration-500 transition-all group-hover:flex items-center gap-2 font-semibold">
            Muhammad Nur Maulana
            <MdVerified className="text-blue-700" size={20} />
          </h1>
          <a
            target="_blank"
            href="https://www.instagram.com/ctizz4?igsh=amw2ZHA1YmtzNWtm"
            className="hidden absolute -left-full group-hover:static  ease-in-out duration-500 transition-all group-hover:flex items-center justify-center gap-2 font-semibold text-xs text-neutral-400"
          >
            @ctizz4
          </a>
          <div className="absolute top-3 right-6 hidden group-hover:block">
            <ChangeMode />
          </div>
          <div className="hidden md:block mt-4 mb-4 group-hover:hidden">
            <ChangeMode />
          </div>
        </div>
        <div className="border-t-4 border-neutral-400 dark:border-neutral-500 ease-in-out duration-500 transition-all mt-8 py-2">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-2 dark:hover:text-neutral-400 hover:text-neutral-700 p-3 rounded-md transition-all duration-300"
            >
              <item.icon size={25} />
              <h1 className="opacity-0 group-hover:opacity-100 absolute -left-full group-hover:static text-sm font-bold  ease-in-out duration-500 transition-all">
                {item.title}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
