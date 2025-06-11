import PropTypes from "prop-types"

export default function ControlledInput({
  title,
  children, // placeholder
  type,
  value,
  onChange,
  disabled,
}) {
  const isControlled =
    value !== undefined && onChange !== undefined && value !== null

  return (
    <fieldset className={`fieldset w-full`}>
      <legend className="text-sm text-gray-500">{title}</legend>
      <input
        type={type}
        required
        className={`w-full  input appearance-none validator disabled:border-[#0057d6] disabled:!text-black placeholder:text-gray-500`}
        placeholder={children?.toString?.() ?? undefined}
        pattern={type === "tel" ? "[0-9]*" : undefined}
        minLength={type === "tel" ? "8" : undefined}
        maxLength={type === "tel" ? "15" : undefined}
        disabled={disabled}
        value={isControlled ? value ?? "" : value ? value : undefined}
        onChange={isControlled ? onChange : undefined}
      />
    </fieldset>
  )
}

ControlledInput.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}
