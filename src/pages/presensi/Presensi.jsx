import NavbarDesktop from "../../layout/navbar/NavbarDesktop"
import NavbarMobile from "../../layout/navbar/NavbarMobile"
import Header from "../../layout/Header"
import RecapPresence from "../../layout/homepage/RecapPresence"
import RequestMenu from "../../layout/presence/RequestMenu"
import RecapInWeek from "../../layout/presence/RecapInWeek"
import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"

function Presensi() {
  const location = useLocation()
  const isChild = location.pathname !== "/presensi"
  return (
    <div className="flex w-full h-screen md:bg-[#fafafa] overflow-x-hidden relative hide-scrollbar ">
      <NavbarDesktop />
      <NavbarMobile />
      {/* content */}
      <div className="w-full h-full md:pl-16 md:bg-[#fafafa]">
        {/* ornament color in mobile view */}
        <div className="absolute block w-full bg-[#FA8B05] h-65 rounded-b-3xl -z-10 md:hidden">
          <div className="w-full gradient-1 h-60 rounded-b-3xl">
            {/* this div for ornament color in mobile view */}
          </div>
        </div>
        {!isChild && (
          <>
            <Header />
            {/* content */}
            <div className="flex flex-col w-full gap-3 p-5 mt-13">
              <div className="flex flex-col w-full gap-5 md:justify-between md:gap-0 md:flex-row ">
                <div className="md:w-[35%] w-full">
                  <RecapPresence />
                </div>
                <div className="md:w-[60%] w-full">
                  <RequestMenu />
                </div>
              </div>

              {/* log presence in 1 week */}
              <div className="w-full">
                <RecapInWeek />
              </div>
            </div>
          </>
        )}
        <Outlet />
      </div>
    </div>
  )
}

export default Presensi
