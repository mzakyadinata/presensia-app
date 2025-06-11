import PropTypes from "prop-types"

export default function UncontrolledInput({
  title,
  children, // for placeholder
  type,
  value,
  defaultValue,
  disabled,
  isDescription,
  spesification,
}) {
  return (
    <fieldset className="w-full fieldset">
      <legend className="text-sm text-gray-500 ">{title}</legend>
      {isDescription ? (
        <textarea
          className=" validator w-full  h-24 textarea placeholder:text-gray-400 disabled:!text-black disabled:border disabled:border-[#0057d6]"
          required
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={children}
        ></textarea>
      ) : (
        <div
          className={`flex items-center w-full gap-2 input input-bordered validator   ${
            defaultValue && "border border-[#0057d6]"
          } ${disabled && "!border !border-[#0057d6]"} `}
        >
          {(spesification === "cost-reimburse" || spesification === "cost") && (
            <span className="text-black whitespace-nowrap">Rp.</span>
          )}
          <input
            type={type}
            required
            className={`w-full text-black placeholder-gray-400 border-0 focus:outline-none focus:ring-0 validator `}
            inputMode={
              type === "tel" || spesification === "cost-reimburse"
                ? "numeric"
                : undefined
            }
            placeholder={children?.toString?.() ?? undefined}
            pattern={
              type === "tel" &&
              spesification !== "cost-reimburse" &&
              spesification !== "cost"
                ? "[0-9]*"
                : undefined
            }
            minLength={
              type == "text"
                ? undefined
                : spesification == "no-bank-account"
                ? "10"
                : spesification == "cost-reimburse" || spesification == "cost"
                ? "4"
                : "8"
            }
            maxLength={
              type == "text"
                ? undefined
                : spesification == "cost-reimburse"
                ? "9"
                : spesification == "cost"
                ? undefined
                : "16"
            }
            disabled={disabled}
            defaultValue={defaultValue}
            value={value}
            onInput={(e) => {
              const rawValue = e.target.value.replace(/\D/g, "")
              if (
                spesification === "cost-reimburse" ||
                spesification === "cost"
              ) {
                if (rawValue.length > 0 && rawValue.startsWith("0")) {
                  e.target.value = ""
                  return
                }
                // Format angka ribuan
                e.target.value = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              } else if (type === "tel") {
                e.target.value = rawValue
              }
            }}
          />
        </div>
      )}
    </fieldset>
  )
}

UncontrolledInput.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  isDescription: PropTypes.bool,
  spesification: PropTypes.string,
}
