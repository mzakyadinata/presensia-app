import ProfileDesktop from "../components/profile/ProfileDesktop"
import Notification from "./Notification"
import CompanyDropdown from "../components/daisyComponent/CompanyDropdown"
import { useState, useEffect, useRef } from "react"
import { BellIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid"
import { GlobeAltIcon } from "@heroicons/react/24/outline"

export default function Header() {
  const [openNotif, setOpenNotif] = useState(false)
  const ref = useRef(null) // ref to element notif

  // click outside, close notif
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest(".notif-button")
      ) {
        setOpenNotif(false)
      }
    }

    // add event when notif true
    document.addEventListener("mousedown", handleClickOutside)

    // del event when notif false
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      {/* title */}
      <div className="top-0 left-0 z-10 flex justify-between w-screen py-2 pl-5 pr-5 overflow-visible text-white md:fixed md:text-black md:bg-white md:pl-28 md:border-b md:border-gray-300 h-max">
        <CompanyDropdown />
        {/*  */}
        {/*  */}
        {/* icon language, notif, and faq */}
        <span className="flex items-center gap-4 pr-2 ">
          {/* language */}
          <div className="flex items-center gap-1 text-sm">
            <GlobeAltIcon className="w-5 h-5 md:text-[#2C313A] text-white" />
            ID
          </div>
          {/* notification */}
          <div className="relative ">
            <BellIcon
              className="w-5 h-5 cursor-pointer md:text-[#2C313A] text-white notif-button"
              // if in desktop  onclick for open notif, if mobile navigate to page notif
              onClick={() => setOpenNotif((prev) => !prev)}
            />
            {/* notif overlay */}
            {openNotif && (
              <Notification ref={ref} handleClose={() => setOpenNotif(false)} />
            )}
          </div>
          <div>
            <ChatBubbleOvalLeftIcon className="w-5 h-5 md:text-[#2C313A] text-white" />
          </div>
          {/* profile */}
          <ProfileDesktop />
        </span>
      </div>
    </>
  )
}
