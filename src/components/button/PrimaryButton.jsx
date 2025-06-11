import PropTypes from "prop-types"

export default function PrimaryButton({
  children,
  onClick,
  bgStyle,
  style,
  isDisabled,
  type,
}) {
  return (
    // if custom color please add text-color too
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${
        bgStyle ? bgStyle : "bg-[#1D61E7] text-white"
      } ${style} btn  rounded-lg w-full`}
      type={type}
    >
      {children}
    </button>
  )
}

PrimaryButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  bgStyle: PropTypes.string,
  style: PropTypes.string,
  isDisabled: PropTypes.bool,
  type: PropTypes.string,
}
