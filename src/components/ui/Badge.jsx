import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const colorConfig = {
  default: {
    solid: "bg-blue-500 text-white",
    outline: "bg-blue-50 text-blue-600 border border-blue-200",
  },
  neutral: {
    solid: "bg-gray-500 text-white",
    outline: "bg-gray-50 text-gray-600 border border-gray-200",
  },
  info: {
    solid: "bg-cyan-500 text-white",
    outline: "bg-cyan-50 text-cyan-600 border border-cyan-200",
  },
  success: {
    solid: "bg-emerald-500 text-white",
    outline: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  },
  warning: {
    solid: "bg-orange-500 text-white",
    outline: "bg-orange-50 text-orange-600 border border-orange-200",
  },
  error: {
    solid: "bg-rose-500 text-white",
    outline: "bg-rose-50 text-rose-600 border border-rose-200",
  },
  custom: {
    solid: "", 
    outline: "",
  },
};

const sizeConfig = {
  small: {
    pill: "px-2.5 py-1 text-[10px] gap-1.5",
    iconOnly: "w-6 h-6",
    iconSize: "10px",
  },
  medium: {
    pill: "px-3 py-1.5 text-xs gap-2",
    iconOnly: "w-7 h-7",
    iconSize: "12px",
  },
  large: {
    pill: "px-4 py-2 text-sm gap-2.5",
    iconOnly: "w-9 h-9",
    iconSize: "14px",
  },
};

const stateOutline = {
    
};

const Badge = ({
  label,
  leftIcon,
  rightIcon,
  color = "default", // default, neutral, info, success, warning, error, custom
  variant = "solid", // solid, light
  size = "medium", // small, medium, large
  className = "",
  onClick,
  onRightIconClick,
}) => {
  const isIconOnly = !label;
  const currentSize = sizeConfig[size] || sizeConfig.medium;
  const currentColor = colorConfig[color] || colorConfig.default;
  const currentVariantClass = currentColor[variant] || currentColor.solid;

  const sizeClass = isIconOnly ? currentSize.iconOnly : currentSize.pill;

  return (
    <div
      onClick={onClick}
      className={`
        inline-flex items-center justify-center font-semibold tracking-wide
        rounded-full transition-colors duration-200
        ${sizeClass}
        ${currentVariantClass}
        ${onClick ? "cursor-pointer hover:opacity-85 shadow-sm" : ""}
        ${className}
      `}
    >
      {/* ── Left Icon ── */}
      {leftIcon && (
        <FontAwesomeIcon
          icon={leftIcon}
          style={{ fontSize: currentSize.iconSize }}
          className="shrink-0"
        />
      )}

      {/* ── Label (jika ada) ── */}
      {label && <span>{label}</span>}

      {/* ── Right Icon ── */}
      {rightIcon && (
        <button
          type="button"
          onClick={(e) => {
            if (onRightIconClick) {
              e.stopPropagation();
              onRightIconClick(e);
            }
          }}
          className={`
            shrink-0 flex items-center justify-center rounded-full transition-all 
            ${
               variant === "solid"
                 ? "hover:bg-white/20 active:bg-white/30"
                 : "hover:bg-black/5 active:bg-black/10"
            }
          `}
          // Memberi sedikit ruang klik di rightIcon agar enak ditekan
          style={{ 
            width: `calc(${currentSize.iconSize} + 10px)`, 
            height: `calc(${currentSize.iconSize} + 10px)` 
          }}
          aria-label="Remove/Close Action"
        >
          <FontAwesomeIcon
            icon={rightIcon}
            style={{ fontSize: currentSize.iconSize }}
          />
        </button>
      )}
    </div>
  );
};

export default Badge;
