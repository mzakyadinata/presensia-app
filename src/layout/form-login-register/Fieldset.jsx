import PasswordField from "../../components/daisyComponent/PasswordField"
import UsernameField from "../../components/daisyComponent/UsernameEmailField"
import LoginWithGoogle from "../../components/button/LoginWithGoogle"
import InputField from "../../components/daisyComponent/InputField"
import SecondaryButton from "../../components/button/SecondaryButton"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { useState } from "react"

export default function Fieldset({
  isPage,
  onSubmit,
  sendDataEmail,
  forgotPassword,
  isShowForgotPassword,
}) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleDataEmail = (e) => {
    const emailUser = e.target.value
    sendDataEmail(emailUser)
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`w-[85%] lg:static absolute block lg:top-0  ${
        isPage == "login"
          ? "md:top-[-25vh] top-[-32vh]"
          : "md:top-[-30vh] top-[-37vh]"
      } ${isShowForgotPassword ? "slideRight-out" : ""}
          `}
    >
      <fieldset
        className={`fieldset  rounded-box w-full  h-max p-5 bg-base-100 lg:shadow-none shadow-2xl  ${
          isPage == "login" ? "space-y-3 lg " : "space-y-3"
        }`}
      >
        {isPage === "login" ? (
          <>
            {/* LOGIN PAGE */}
            <LoginWithGoogle />

            <div className="flex items-center justify-between ">
              <hr className=" bg-[#333] sm:w-[30%] w-[25%]" />
              <span className="text-xs text-center">Atau Login dengan </span>
              <hr className=" bg-[#333] sm:w-[30%] w-[25%]" />
            </div>
            {/* Username / Email Field */}
            <UsernameField isPage={isPage} onChange={handleDataEmail}>
              Masukkan Email
            </UsernameField>
            {/* Password Field */}
            <PasswordField isPage={isPage} />
            <span className="flex items-center justify-between ">
              <label className="label">
                <input type="checkbox" className="checkbox checkbox-xs" />
                Ingat Saya
              </label>
              <div
                className="text-[#4D81E7] cursor-pointer "
                onClick={forgotPassword}
              >
                Lupa Password?
              </div>
            </span>
            <SecondaryButton style="mt-2">Masuk</SecondaryButton>
            <span className="text-center space-x-[1vw]">
              Belum Punya Akun ?{" "}
              <Link to="/register" className="text-[#4D81E7]">
                Daftar
              </Link>
            </span>
          </>
        ) : (
          <>
            {/* REGISTER PAGE */}
            {/* Name Field */}
            <div className="flex justify-between w-full m-0">
              <div className="w-[48%]">
                <InputField type="text" spesification="first-name">
                  Nama Depan
                </InputField>
              </div>
              <div className="w-[48%]">
                <InputField type="text" spesification="last-name">
                  Nama Belakang
                </InputField>
              </div>
            </div>
            {/* Username / Email Field */}
            <UsernameField isPage={isPage} onChange={handleDataEmail}>
              mail@site.com{" "}
            </UsernameField>
            {/* Birthday Field */}
            <InputField type="date">Tanggal Lahir</InputField>

            {/* Telp Field */}
            <InputField type="tel" spesification="telephone">
              No. Telp
            </InputField>

            {/* Password Field */}
            <PasswordField
              isPage={isPage}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              Password
            </PasswordField>
            <PasswordField
              isPage={isPage}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              prevPasswordValue={password}
            >
              Konfirmasi Password
            </PasswordField>

            <SecondaryButton style="mt-2">Daftar</SecondaryButton>

            <div className="flex items-center justify-between m-0">
              <hr className=" bg-[#333] sm:w-[40%] w-[25%]" />
              <span className="text-xs text-center">Atau </span>
              <hr className=" bg-[#333] sm:w-[40%] w-[25%] " />
            </div>
            <LoginWithGoogle />
          </>
        )}
      </fieldset>
    </form>
  )
}

Fieldset.propTypes = {
  isPage: PropTypes.string,
  onSubmit: PropTypes.func,
  sendDataEmail: PropTypes.func,
  forgotPassword: PropTypes.func,
  isShowForgotPassword: PropTypes.bool,
}
