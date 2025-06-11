import Proptypes from "prop-types"
import { useState } from "react"
import PasswordField from "../../components/daisyComponent/PasswordField"
import SecondaryButton from "../../components/button/SecondaryButton"

export default function ForgotPassword({
  isShowForgotPassword,
  handleSubmitEmail,
  switchContent,
  handleSubmitNewPassword,
}) {
  const [emailUser, setEmailUser] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const handleValue = (e) => {
    const value = e.target.value
    setEmailUser(value)
  }

  return (
    <form
      className={`translate-x-[-50vw] opacity-0 absolute w-[85%]  shadow-2xl p-10 rounded-xl lg:top-[6vh] md:top-[-25vh] bg-base-100  top-[-30vh] ${
        isShowForgotPassword ? "slideRight-in" : ""
      }`}
      onSubmit={
        switchContent
          ? handleSubmitNewPassword
          : (e) => {
              e.preventDefault()
              handleSubmitEmail(emailUser)
            }
      }
      id="forgot-password"
    >
      <fieldset className="flex flex-col w-full gap-[3vh] validator">
        {!switchContent ? (
          <>
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              required
              className="w-full input"
              placeholder="Masukkan Email Kamu"
              onChange={handleValue}
            />

            <div className="absolute right-0 hidden mr-3 validator-hint top-2">
              Enter valid email address!
            </div>
          </>
        ) : (
          <>
            <PasswordField
              isPage="register"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              Password
            </PasswordField>
            <PasswordField
              isPage="register"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              prevPasswordValue={password}
            >
              Konfirmasi Password
            </PasswordField>
          </>
        )}
        <SecondaryButton style="mt-4">Lanjutkan</SecondaryButton>
      </fieldset>
    </form>
  )
}

ForgotPassword.propTypes = {
  isShowForgotPassword: Proptypes.bool,
  handleSubmitEmail: Proptypes.func,
  switchContent: Proptypes.bool,
  handleSubmitNewPassword: Proptypes.bool,
}
