import { Link } from "react-router-dom"
import PropTypes from "prop-types"

export default function TemplateLoginRegister({
  children,
  isPage,
  showForgotPassword,
}) {
  return (
    <section className=" gradient-1 lg:w-[60%] w-full lg:h-full h-[60%]  lg:p-20 md:p-10 p-5 text-white lg:flex lg:justify-center lg:items-center static overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-[1vh] fade-down ">
        {/* show in Desktop (> lg:) hide in Mobile (< lg:)  */}
        <img
          src="./Logo-Dark-Mode.png"
          className="w-[13vw] h-[10vw] lg:block hidden"
        />

        {/* show in mobile (< lg:) hide in desktop (> lg:)  */}
        <img
          src="./presensia-logo-white.png"
          className="w-[10vw] h-[9vw] lg:hidden block"
        />
        {/* title */}
        <div className="relative">
          <h1
            className={` absolute translate-y-[-100vh] z-20 md:text-[2.5vw] text-[4vh] text-center md:w-full w-[50vw] font-bold ${
              showForgotPassword ? "slideDown-in" : ""
            }`}
          >
            Reset Password
          </h1>
          <h1
            className={`z-20 md:text-[2.5vw] text-[4vh] text-center md:w-full w-[50vw] font-bold ${
              showForgotPassword ? "slideDown-out" : ""
            }`}
          >
            {isPage == "login" ? (
              <>Masuk Ke Akun Kamu</>
            ) : isPage == "register" ? (
              <>Buat Akun Baru</>
            ) : isPage == "onboarding" ? (
              <>On Boarding</>
            ) : isPage == "new-organization" ? (
              <>Buat Organisasi Baru</>
            ) : (
              <>Gabung Organisasi</>
            )}
          </h1>
        </div>

        {/* text  */}
        {/* show in mobile (< lg:) hide in desktop (> lg)  */}
        {isPage != "register" ? (
          <>
            <span className="block text-xs text-center lg:hidden ">
              {children}
            </span>
          </>
        ) : (
          <>
            <span className="block text-xs text-center lg:hidden">
              {children}{" "}
              <Link to="/login" className="underline">
                Masuk
              </Link>
            </span>
          </>
        )}

        {/* this image show in login & register, !onboarding */}
        {(isPage == "login" || isPage == "register") && (
          <>
            <img src="./login-image.png" className="hidden lg:block" />
          </>
        )}
      </div>
    </section>
  )
}

TemplateLoginRegister.propTypes = {
  children: PropTypes.string,
  isPage: PropTypes.string,
  showForgotPassword: PropTypes.bool,
}
