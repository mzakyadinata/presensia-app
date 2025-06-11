import { useRef, useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid"
import Proptypes from "prop-types"
// import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

export default function PasswordField({
  children,
  isPage,
  value,
  onChange,
  prevPasswordValue,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef(null)

  const toggleVisibility = () => {
    const input = inputRef.current
    const cursorPos = input.selectionStart

    setShowPassword((prev) => !prev)

    setTimeout(() => {
      input.setSelectionRange(cursorPos, cursorPos)
    }, 0)
  }

  return (
    <fieldset className="relative m-0 fieldset">
      <legend className="p-0 fieldset-legend">{children}</legend>
      <label className="w-full m-0 rounded-lg input validator ">
        {isPage == "login" && (
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
        )}
        <input
          ref={inputRef}
          type={showPassword ? "text" : "password"}
          required
          value={value}
          onChange={onChange}
          placeholder="Masukkan password kamu"
          minLength={isPage == "register" ? "8" : undefined}
          pattern={
            isPage == "register" && !prevPasswordValue
              ? "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
              : prevPasswordValue
              ? `^${prevPasswordValue}$` // pattern must be same with password
              : undefined
          }
          title={
            prevPasswordValue
              ? "Password Tidak Cocok"
              : "Harus mengandung, 1 Huruf Besar, 1 Huruf Kecil, dan 1 Angka"
          }
          className="w-full"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="ml-2 cursor-pointer"
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <EyeSlashIcon className="text-gray-500 h-7 w-7" />
          ) : (
            <EyeIcon className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </label>
      {/* uncomment this div if you want to customize validator hint */}
      {/* {!prevPasswordValue && (
        <div className="validator-hint hidden chat chat-end absolute w-[30vw] ">
          <div className="chat-bubble w-full flex items-center gap-1 px-2 bg-[#d3d3d3]">
            <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
            <p>must be contain number, lowercase, and uppercase</p>
          </div>
        </div>
      )}
      {prevPasswordValue && (
        <p className="validator-hint hidden absolute !text-blue-500">
          Password tidak cocok
        </p>
      )} */}
    </fieldset>
  )
}

PasswordField.propTypes = {
  children: Proptypes.any,
  isPage: Proptypes.string,
  value: Proptypes.string,
  onChange: Proptypes.func,
  error: Proptypes.bool,
  prevPasswordValue: Proptypes.string,
}
