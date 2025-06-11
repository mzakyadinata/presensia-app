import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
export default function ButtonAfterSplash({ label, onClick, style }) {
  const navigate = useNavigate()
  const navigateToLogin = () => {
    navigate("/login")
  }
  return (
    <button
      className={` px-[1vw] py-2 md:min-w-[15vw] min-w-[20vw] cursor-pointer  text-[.8em] rounded-md  transition-all duration-250 box-border shadow-lg ${style} ${
        onClick == "login"
          ? "bg-blue-500 text-white hover:bg-blue-700 hover:shadow-[1px_1px_5px_#fff]"
          : "bg-white text-[#002966] hover:bg-[#002966] hover:text-white"
      }`}
      onClick={onClick == "login" ? navigateToLogin : onClick}
    >
      {label}
    </button>
  )
}

ButtonAfterSplash.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.any,
  style: PropTypes.string.isRequired,
}
