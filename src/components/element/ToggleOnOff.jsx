import PropTypes from "prop-types"
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline"

export default function ToggleOnOff({ handleClick, isOn }) {
  return (
    <div
      className={`flex justify-between items-center h-7 px-1 py-2 cursor-pointer w-13  rounded-3xl transition-all duration-300 ${
        isOn ? " bg-[#187cff] " : " bg-gray-400/30  border border-gray-500"
      }`}
      onClick={handleClick}
    >
      <div
        className={`w-5 bg-white  rounded-full aspect-square transition-all duration-300 top-[1px] flex items-center justify-center ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isOn ? (
          <CheckIcon className="w-4 h-4 text-black" />
        ) : (
          <XMarkIcon className="w-4 h-4 text-black " />
        )}
      </div>
      <span
        className={`text-xs  ${
          isOn
            ? "text-white left-1 -translate-x-6"
            : "text-gray-700 right-1 top-1 transslate-x-0"
        }`}
      >
        {isOn ? "On" : "Off"}
      </span>
    </div>
  )
}

ToggleOnOff.propTypes = {
  handleClick: PropTypes.func,
  isOn: PropTypes.bool,
}
