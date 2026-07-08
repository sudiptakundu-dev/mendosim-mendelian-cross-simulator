function Card({children, className=""}) {
  return (
    <div className={`pr-6 pl-6 bg-(--bg-card) border border-(--border) rounded-xl shadow-[2px_4px_10px_var(--shadow)] ${className}`}>{children}</div>
  )
}

export default Card