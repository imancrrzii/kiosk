import React, { useId, useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import CheckBox from "./CheckBox";

// ─── Size config (sesuai InputField large)
const SIZE = {
  trigger: "h-[48px] px-5 gap-3 text-base",
  item: "h-[48px] px-5 gap-3 text-base",
  icon: "20px",
  chevron: "16px",
  check: "10px",
  helper: "text-sm",
};

// ─── Trigger state config
const TRIGGER_STATE = {
  default: {
    ring: "ring-1 ring-neutral-200 hover:ring-2 hover:ring-sky-400",
    bg: "bg-white",
    text: "text-gray-900",
    placeholder: "text-neutral-400",
    icon: "text-neutral-400",
    helper: "text-neutral-500",
    cursor: "cursor-pointer",
  },
  expanded: {
    ring: "ring-2 ring-sky-500",
    bg: "bg-white",
    text: "text-gray-900",
    placeholder: "text-neutral-400",
    icon: "text-sky-500",
    helper: "text-sky-500",
    cursor: "cursor-pointer",
  },
  disabled: {
    ring: "ring-1 ring-neutral-200",
    bg: "bg-white",
    text: "text-neutral-300",
    placeholder: "text-neutral-300",
    icon: "text-neutral-300",
    helper: "text-neutral-300",
    cursor: "cursor-not-allowed",
  },
};

// ─── Component
const Dropdown = ({
  // Content
  placeholder = "Placeholder",
  helperText = "Helper Text",
  leftIcon = faStar,
  options = [],
  // State
  value,
  onChange,
  disabled = false,
  // Visibility
  showLeftIcon = true,
  showHelperText = true,
  showSearch = false,    // tampilkan search field di dalam panel
  showItemIcons = false, // tampilkan icon di setiap item list
  showCheckbox = false,  // tampilkan checkbox di setiap item list
  // Extras
  id: propId,
  className = "",
}) => {
  const generatedId = useId();
  const id = propId || generatedId;

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);
  const searchRef = useRef(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Fokus ke search saat dropdown dibuka
  useEffect(() => {
    if (isOpen && showSearch) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
    if (!isOpen) setSearch("");
  }, [isOpen, showSearch]);

  // Resolve state key
  const stateKey = disabled ? "disabled" : isOpen ? "expanded" : "default";
  const s = TRIGGER_STATE[stateKey];

  // Label dari value yang dipilih
  const selectedLabel = options.find((o) => o.value === value)?.label ?? null;

  // Filter options berdasarkan search
  const filteredOptions = search
    ? options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    if (option.disabled) return;
    onChange?.(option.value === value ? null : option.value); // toggle selection
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
    if (e.key === "Escape") setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col gap-1 w-full ${className}`}
    >
      {/* ── Trigger ── */}
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`
          flex items-center w-full
          ${SIZE.trigger}
          ${s.ring}
          ${s.bg}
          ${s.cursor}
          rounded-full
          transition-all duration-200 ease-in-out
          outline-none
          text-left
        `}
      >
        {/* Left Icon */}
        {showLeftIcon && leftIcon && (
          <FontAwesomeIcon
            icon={leftIcon}
            className={`shrink-0 transition-colors duration-200 ${s.icon}`}
            style={{ fontSize: SIZE.icon, width: SIZE.icon, height: SIZE.icon }}
          />
        )}

        {/* Value / Placeholder */}
        <span
          className={`flex-1 min-w-0 font-medium truncate transition-colors duration-200 ${
            selectedLabel ? s.text : s.placeholder
          }`}
        >
          {selectedLabel ?? placeholder}
        </span>

        {/* Chevron */}
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className={`shrink-0 transition-all duration-200 ${s.icon}`}
          style={{
            fontSize: SIZE.chevron,
            width: SIZE.chevron,
            height: SIZE.chevron,
          }}
        />
      </button>

      {/* ── Dropdown Panel ── */}
      {isOpen && (
        <div
          role="listbox"
          className="
            absolute top-[calc(100%+6px)] left-0 right-0 z-50
            bg-white
            rounded-2xl
            ring-1 ring-neutral-200
            shadow-xl shadow-neutral-200/60
            overflow-hidden
          "
        >
          {/* Search field */}
          {showSearch && (
            <div className="px-4 py-3 border-b border-neutral-100">
              <div className="flex items-center gap-2 h-[36px] px-3 rounded-full bg-neutral-50 ring-1 ring-neutral-200 focus-within:ring-2 focus-within:ring-sky-400 transition-all duration-150">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-neutral-400 shrink-0"
                  style={{ fontSize: "14px" }}
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="flex-1 min-w-0 bg-transparent outline-none text-sm text-gray-900 placeholder:text-neutral-400 font-medium"
                />
              </div>
            </div>
          )}

          {/* Options list */}
          <ul className="max-h-[240px] overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <li className="flex items-center justify-center h-[48px] text-sm text-neutral-400">
                No options found
              </li>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;
                const isDisabled = !!option.disabled;

                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={isDisabled}
                    onClick={() => handleSelect(option)}
                    className={`
                      group flex items-center gap-3
                      ${SIZE.item}
                      font-medium
                      transition-colors duration-150
                      ${
                        isDisabled
                          ? "cursor-not-allowed text-neutral-300"
                          : isSelected
                            ? "cursor-pointer text-gray-900 bg-sky-50"
                            : "cursor-pointer text-gray-900 hover:bg-sky-50 hover:text-sky-600"
                      }
                    `}
                  >
                    {/* Item left icon — hanya tampil jika showItemIcons=true */}
                    {showItemIcons && (
                      <FontAwesomeIcon
                        icon={option.icon ?? faStar}
                        className={`shrink-0 transition-colors duration-150 ${
                          isDisabled
                            ? "text-neutral-300"
                            : isSelected
                              ? "text-neutral-400"
                              : "text-neutral-400 group-hover:text-sky-400"
                        }`}
                        style={{
                          fontSize: SIZE.icon,
                          width: SIZE.icon,
                          height: SIZE.icon,
                        }}
                      />
                    )}

                    {/* Label */}
                    <span className="flex-1 min-w-0 truncate">
                      {option.label}
                    </span>

                    {/* Checkbox on the right — hanya tampil jika showCheckbox=true */}
                    {showCheckbox && (
                      <CheckBox
                        size="medium"
                        checked={isSelected}
                        disabled={isDisabled}
                        onChange={() => handleSelect(option)}
                        className="pointer-events-none" // klik dihandle oleh <li>
                      />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {/* ── Helper Text ── */}
      {showHelperText && (
        <span
          className={`pl-6 pr-6 block transition-colors duration-200 ${SIZE.helper} ${s.helper}`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Dropdown;
