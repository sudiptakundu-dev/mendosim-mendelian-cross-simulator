function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  icon,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        px-4 py-2.5
        rounded-xl
        font-medium
        bg-emerald-500
        text-white
        hover:opacity-90
        active:scale-[0.98]
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:active:scale-100
        ${className}
      `}
    >
      {icon && (
        <span className="material-symbols-outlined text-[20px]">
          {icon}
        </span>
      )}

      <span>{children}</span>
    </button>
  );
}

export default Button;