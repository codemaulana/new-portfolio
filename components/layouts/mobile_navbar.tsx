import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { useTheme } from "next-themes";
import { ChangeMode } from "./elements/change_mode_toggle";
import Menu from "./elements/menu";

export default function MobileNavbar() {
  return (
    <nav className="fixed bg-white dark:bg-black w-full top-0 z-50 p-4 flex items-center justify-between lg:hidden">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full object-cover overflow-hidden">
          <Image src={"/images/my.png"} width={200} height={200} alt="logo" />
        </div>
        <h1 className="font-semibold text-lg">Maulana</h1>
        <MdVerified className="text-blue-700" size={20} />
      </div>
      <div className="flex items-center gap-3">
        <ChangeMode />

        <Menu />
      </div>
    </nav>
  );
}
