import { useState, useRef, useEffect } from "react";

function Select({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = ""
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div ref={ref} className={`relative w-64 text-(--text-primary) ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between rounded-xl border border-(--border) hover:border-emerald-500 hover:shadow-[0_0_5px_rgba(16,185,129,0.8)] bg-(--bg-input) px-4 py-3 text-left cursor-pointer"
      >
        <span>{selected?.label || placeholder}</span>

        <span className={`material-symbols-outlined transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          expand_more
        </span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-full rounded-xl border border-(--border) bg-(--bg-card) shadow-lg overflow-hidden z-50">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-(--bg-input) transition-colors ${
                value === option.value ? "bg-(--bg-input) font-medium" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { forwardRef } from "react";

const TextInput = forwardRef(function TextInput(
  {
    id,
    type = "text",
    value,
    onChange,
    placeholder = "",
    disabled = false,
    className = "",
  },
  ref
) {
  return (
    <input
      ref={ref}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        px-3 py-2
        rounded-lg
        bg-(--bg-input)
        text-(--text-primary)
        border border-(--border)
        outline-none
        transition-colors duration-200
        focus:border-emerald-500
        focus:ring-2 focus:ring-emerald-500/30
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
});

export { Select, TextInput }