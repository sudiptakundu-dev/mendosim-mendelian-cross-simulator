function CardHeader({ icon, text, className="" }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-(--text-primary)">
          {icon}
        </span>

        <span className="text-lg font-medium text-(--text-primary)">
          {text}
        </span>
      </div>

      <hr className="border-(--border)" />
    </div>
  );
}

export default CardHeader;