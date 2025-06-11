import NavbarDesktop from "../../layout/navbar/NavbarDesktop"
import NavbarMobile from "../../layout/navbar/NavbarMobile"
import Header from "../../layout/Header"
import ProfileMobile from "../../components/profile/ProfileMobile"
import AnalysisProfile from "../../components/profile/AnalysisProfile"
import SettingsProfile from "../../components/profile/SettingsProfile"
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import { Outlet, useLocation } from "react-router-dom"

function Settings() {
  const location = useLocation()
  const isChild = location.pathname !== "/settings"
  return (
    <div className="flex w-full overflow-x-hidden">
      <NavbarDesktop />
      <NavbarMobile />
      {/* container main */}
      <main className="w-full h-screen md:ml-16 md:bg-[#fafafa] relative ">
        {/* ornament color in mobile view */}
        <div className="absolute block w-full bg-[#FA8B05] h-65 rounded-b-3xl -z-10 md:hidden">
          <div className="w-full gradient-1 h-60 rounded-b-3xl">
            {/* this div for ornament color in mobile view */}
          </div>
        </div>
        {!isChild && (
          <>
            <Header />
            {/* main content */}
            <div className="flex flex-col w-full gap-5 p-5 md:mt-12">
              {/* col 1 */}
              <div className="flex flex-col w-full gap-10 md:flex-row md:justify-between">
                <div className=" md:w-[48%] w-max h-max">
                  <ProfileMobile isSettings={true} />
                </div>
                <div className="h-max md:w-[48%] ">
                  <AnalysisProfile />
                </div>
              </div>
              {/* col 2 */}
              <div className="flex flex-col w-full gap-5 md:gap-12 md:flex-row md:justify-between">
                <div className="md:w-[48%]">
                  <SettingsProfile isContent="profile" />
                </div>
                <div className="md:w-[48%]">
                  <SettingsProfile isContent="manage-employee" />
                </div>
              </div>
              {/* col 3 */}
              <div className="flex flex-col w-full md:flex-row">
                <div className="md:w-[48%]">
                  <SettingsProfile isContent="settings-app" />
                </div>
              </div>
              {/* col 4 */}
              <div className="flex flex-col w-full gap-12 md:flex-row">
                <a
                  className="md:hidden h-max p-3 bg-white md:border md:border-gray-500 md:rounded-md rounded-lg md:shadow-none shadow-[3px_3px_10px_gray] flex items-center relative text-black gap-3 text-sm"
                  href="#"
                >
                  <ArrowLeftStartOnRectangleIcon className="w-5 h-5 " />
                  Keluar Akun
                  <ChevronRightIcon className="absolute w-5 h-5 right-6" />
                </a>
              </div>
            </div>
            <div className="block md:hidden">
              <br /> <br /> <br /> <br />
            </div>
          </>
        )}
        <Outlet />
      </main>
    </div>
  )
}

export default Settings
