import { useState, useEffect } from "react"
import PropTypes from "prop-types"

export default function Select({
  children,
  title,
  option,
  defaultValue,
  disabled,
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "")

  useEffect(() => {
    setSelectedValue(defaultValue || "")
  }, [defaultValue])

  const handleChange = (e) => {
    setSelectedValue(e.target.value)
  }

  return (
    <fieldset className="w-full fieldset">
      <legend className="text-sm text-gray-500">{title}</legend>
      <select
        className={`w-full select validator ${
          selectedValue === "" ? "text-gray-400" : "text-black"
        }${
          defaultValue && " border border-[#0057d6]"
        } disabled:!text-black disabled:border disabled:border-[#0057d6]`}
        value={selectedValue}
        onChange={handleChange}
        required
        disabled={disabled}
      >
        <option value="" disabled>
          {children}
        </option>
        {option.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </fieldset>
  )
}

Select.propTypes = {
  children: PropTypes.string,
  title: PropTypes.string,
  option: PropTypes.array,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
}
