import React, { useId, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";

//  Size Config 
const sizeConfig = {
  medium: { box: "w-5 h-5", iconSize: "10px", label: "text-base" },
  large:  { box: "w-6 h-6", iconSize: "12px", label: "text-lg" },
};

//  Component 
const CheckBox = ({
  // Content
  label,
  // State
  checked = false,
  indeterminate = false,
  disabled = false,
  readOnly = false,
  // Config
  size = "medium",
  // Handlers
  onChange,
  // Extras
  id: propId,
  className = "",
}) => {
  const generatedId = useId();
  const id = propId || generatedId;
  const inputRef = useRef(null);

  // Sync indeterminate state to native input (not a standard HTML attribute)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const config     = sizeConfig[size] || sizeConfig.medium;
  const isLocked   = disabled || readOnly;
  const isActive   = checked || indeterminate;

  const handleChange = (e) => {
    if (isLocked) return;
    onChange?.(e);
  };

  //  Box visual classes 
  let boxClasses;
  if (isLocked) {
    // Disabled / Read-only — gray, no interaction styles
    boxClasses =
      "border border-neutral-300 bg-white";
  } else if (isActive) {
    // Checked / Indeterminate — filled orange, subtle hover darken
    boxClasses =
      "border-2 border-orange-400 bg-orange-400 " +
      "group-hover:border-orange-500 hover:border-4 group-hover:bg-orange-500";
  } else {
    // Default unchecked — border only, hover/focus via peer + group
    boxClasses =
      "border border-neutral-300 bg-white " +
      "group-hover:border-2 group-hover:border-orange-400 " +
      "peer-focus-visible:border-2 peer-focus-visible:border-orange-500 " +
      "peer-focus-visible:ring-2 peer-focus-visible:ring-orange-100";
  }

  // Icon color 
  const iconClass = isLocked ? "text-neutral-400" : "text-white";

  // Label color 
  const labelClass = isLocked ? "text-neutral-400" : "text-gray-900";

  return (
    <label
      htmlFor={id}
      className={`
        group inline-flex items-center gap-2
        ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {/*
       * Hidden native input — drives accessibility (keyboard, screen readers)
       * and provides peer-* modifier hooks for styling.
       */}
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : checked}
        aria-readonly={readOnly}
        className="peer sr-only"
      />

      {/* Custom visual checkbox */}
      <span
        className={`
          relative flex-shrink-0 flex items-center justify-center
          ${config.box}
          rounded-[6px]
          transition-all duration-150 ease-in-out
          ${boxClasses}
        `}
        aria-hidden="true"
      >
        {isActive && (
          <FontAwesomeIcon
            icon={indeterminate ? faMinus : faCheck}
            className={iconClass}
            style={{ fontSize: config.iconSize }}
          />
        )}
      </span>

      {/* Optional label */}
      {label && (
        <span
          className={`
            ${config.label} font-medium select-none
            transition-colors duration-150
            ${labelClass}
          `}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default CheckBox;
