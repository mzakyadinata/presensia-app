import NavbarDesktop from "../../layout/navbar/NavbarDesktop"
import NavbarMobile from "../../layout/navbar/NavbarMobile"
import { Outlet } from "react-router-dom"

function Project() {
  return (
    <div className="flex w-full ">
      <NavbarDesktop />
      <NavbarMobile />
      <div className="w-[95%] ">CONTENT</div>
      <Outlet />
    </div>
  )
}

export default Project
