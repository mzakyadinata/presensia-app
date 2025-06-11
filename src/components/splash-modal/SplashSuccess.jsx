import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import PrimaryButton from "../button/PrimaryButton"

export default function SplashSuccess({
  children,
  title,
  isShowSplash,
  handleClose,
  backToLogin,
  isOnboarding,
}) {
  const navigate = useNavigate()
  const navigateToOnboarding = () => {
    navigate("/onboarding")
  }

  const navigateToApp = () => {
    navigate("/app")
  }

  return (
    <div
      className={`fixed w-screen h-screen flex top-0 left-0 items-center justify-center bg-[rgba(0,0,0,0.7)] z-50 overflow-hidden  transition-all
      ${isShowSplash ? "block" : "hidden "}`}
    >
      <div
        className={`bg-gray-200  lg:w-[40vw] md:w-[50vw] w-full md:h-max h-full md:rounded-2xl flex flex-col items-center md:justify-center justify-normal gap-[1vh] p-5 animate-splash transition-all duration-200 relative
      ${!isShowSplash ? "reverse-splash" : ""}
        `}
      >
        <img
          src="/success-logo.png"
          className="lg:w-[22vw] lg:h-[20vw] md:w-[25vw] md:h-[23vw] w-[25vh] h-[23vh] "
        />
        <h3 className=" lg:text-[2.5vw] md:text-[3vw] text-[6vh]  md:w-full sm:w-[30vw] w-[40vw] text-center font-semibold  ">
          {title}
        </h3>
        <span className="text-center">{children}</span>
        {/* button close */}
        <div className="lg:min-w-[20vw] md:min-w-[30vw] min-w-[40vw] flex justify-center z-10">
          <PrimaryButton
            onClick={
              isOnboarding
                ? navigateToApp // success onboarding, goto app
                : backToLogin // is for back to login?
                ? handleClose // true for back to login
                : handleClose
                ? handleClose
                : navigateToOnboarding // false for goto onboarding
            }
          >
            Selesai
          </PrimaryButton>
        </div>
        <img
          src="/login-image.png"
          className="block md:hidden w-[35vh] z-0 h-[33vh] absolute bottom-0"
        />
      </div>
    </div>
  )
}

SplashSuccess.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  isShowSplash: PropTypes.bool,
  handleClose: PropTypes.func,
  backToLogin: PropTypes.bool,
  isOnboarding: PropTypes.bool,
}
