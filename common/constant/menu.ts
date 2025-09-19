import { Newspaper, PenLine } from "lucide-react";
import { AiOutlineProject } from "react-icons/ai";
import { LuLeaf } from "react-icons/lu";
import { RiHomeSmile2Line } from "react-icons/ri";

export const menu = [
  {
    title: "Home",
    href: "/",
    icon: RiHomeSmile2Line,
  },
  {
    title: "About",
    href: "/about",
    icon: LuLeaf,
  },
  {
    title: "Article",
    href: "/articles",
    icon: PenLine,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: AiOutlineProject,
  },
];
