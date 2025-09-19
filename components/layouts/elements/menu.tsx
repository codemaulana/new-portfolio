"use client";
import { useEffect, useState } from "react";
import { FaHamburger } from "react-icons/fa";
import MenuItems from "./menu_items";

export default function Menu() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    if (toggleMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [toggleMenu]);
  return (
    <div>
      <button onClick={handleMenu} className="cursor-pointer lg:hidden">
        <FaHamburger size={25} />
      </button>

      {toggleMenu && <MenuItems onClick={handleMenu} />}
    </div>
  );
}
