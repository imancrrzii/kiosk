import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleInfo,
  faCircleCheck,
  faCircleXmark,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";


const baseWrapper = "w-full rounded-2xl p-4";

//  Variant Config 
const variantConfig = {

  default: {
    wrapper: "bg-orange-500",
    icon: faCircleExclamation,
    iconClass: "text-white",
    titleClass: "text-white",
    messageClass: "text-orange-100",
    closeClass: "text-white/80 hover:text-white",
  },
 
  info: {
    wrapper: "bg-sky-50",
    icon: faCircleInfo,
    iconClass: "text-sky-500",
    titleClass: "text-gray-900",
    messageClass: "text-neutral-500",
    closeClass: "text-neutral-400 hover:text-neutral-700",
  },
  success: {
    wrapper: "bg-sky-50",
    icon: faCircleCheck,
    iconClass: "text-emerald-500",
    titleClass: "text-gray-900",
    messageClass: "text-neutral-500",
    closeClass: "text-neutral-400 hover:text-neutral-700",
  },
  warning: {
    wrapper: "bg-orange-50",
    icon: faCircleExclamation,
    iconClass: "text-orange-500",
    titleClass: "text-gray-900",
    messageClass: "text-neutral-500",
    closeClass: "text-neutral-400 hover:text-neutral-700",
  },
  error: {
    wrapper: "bg-red-50",
    icon: faCircleXmark,
    iconClass: "text-red-500",
    titleClass: "text-gray-900",
    messageClass: "text-neutral-500",
    closeClass: "text-neutral-400 hover:text-neutral-700",
  },
};

//  Component 
const Notification = ({
  // Content
  title = "Title",
  message,
  // Config
  variant = "general",
  // Visibility
  showClose = true,
  // Handlers
  onClose,
  // Extra
  className = "",
}) => {
  const config = variantConfig[variant] || variantConfig.info;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        ${baseWrapper}
        ${config.wrapper}
        ${className}
      `}
    >
      {/* Top row: icon + title + close button */}
      <div className="flex items-start gap-3">

        {/* Icon */}
        <FontAwesomeIcon
          icon={config.icon}
          className={`shrink-0 mt-[2px] text-xl ${config.iconClass}`}
          aria-hidden="true"
        />

        {/* Title + message */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`font-semibold text-base leading-tight ${config.titleClass}`}>
              {title}
            </span>

            {/* Close button */}
            {showClose && (
              <button
                type="button"
                aria-label="Tutup notifikasi"
                onClick={onClose}
                className={`
                  shrink-0 leading-none
                  transition-colors duration-150 cursor-pointer
                  ${config.closeClass}
                `}
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            )}
          </div>

          {/* Message */}
          {message && (
            <p className={`mt-1 text-sm leading-relaxed ${config.messageClass}`}>
              {message}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Notification;
