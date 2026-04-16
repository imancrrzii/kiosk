import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const sizeConfig = {
  large: {
    button: "h-[48px] w-[48px]",
    icon: "24px",
  },
  medium: {
    button: "h-[40px] w-[40px]",
    icon: "20px",
  },
  small: {
    button: "h-[32px] w-[32px]",
    icon: "16px",
  },
};

const variantConfig = {
  primary: `
    bg-sky-500 text-white
    hover:bg-sky-600 active:bg-sky-600 active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-sky-100
  `,
  outline: `
    bg-transparent text-sky-500 ring-2 ring-sky-500
    hover:bg-sky-50 active:bg-sky-100 active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-sky-100
  `,
  clean: `
    bg-transparent text-sky-500
    hover:bg-sky-50 active:bg-sky-100 active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-sky-100
  `,
  disabled: {
    primary: `
      bg-neutral-100 text-neutral-400
      cursor-not-allowed pointer-events-none
    `,
    outline: `
      bg-transparent text-neutral-400 ring-2 ring-neutral-300
      cursor-not-allowed pointer-events-none
    `,
    clean: `
      bg-transparent text-neutral-400
      cursor-not-allowed pointer-events-none
    `,
  },
};

const ButtonIcon = ({ icon = faPlus, onClick, variant = "primary", disabled = false, size = "large" }) => {
  const config = sizeConfig[size] || sizeConfig.large;
  const variantClass = disabled ? variantConfig.disabled[variant] : variantConfig[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        ${config.button}
        ${variantClass}
        rounded-full
        transition-all duration-200 ease-in-out
        select-none
      `}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{
          fontSize: config.icon,
          width: config.icon,
          height: config.icon,
        }}
      />
    </button>
  );
};

export default ButtonIcon;
