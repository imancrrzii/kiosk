import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const sizeConfig = {
  large: {
    wrapper: "h-[48px] px-5 gap-3 text-base",
    icon: "20px",
    label: "text-sm",
    helper: "text-sm",
  },
  medium: {
    wrapper: "h-[40px] px-4 gap-2 text-sm",
    icon: "16px",
    label: "text-sm",
    helper: "text-[12px]",
  },
};

const stateConfig = {
  default: {
    ring: "ring-1 ring-neutral-200 hover:ring-2 hover:ring-sky-400",
    bg: { outline: "bg-white", fill: "bg-neutral-100" },
    text: "text-gray-900 placeholder:text-neutral-400",
    icon: "text-neutral-400",
    helper: "text-neutral-500",
    label: "text-gray-900",
  },
  field: {
    ring: "ring-1 ring-neutral-400",
    bg: { outline: "bg-white", fill: "bg-neutral-200" },
    text: "text-gray-900 placeholder:text-neutral-400",
    icon: "text-neutral-500",
    helper: "text-neutral-500",
    label: "text-gray-900",
  },
  focus: {
    ring: "ring-2 ring-sky-500",
    bg: { outline: "bg-white", fill: "bg-sky-100" },
    text: "text-gray-900 placeholder:text-neutral-400",
    icon: "text-sky-500",
    helper: "text-sky-500",
    label: "text-gray-900",
  },
  info: {
    ring: "ring-2 ring-sky-400",
    bg: { outline: "bg-white", fill: "bg-sky-100" },
    text: "text-gray-900 placeholder:text-neutral-400",
    icon: "text-sky-400",
    helper: "text-gray-400",
    label: "text-gray-900",
  },
  disable: {
    ring: "ring-1 ring-neutral-200",
    bg: { outline: "bg-white", fill: "bg-neutral-100" },
    text: "text-neutral-400 placeholder:text-neutral-300 cursor-not-allowed",
    icon: "text-neutral-300",
    helper: "text-neutral-400",
    label: "text-neutral-400",
  },
  success: {
    ring: "ring-2 ring-emerald-500",
    bg: { outline: "bg-white", fill: "bg-green-100" },
    text: "text-gray-900 placeholder:text-neutral-400",
    icon: "text-emerald-500",
    helper: "text-emerald-600",
    label: "text-gray-900",
  },
  warning: {
    ring: "ring-2 ring-amber-400",
    bg: { outline: "bg-white", fill: "bg-amber-100" },
    text: "text-gray-900 placeholder:text-neutral-400",
    icon: "text-amber-400",
    helper: "text-amber-500",
    label: "text-gray-900",
  },
  error: {
    ring: "ring-2 ring-red-500",
    bg: { outline: "bg-white", fill: "bg-red-100" },
    text: "text-gray-900 placeholder:text-neutral-400",
    icon: "text-red-400",
    helper: "text-red-500",
    label: "text-gray-900",
  },
};

const InputField = ({
  // Content
  label = "Label",
  placeholder = "Placeholder",
  helperText = "Helper Text",
  value,
  onChange,
  // Visibility toggles
  showLabel = true,
  showLeftIcon = true,
  showRightIcon = true,
  showHelperText = true,
  // Icons
  leftIcon = faPlus,
  rightIcon = faPlus,
  // Config
  size = "large",
  state = "default",
  style = "outline",
  disabled = false,
  isPassword = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : "text";
  const config = sizeConfig[size] || sizeConfig.large;
  const activeState = disabled ? "disable" : state;
  const stateClass = stateConfig[activeState] || stateConfig.default;
  const bgClass = stateClass.bg[style] || stateClass.bg.outline;

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {showLabel && (
        <span
          className={`
            block font-semibold
            ${config.label}
            ${stateClass.label}
          `}
        >
          {label}
        </span>
      )}

      {/* Input Wrapper */}
      <div
        className={`
          flex items-center
          ${config.wrapper}
          ${stateClass.ring}
          ${bgClass}
          rounded-full
          transition-all duration-200 ease-in-out
          ${className}
        `}
      >
        {/* Left Icon */}
        {showLeftIcon && (
          <FontAwesomeIcon
            icon={leftIcon}
            className={`shrink-0 ${stateClass.icon}`}
            style={{ fontSize: config.icon, width: config.icon, height: config.icon }}
          />
        )}

        {/* Input */}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || activeState === "disable"}
          className={`
            flex-1 min-w-0
            bg-transparent outline-none border-none
            font-medium
            ${stateClass.text}
          `}
        />

        {/* Right Icon — eye toggle jika isPassword, icon biasa jika tidak */}
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled || activeState === "disable"}
            className={`shrink-0 cursor-pointer transition-colors duration-150 ${stateClass.icon} hover:opacity-70`}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              style={{ fontSize: config.icon, width: config.icon, height: config.icon }}
            />
          </button>
        ) : (
          showRightIcon && (
            <FontAwesomeIcon
              icon={rightIcon}
              className={`shrink-0 ${stateClass.icon}`}
              style={{ fontSize: config.icon, width: config.icon, height: config.icon }}
            />
          )
        )}
      </div>

      {/* Helper Text */}
      {showHelperText && (
        <span
          className={`pl-6 pr-6
            block text-right
            ${config.helper}
            ${stateClass.helper}
          `}
        >
          {helperText}
        </span>
      )}

    </div>
  );
};

export default InputField;
