import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const navItems = [
  { name: "Beranda", to: "/app", icon: "home" },
  { name: "Presensi", to: "/presensi", icon: "user-scan" },
  { name: "Project", to: "/project", icon: "project" },
  { name: "Request", to: "/request-management", icon: "person" },
  { name: "Pengaturan", to: "/settings", icon: "settings" },
]

export default function NavbarMobile() {
  const location = useLocation()
  const [prevPath, setPrevPath] = useState(location.pathname)

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setPrevPath(location.pathname)
    }
  }, [location.pathname])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex items-end justify-around h-18 px-4 bg-[#0057D6] shadow-lg md:hidden rounded-t-3xl">
      {navItems.map((item) => {
        const isCurrent = location.pathname === item.to
        const isPrevious = prevPath === item.to

        const translateY = isCurrent ? -10 : isPrevious ? 0 : undefined

        return (
          <NavLink key={item.to} to={item.to}>
            <motion.div
              animate={{ y: translateY }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative flex flex-col items-center text-white"
            >
              {/* white circle */}
              <div
                className={`${
                  isCurrent ? "bg-white" : ""
                } flex items-center justify-center w-17 h-17 rounded-full transition-all duration-300`}
              >
                {/* icon */}
                <div
                  className={`${
                    isCurrent ? "bg-[#0057D6]" : ""
                  } w-14 h-14 rounded-full flex items-center justify-center  transition-all duration-300`}
                >
                  <img
                    src={`/navbar/${item.icon}${
                      isCurrent ? "-solid" : "-lineout"
                    }.png`}
                    alt={item.name}
                    className="w-6 h-6"
                  />
                </div>
              </div>
              {/* caption */}
              <span
                className={`mb-2 text-xs ${
                  isCurrent ? "font-semibold mt-2" : "text-white/80 mt-[-10px]"
                }`}
              >
                {item.name}
              </span>
            </motion.div>
          </NavLink>
        )
      })}
    </div>
  )
}
