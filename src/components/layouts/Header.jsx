import React from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "@/hooks/useAuth";
import logo from "../../assets/images/logo-bsb.png";
import avatarDefault from "../../assets/images/avatar-albert.png";
import { StatusBadge } from "@/components/counter/StatusBadge";
import { useAuth } from "@/hooks/useAuth";

const Header = ({ onProfileClick, showCounterInfo = false, counterStatus }) => {
  const { user, logout, hasAnyRole } = useAuth();

  const userName = user?.name || "Guest";
  const role = user?.role || "GUEST";
  const isCounterRole = hasAnyRole(["CS", "TELLER"]);

const Header = ({
  userName = "Robet Davis Chaniago",
  role = "Costumer Service",
  onProfileClick,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full fixed h-20 bg-white border-b border-neutral-100 shadow-sm top-0 z-50">
      <div className="w-full px-6 h-full flex items-center gap-6">
        <div className="flex items-center gap-5 shrink-0">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        <div className="flex items-center ml-auto gap-3 shrink-0">
          {showCounterInfo && isCounterRole && counterStatus && <StatusBadge status={counterStatus} />}

          {/* Profile */}
          <button
            onClick={onProfileClick}
            className="flex items-center gap-2.5 rounded-full bg-sky-100 pl-1 pr-3 py-1 transition-all duration-150 hover:bg-sky-200"
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-[3px] border-sky-500 shrink-0">
              <img src={avatarDefault} alt={userName} className="w-full h-full object-cover" />
            </div>

            {/* Name + Role */}
            <div className="flex flex-col items-start leading-tight">
              <p className="text-md font-bold text-gray-900 whitespace-nowrap">{userName}</p>
              <p className="text-xs text-neutral-500 font-medium uppercase">
                {role}
                {showCounterInfo && user?.counter_name && <span className="ml-1">· {user.counter_name}</span>}
              </p>
            </div>
          </button>

          <Button
            variant="clean"
            label="Keluar"
            rightIcon={faRightFromBracket}
            size="medium"
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
