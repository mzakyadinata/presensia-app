import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

function NavItem({ name, to, icon, child, activeDropdown, setActiveDropdown }) {
  const isActiveDropdown = activeDropdown === name

  const handleClick = (e) => {
    if (child) {
      e.preventDefault()
      setActiveDropdown(isActiveDropdown ? null : name)
    }
  }
  return (
    <div className={`relative w-[95%] ml-2  ${child ? "group" : ""}`}>
      <NavLink
        className="w-full cursor-pointer h-max group-hover:w-full "
        to={to}
        onClick={handleClick}
      >
        {({ isActive }) => (
          <div
            className={`flex   items-center w-[75%] justify-between  group-hover:w-[90%] rounded-lg h-full  px-2 py-2 transition-all duration-400 ${
              isActive ? "bg-white text-[#1D61E7]" : "hover:bg-[rgba(0,0,0,.5)]"
            }`}
          >
            <div className="flex items-center gap-5">
              <img
                src={`/navbar/${icon}${isActive ? "-solidBlue" : "-solid"}.png`}
                className={` min-w-[26px] ${
                  name == "Proyek" ? " p-[3px]" : ""
                } `}
              />
              <span className="hidden tracking-widest group-hover:block">
                {name}
              </span>
            </div>
            {child && (
              <ChevronDownIcon
                className={`w-5 h-5  hidden group-hover:block transform transition-transform duration-300 ${
                  isActiveDropdown && "rotate-180 "
                } ${isActive && "text-[#1D61E7]"}`}
              />
            )}
          </div>
        )}
      </NavLink>
      {child && (
        <div
          className={` ml-12 mt-2 w-full h-max  transition-all duration-300 flex flex-col  space-y-1  ${
            isActiveDropdown ? "group-hover:block hidden " : "hidden"
          }`}
        >
          {child.map((item, index) => (
            <div key={index} className="w-full text-xs">
              <NavLink
                className="flex items-center gap-2 p-2 w-[70%] rounded-lg hover:bg-[rgba(0,0,0,.5)]"
                to={item.to}
              >
                <span className="tracking-wider">{item.name}</span>
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  child: PropTypes.array.isRequired,
  activeDropdown: PropTypes.string,
  setActiveDropdown: PropTypes.func,
}

export default NavItem
