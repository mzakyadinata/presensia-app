import { forwardRef } from "react"
import PropTypes from "prop-types"

const InputField = forwardRef(function InputField(
  { children, type, spesification, value, onChange, onKeyDown },
  ref
) {
  // for birthday
  const currentYear = new Date()
  const minimumYearBirth = currentYear.getFullYear() - 17
  const maximumBirthday = `${minimumYearBirth}-12-31`
  return (
    <fieldset className="relative m-0 fieldset validator">
      <legend className="p-0 fieldset-legend">{children}</legend>
      <label
        className={`rounded-lg input validator ${
          spesification == "otp"
            ? "lg:w-[4vw] lg:h-[4vw] md:w-[6vw] md:h-[6vw] sm:w-[7vw] sm:h-[7vw] w-[11vw] h-[11vw] flex lg:text-[4vh] md:text-[3vh] text-[2.5vh] bg-[rgba(0,0,0,0)] border border-white"
            : "w-full"
        }`}
      >
        <input
          type={type}
          inputMode={type === "tel" ? "numeric" : undefined}
          required
          pattern={type === "tel" ? "[0-9]*" : undefined}
          minLength={
            spesification === "otp"
              ? 1
              : spesification == "telephone"
              ? 8
              : undefined
          }
          maxLength={
            spesification === "otp"
              ? 1
              : spesification == "telephone"
              ? 15
              : undefined
          }
          value={value}
          ref={ref}
          onChange={onChange}
          onKeyDown={onKeyDown}
          max={type == "date" ? `${maximumBirthday}` : ""}
          placeholder={
            spesification == "otp"
              ? ""
              : type == "tel"
              ? "xxx-xxxx-xxxx"
              : spesification == "first-name"
              ? "First Name"
              : "Last Name"
          }
          className={`${spesification === "otp" ? "text-center" : ""}`}
        />
      </label>
    </fieldset>
  )
})

InputField.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  spesification: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
}

export default InputField
