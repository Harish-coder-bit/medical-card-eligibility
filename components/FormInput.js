export default function FormInput({ label, id, type = "text", value, onChange, required = false, error, ...rest }) {
  const isTextarea = type === "textarea";
  const isCheckbox = type === "checkbox";

  const inputClasses = `py-2.5 px-3 text-base border rounded-lg bg-white transition-colors duration-200 focus:border-[#2c3e50] focus:ring-2 focus:ring-[#2c3e50]/20 focus:outline-none ${
    error ? "border-red-500" : "border-gray-300"
  }`;

  return (
    <div className={`flex ${isCheckbox ? "flex-row items-center gap-2 flex-wrap" : "flex-col gap-1.5"} mb-4`}>
      {isCheckbox ? (
        <>
          <input
            type="checkbox"
            id={id}
            checked={value}
            onChange={onChange}
            required={required}
            className="w-4 h-4 accent-[#2c3e50] cursor-pointer"
          />
          <label htmlFor={id}>{label}</label>
          {error && <span className="text-red-600 text-xs basis-full">{error}</span>}
        </>
      ) : (
        <>
          <label htmlFor={id} className="font-semibold text-sm">{label}</label>
          {isTextarea ? (
            <textarea
              id={id}
              value={value}
              onChange={onChange}
              required={required}
              className={`${inputClasses} font-[inherit] resize-y`}
              rows={4}
              {...rest}
            />
          ) : (
            <input
              type={type}
              id={id}
              value={value}
              onChange={onChange}
              required={required}
              className={inputClasses}
              {...rest}
            />
          )}
          {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
        </>
      )}
    </div>
  );
}
