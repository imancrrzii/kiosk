import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sizeConfig = {
  large: {
    button: "h-[48px] w-fit px-6 text-[16px]",
    icon: "20px",
  },
  medium: {
    button: "h-[40px] w-fit px-5 text-[14px]",
    icon: "16px",
  },
  small: {
    button: "h-[32px] w-fit px-4 text-[12px]",
    icon: "12px",
  },
};

const variantConfig = {
  primary: `
    bg-sky-500 text-white
    hover:bg-sky-600 active:bg-sky-600 active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-sky-100
  `,
  success: `
    bg-emerald-500 text-white
    hover:bg-emerald-600 active:bg-emerald-600 active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-emerald-100
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
  rose: `
    bg-rose-500 text-white
    hover:bg-rose-600 active:bg-rose-600 active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-rose-100
  `,
  purple: `
    bg-purple-500 text-white
    hover:bg-purple-600 active:bg-purple-600 active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-purple-100
  `,
  orange: `
    bg-orange-500 text-white
    hover:bg-orange-600 active:bg-orange-600 active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-orange-100
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
    rose: `
      bg-neutral-100 text-neutral-400
      cursor-not-allowed pointer-events-none
    `,
    purple: `
      bg-neutral-100 text-neutral-400
      cursor-not-allowed pointer-events-none
    `,
    orange: `
      bg-neutral-100 text-neutral-400
      cursor-not-allowed pointer-events-none
    `,
  },
};

const Button = ({
  label = "Button",
  leftIcon = null,
  rightIcon = null,
  size = "large",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const config = sizeConfig[size] || sizeConfig.large;
  const variantClass = disabled ? variantConfig.disabled[variant] : variantConfig[variant];

  return (
    <button
      type={type}
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
      {leftIcon && <FontAwesomeIcon icon={leftIcon} style={{ fontSize: config.icon, display: "block" }} />}
      <span style={{ lineHeight: 1, display: "block" }}>{label}</span>
      {rightIcon && <FontAwesomeIcon icon={rightIcon} style={{ fontSize: config.icon, display: "block" }} />}
    </button>
  );
};

export default Button;
