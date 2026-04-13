import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const sizeConfig = {
  large: {
    button: "h-[48px] w-fit px-6 text-[16px]",
    icon: "24px",
  },
  medium: {
    button: "h-[40px] w-fit px-5 text-[14px]",
    icon: "20px",
  },
  small: {
    button: "h-[32px] w-fit px-4 text-[12px]",
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
  }
};

// config
const Button = ({
  label = "Button",
  leftIcon = null,   // pass icon object, e.g. faPlus
  rightIcon = null,  // pass icon object, e.g. faArrowRight
  size = "large",
  variant = "primary",
  onClick,
  disabled = false,
  className = ""
}) => {
  const config = sizeConfig[size] || sizeConfig.large;
  const variantClass = disabled ? variantConfig.disabled[variant] : variantConfig[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-3
        ${config.button}
        ${variantClass}
        rounded-full
        font-semibold
        transition-all duration-200 ease-in-out
        select-none
        ${className}
      `}
    >
      {leftIcon && (
        <FontAwesomeIcon icon={leftIcon} style={{ fontSize: config.icon, display: "block" }} />
      )}
      <span style={{ lineHeight: 1, display: "block" }}>{label}</span>
      {rightIcon && (
        <FontAwesomeIcon icon={rightIcon} style={{ fontSize: config.icon, display: "block" }} />
      )}
    </button>
  );
};

export default Button;
