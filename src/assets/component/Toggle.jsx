import React, { useId, useRef, useState, useCallback } from "react";

// Hold-press config
const HOLD_DELAY_MS = 600; // ms sebelum aksi "hold" terpicu

// Component
const Toggle = ({
  // Content
  label,
  // State
  checked = false,
  disabled = false,
  // Handlers
  onChange,
  onHold, // dipanggil jika toggle ditahan > HOLD_DELAY_MS
  // Extras
  id: propId,
  className = "",
}) => {
  const generatedId = useId();
  const id = propId || generatedId;

  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHolding, setIsHolding] = useState(false); // animasi progress hold

  const holdTimerRef = useRef(null);
  const holdFiredRef = useRef(false);

  // Derived visual flags
  const isOn = checked && !disabled;
  const isOff = !checked;

  // Hold-press logic
  const startHold = useCallback(() => {
    if (disabled) return;
    holdFiredRef.current = false;
    setIsPressed(true);
    setIsHolding(true);

    holdTimerRef.current = setTimeout(() => {
      holdFiredRef.current = true;
      setIsHolding(false);
      setIsPressed(false);
      onHold?.({ checked });
    }, HOLD_DELAY_MS);
  }, [disabled, checked, onHold]);

  const endHold = useCallback(() => {
    clearTimeout(holdTimerRef.current);
    setIsHolding(false);
    setIsPressed(false);

    // Jika hold TIDAK terpicu, anggap sebagai klik biasa
    if (!holdFiredRef.current) {
      onChange?.(!checked);
    }
    holdFiredRef.current = false;
  }, [checked, onChange]);

  const cancelHold = useCallback(() => {
    clearTimeout(holdTimerRef.current);
    holdFiredRef.current = false;
    setIsHolding(false);
    setIsPressed(false);
  }, []);

  // Keyboard toggle (Space / Enter)
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      startHold();
    }
  };

  const handleKeyUp = (e) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      endHold();
    }
  };

  // Track styles
  let trackClasses;
  if (disabled) {
    trackClasses = checked
      ? "bg-sky-200 cursor-not-allowed"
      : "bg-neutral-200 cursor-not-allowed";
  } else if (checked) {
    trackClasses =
      "bg-sky-500 cursor-pointer " +
      (isFocused ? "ring-4 ring-sky-100" : "") +
      (isPressed ? " scale-95" : "");
  } else {
    trackClasses =
      "bg-neutral-300 cursor-pointer " +
      (isFocused ? "ring-4 ring-sky-100 ring-offset-1" : "") +
      (isPressed ? " scale-95" : "");
  }

  // Thumb styles
  const thumbTranslate = checked ? "translate-x-5" : "translate-x-0.5";
  const thumbScale = isPressed && !disabled ? "scale-110" : "scale-100";
  const thumbShadow = isPressed && !disabled ? "shadow-md" : "shadow-sm";

  // Label color
  const labelClass = disabled ? "text-neutral-400" : "text-gray-900";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Hidden native checkbox for accessibility */}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => {}} // dikontrol via pointer/keyboard events
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        aria-checked={checked}
        aria-disabled={disabled}
        className="peer sr-only"
        onClick={(e) => {
  if (disabled) e.preventDefault();
}}
      />

      {/* Track */}
      <label
        htmlFor={id}
        aria-hidden="true"
        onPointerDown={disabled ? undefined : startHold}
        onPointerUp={endHold}
        onPointerLeave={cancelHold}
        onPointerCancel={cancelHold}
        onClick={disabled ? (e) => e.preventDefault() : undefined}  // ✅ blokir htmlFor click
        className={`
          relative inline-flex content-center items-center
          w-12 h-8
          rounded-full
          transition-all duration-200 ease-in-out
          outline-none
          ${trackClasses}
          ${disabled ? "pointer-events-none" : ""}  // ✅ blokir semua pointer events
        `}
      >
        {/* Hold progress ring — melingkari track saat ditahan */}
        {isHolding && !disabled && (
          <span
            className="
              absolute inset-0 rounded-full
              ring-2 ring-sky-400
              animate-pulse
            "
            aria-hidden="true"
          />
        )}

        {/* Thumb */}
        <span
          className={`
            absolute top-1/2 -translate-y-1/2
            w-6 h-6
            bg-white rounded-full
            transition-all duration-200 ease-in-out
            ${thumbTranslate}
            ${thumbScale}
            ${thumbShadow}
            ${className}
          `}
          aria-hidden="true"
        />
      </label>

      {/* Label text */}
      {label && (
        <span
          className={`text-base font-medium leading-none transition-colors duration-150 ${labelClass}`}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Toggle;
