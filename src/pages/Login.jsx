import TemplateLoginRegister from "../layout/form-login-register/TemplateLoginRegister"
import Fieldset from "../layout/form-login-register/Fieldset"
import SplashSuccess from "../components/splash-modal/SplashSuccess"
import { useState, useEffect } from "react"
import ForgotPassword from "../layout/form-login-register/ForgotPassword"
import OtpVerification from "../components/splash-modal/OtpVerification"
import { useSearchParams } from "react-router-dom"

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showSplash, setShowSplash] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showOtpVerif, setShowOtpVerif] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [emailUser, setEmailUser] = useState("") // email user while forgot password
  const [emailValue, setEmailValue] = useState("") // email while login
  console.log(emailValue)

  useEffect(() => {
    const step = searchParams.get("step")
    if (step === "forgot-password") {
      setShowForgotPassword(true)
      setShowOtpVerif(false)
      setShowResetPassword(false)
    }
    if (step === "otp") {
      setShowForgotPassword(true)
      setShowOtpVerif(true)
      setShowResetPassword(false)
    }
    if (step === "reset-password") {
      setShowForgotPassword(true)
      setShowOtpVerif(false)
      setShowResetPassword(true)
    }
  }, [searchParams])

  useEffect(() => {
    if (showResetPassword) {
      setSearchParams({ step: "reset-password" }, { replace: true })
    } else if (showOtpVerif) {
      setSearchParams({ step: "otp" }, { replace: true })
    } else if (showForgotPassword) {
      setSearchParams({ step: "forgot-password" }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }, [showForgotPassword, showOtpVerif, showResetPassword])

  const handleSubmitOtp = (otpCode) => {
    const otp = otpCode // otp code user
    console.log("data otp :" + otp)
    setShowResetPassword(true)
    setShowOtpVerif(false)
    // setSearchParams({ step: "reset-password" })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    setShowSplash(true)
  }
  const handleDataEmail = (emailUser) => {
    const email = emailUser
    setEmailValue(email)
  }

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true)
    // setSearchParams({ step: "forgot-password" })
  }

  const handleForgotPassword = (email) => {
    const emailValue = email
    setEmailUser(emailValue)
    console.log("ini dia emailnya : " + emailValue)
    setShowOtpVerif(true)
  }
  const handleCloseOtpVerif = () => {
    setShowOtpVerif(false)
  }

  const backToLogin = () => {
    setShowSplash(false)
    setShowResetPassword(false)
    setShowOtpVerif(false)
    setShowForgotPassword(false)
    // setSearchParams({})
  }

  return (
    <div className="z-10 flex flex-col items-center w-screen h-screen overflow-hidden lg:flex-row border-box ">
      <TemplateLoginRegister
        isPage="login"
        showForgotPassword={showForgotPassword}
      >
        Masukkan email dan password kamu untuk Login
      </TemplateLoginRegister>
      {/* Form Login */}
      <div className=" lg:w-[40%] w-[100%] lg:h-max h-[40%] flex flex-col gap-2 justify-center items-center  relative bottom-0 md:p-0 p-10 fade-left">
        {/* show in desktop (> lg:) hide in mobile (< lg)  || title 2*/}
        <div className="relative text-center ">
          <span
            className={`absolute hidden text-sm text-center lg:block w-full translate-y-[-100vh] ${
              showForgotPassword ? "slideDown-in" : ""
            }`}
          >
            Masukkan Email Untuk Reset Password
          </span>
          <span
            className={`hidden text-sm text-center translate-y-0 lg:block w-full ${
              showForgotPassword ? "slideDown-out" : ""
            }`}
          >
            Masukkan Email dan Password Kamu untuk Loin
          </span>
        </div>

        <Fieldset
          isPage="login"
          onSubmit={handleSubmitForm}
          forgotPassword={handleShowForgotPassword}
          isShowForgotPassword={showForgotPassword}
          sendDataEmail={(e) => handleDataEmail(e)}
        />
        <ForgotPassword
          isShowForgotPassword={showForgotPassword}
          handleSubmitEmail={(e) => handleForgotPassword(e)}
          switchContent={showResetPassword}
          handleSubmitNewPassword={handleSubmitForm}
        />
      </div>
      {showResetPassword ? (
        <SplashSuccess
          isShowSplash={showSplash}
          handleClose={backToLogin}
          title="Berhasil Dipulihkan"
          backToLogin={true}
        >
          Lupa Password ? Jangan Khawatir, Kami Akan Membantumu Masuk Kembalu
        </SplashSuccess>
      ) : (
        <SplashSuccess isShowSplash={showSplash} title="Berhasil Masuk">
          Selamat Datang Kembali di Presensia!
        </SplashSuccess>
      )}

      <OtpVerification
        isShowOtp={showOtpVerif}
        handleCloseOtp={handleCloseOtpVerif}
        dataEmailUser={emailUser}
        handleSubmit={handleSubmitOtp}
      />
    </div>
  )
}
