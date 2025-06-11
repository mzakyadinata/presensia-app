import TemplateLoginRegister from "../layout/form-login-register/TemplateLoginRegister"
import Fieldset from "../layout/form-login-register/Fieldset"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import OtpVerification from "../components/splash-modal/OtpVerification"
import SplashSuccess from "../components/splash-modal/SplashSuccess"
import { useSearchParams } from "react-router-dom"

export default function Register() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showSplash, setShowSplash] = useState(false)
  const [showOtpVerif, setShowOtpVerif] = useState(false)
  const [emailValue, setEmailValue] = useState("")
  console.log("otp : " + showOtpVerif)
  useEffect(() => {
    const step = searchParams.get("step")
    if (step == "otp") setShowOtpVerif(true)
  }, [searchParams])

  useEffect(() => {
    if (showOtpVerif) setSearchParams({ step: "otp" }, { replace: true })
  }, [showOtpVerif])
  const handleSubmitForm = (e) => {
    e.preventDefault()
    // const modalElement = document.getElementById("modal-success")
    // modalElement.showModal()
    setShowOtpVerif(true)
  }

  const handleSubmitOtp = (otpCode) => {
    const otp = otpCode
    // const modalElement = document.getElementById("modal-success")
    // modalElement.showModal()
    console.log("otp udh dikirim broo ini otpnya : " + otp)
    setShowOtpVerif(false)
    setShowSplash(true)
  }

  const handleDataEmail = (emailUser) => {
    setEmailValue(emailUser)
  }

  const handleCloseOtp = () => {
    setShowOtpVerif(false)
  }
  return (
    <div className="flex flex-col items-center w-full h-screen mb-50 lg:flex-row border-box lg:mb-0">
      <TemplateLoginRegister isPage="register">
        Sudah Punya Akun ?
      </TemplateLoginRegister>

      {/* Form Register */}
      <div className=" lg:w-[40%] w-full lg:h-max h-[40%] overdlow-hidden flex flex-col justify-center items-center  relative bottom-0 md:p-0 p-10 fade-left">
        {/* show in desktop (> lg:) hide in mobile (< lg)  */}
        <span className="hidden text-sm text-center lg:block">
          Sudah punya akun ?{" "}
          <Link
            to="/login"
            className="underline  font-semibold lg:text-[#4D81E7]"
          >
            Masuk
          </Link>
        </span>
        <Fieldset
          isPage="register"
          onSubmit={handleSubmitForm}
          sendDataEmail={(e) => handleDataEmail(e)}
        />
      </div>
      <SplashSuccess isShowSplash={showSplash} title="Berhasil Daftar">
        Selamat Bergabung di Presensia!
      </SplashSuccess>

      <OtpVerification
        isShowOtp={showOtpVerif}
        handleCloseOtp={handleCloseOtp}
        dataEmailUser={emailValue}
        handleSubmit={(e) => handleSubmitOtp(e)}
      />
    </div>
  )
}
