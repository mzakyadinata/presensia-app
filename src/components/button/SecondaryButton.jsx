import PropTypes from "prop-types"

export default function SecondaryButton({ children, onClick, style, type }) {
  return (
    <button
      className={`${style} btn bg-[#FA8B05]  rounded-lg  text-white w-full`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

SecondaryButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.string,
  type: PropTypes.string,
}
