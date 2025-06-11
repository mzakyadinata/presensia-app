import { useState, useEffect } from "react"
import AfterSplash from "../layout/AfterSplash"

function Splash() {
  const [firstLanding, setFirstLanding] = useState(true)
  const [fadeAnimate, setFadeAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeAnimate(true)
      setTimeout(() => {
        setFirstLanding(false)
        setFadeAnimate(false)
      }, 500)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen px-6 overflow-hidden transition-colors duration-700 gradient-1">
      <div
        className={`transition-opacity duration-500 flex flex-col justify-center items-center  ${
          fadeAnimate ? "opacity-0" : "opacity-100"
        }`}
      >
        {firstLanding ? (
          <>
            <img
              src="/Logo-Dark-Mode.png"
              alt="Presensia"
              className="object-contain animate-fadeIn md:w-[20vw] md:h-[20vw] w-[30vh] h-[30vh]"
            />
            <h1 className="text-white animate-fadeIn">Website App</h1>
          </>
        ) : (
          <AfterSplash />
        )}
      </div>
    </div>
  )
}

export default Splash
