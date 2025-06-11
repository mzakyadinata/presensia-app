// import Proptypes from "prop-types"
import InputField from "../daisyComponent/InputField"
import { useRef, useState } from "react"
import { XMarkIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"
import PropTypes from "prop-types"
import SecondaryButton from "../button/SecondaryButton"

export default function OtpVerification({
  isShowOtp,
  handleCloseOtp,
  dataEmailUser,
  handleSubmit,
}) {
  const inputRefs = useRef([])
  const [otpValue, setOtpValue] = useState(Array(5).fill(""))

  const handleChange = (index, e) => {
    const value = e.target.value
    if (!/^[0-9]?$/.test(value)) return

    const newOtpValues = [...otpValue]
    newOtpValues[index] = value
    setOtpValue(newOtpValues)

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }
  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }
  const handleContainerClick = () => {
    const firstEmptyIndex = otpValue.findIndex((val) => val === "")
    if (firstEmptyIndex === -1) {
      inputRefs.current[otpValue.length - 1]?.focus()
    } else {
      inputRefs.current[firstEmptyIndex]?.focus()
    }
  }

  const handleSubmitOtp = (e) => {
    e.preventDefault()
    const otpCode = otpValue.join("")
    handleSubmit(otpCode)
    console.log("Submitted OTP:", otpCode)
  }

  return (
    <div
      className={`fixed w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.7)] z-40 overflow-hidden  transition-all  ${
        isShowOtp ? "block" : "hidden"
      }`}
    >
      <div
        className={`gradient-1 text-white md:w-[70vw] w-full md:h-max h-full md:rounded-2xl flex flex-col items-center md:justify-center justify-normal md:gap-[3vh] gap-[2vh] p-10 animate-splash transition-all duration-200 relative `}
      >
        {/* Logo  */}
        <img src="presensia-logo-white.png" />
        <h3 className="b lg:text-[2.5vw] md:text-[3vw] text-[4vh]  md:w-full sm:w-[30vw] w-[40vw] text-center font-semibold  ">
          Otp Verification
        </h3>
        <p className="text-center">
          Masukkan kode yang telah dikirim ke{" "}
          <span className="font-semibold underline">{dataEmailUser}</span>
        </p>

        {/* input otp */}
        <form
          onSubmit={handleSubmitOtp}
          className="flex flex-col items-center gap-8 "
        >
          <div className="flex gap-5" onClick={handleContainerClick}>
            {otpValue.map((value, index) => (
              <InputField
                key={index}
                type="tel"
                spesification="otp"
                ref={(el) => (inputRefs.current[index] = el)}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleBackspace(index, e)}
              />
            ))}
          </div>
          <p className="text-center">
            Belum Mendapatkan Email ?{" "}
            <span className="font-semibold underline cursor-pointer">
              Kirim Ulang
            </span>
          </p>
          <SecondaryButton style="border-none">Lanjutkan</SecondaryButton>
        </form>

        {/* button close */}
        <button
          className="absolute cursor-pointer top-5 md:right-5 md:left-auto left-5 w-max h-max group"
          onClick={handleCloseOtp}
        >
          <XMarkIcon className="hidden w-8 h-8 text-white md:block" />
          <ArrowLeftIcon className="block w-8 h-8 text-white md:hidden" />
          <div className="absolute px-2 py-1 mb-2 text-sm text-white transition-all transform scale-0 -translate-x-1/2 translate-y-20 bg-gray-700 rounded bottom-full left-1/2 group-hover:scale-100">
            Back
          </div>
        </button>
        <img
          src="/otp-verif-logo.png"
          className="block md:hidden w-[50vh] h-[33vh] absolute bottom-3"
        />
        <div className="absolute bottom-0 block w-screen h-10 gradient-1 md:hidden"></div>
      </div>
    </div>
  )
}

OtpVerification.propTypes = {
  isShowOtp: PropTypes.bool,
  handleCloseOtp: PropTypes.func,
  dataEmailUser: PropTypes.string,
  handleSubmit: PropTypes.func,
}
