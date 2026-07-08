function InputLabel({ label, htmlFor, required = false }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-(--text-muted) mb-2 uppercase tracking-wide"
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

export default InputLabel;