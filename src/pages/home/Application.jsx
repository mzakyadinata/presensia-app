import NavbarDesktop from "../../layout/navbar/NavbarDesktop"
import NavbarMobile from "../../layout/navbar/NavbarMobile"
import ProfileMobile from "../../components/profile/ProfileMobile"
import CheckInOutCard from "../../layout/homepage/CheckInOutCard"
import RecapPresence from "../../layout/homepage/RecapPresence"
import Tasks from "../../layout/homepage/Tasks"
import Meeting from "../../layout/homepage/Meeting"
import Leaderboard from "../../layout/homepage/Leaderboard"
import Header from "../../layout/Header"
import { useState } from "react"

function Application() {
  const [showAllContent, setShowAllContent] = useState(false)

  return (
    <div className={`flex w-full ${showAllContent && "hide-scrollbar"}`}>
      <NavbarDesktop />
      <NavbarMobile />
      {/* container */}
      <div className="w-full h-max md:pl-16 md:bg-[#fafafa]">
        {/* ornament color in mobile view */}
        <div className="absolute block w-full bg-[#FA8B05] h-65 rounded-b-3xl -z-10 md:hidden">
          <div className="w-full gradient-1 h-60 rounded-b-3xl">
            {/* this div for ornament color in mobile view */}
          </div>
        </div>
        {/* header */}
        <Header />

        {/* content */}
        <div className="flex flex-col justify-between w-full md:mt-12 md:flex-row">
          <div className="block pt-2 pl-5 w-max md:hidden">
            <ProfileMobile />
          </div>
          {/*  */}
          {/* check in check out , recap presence */}
          <div className="flex flex-col justify-between gap-5 p-5 md:pt-5 pt-0 md:px-10 md:w-[50%] w-full h-max ">
            <CheckInOutCard />
            <RecapPresence />
            <div className="hidden md:block">
              <Leaderboard showAllStatus={(e) => setShowAllContent(e)} />
            </div>
          </div>

          {/*  */}
          {/* task and meeting schedule */}
          <div className="p-5 md:pr-8 md:pt-5 pt-0 md:w-[50vw] w-full flex flex-col gap-3 h-max overflow-x-scroll ">
            {/* task */}
            <Tasks />
            {/* meeting shedule */}
            <Meeting />
            <div className="block md:hidden">
              <Leaderboard />
              <div className="w-full h-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Application
