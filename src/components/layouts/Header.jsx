import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../ui/Button";
import {
  faBars,
  faMagnifyingGlass,
  faHeart,
  faBagShopping,
  faChevronDown,
  faArrowUpFromBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo-bsb.png";
import avatarAlbert from "../../assets/images/avatar-albert.png";

const Header = ({
  userName = "Robet Davis Chaniago",
  role = "Costumer Service",
  onProfileClick,
}) => {
  return (
    <header className="w-full fixed h-20 bg-white border-b border-neutral-100 shadow-sm top-0 z-50">
      <div className="w-full px-6 h-full flex items-center gap-6">
        {/* LEFT: Logo */}
        <div className="flex items-center gap-5 shrink-0">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* RIGHT: Actions + Profile */}
        <div className="flex items-center ml-auto gap-3 shrink-0">
          {/* User Profile */}
          <button
            onClick={onProfileClick}
            className="flex items-center gap-2.5 rounded-full bg-sky-100 pl-1 pr-3 py-1 transition-all duration-150"
            aria-label="User Profile"
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-[3px] border-sky-500 shrink-0">
              <img
                src={avatarAlbert}
                alt={userName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col items-start leading-tight">
              <p className="text-md font-bold text-gray-900 whitespace-nowrap">
                {userName}
              </p>
              <p className="text-xs text-neutral-500 font-medium">{role}</p>
            </div>
          </button>

          <Button
            variant="clean"
            label="Keluar"
            rightIcon={faRightFromBracket}
            size="medium"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
