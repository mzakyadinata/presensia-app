import { useState } from "react"
import PropTypes from "prop-types"
import NavItem from "../../components/navbar/NavItem"

function GreyLayer({ visible }) {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] ${
        visible
          ? "opacity-100 z-20 pointer-events-auto"
          : "opacity-0 z-0 pointer-events-none"
      }`}
    ></div>
  )
}

GreyLayer.propTypes = {
  visible: PropTypes.bool,
}

const navItems = [
  { name: "Beranda", to: "/app", icon: "home" },
  {
    name: "Absensi",
    to: "/presensi",
    icon: "user-scan",
    child: [
      {
        name: "Ajukan Lembur",
        to: "/presensi/request-overtime",
        icon: "user-scan",
      },
      {
        name: "Ajukan Izin",
        to: "/presensi/request-permission",
        icon: "user-scan",
      },
      {
        name: "Ajukan Ubah Shift",
        to: "/presensi/request-change-shift",
        icon: "user-scan",
      },
      {
        name: "Ajukan Reimburse",
        to: "/presensi/request-reimburse",
        icon: "user-scan",
      },
      {
        name: "Kunjungan Klien",
        to: "/presensi/client-visits",
        icon: "user-scan",
      },
      {
        name: "Log Absensi Anda",
        to: "/presensi/log-presence",
        icon: "user-scan",
      },
    ],
  },
  {
    name: "Proyek",
    to: "/project",
    icon: "project",
    child: [
      {
        name: "Tambah Project",
        to: "/project/add-new-project",
        icon: "project",
      },
      {
        name: "Grup Baru",
        to: "/project/add-new-group",
        icon: "project",
      },
      {
        name: "Tambah Meeting",
        to: "/project/add-new-meeting",
        icon: "project",
      },
      {
        name: "Tambah Tugas",
        to: "/project/add-new-tasks",
        icon: "project",
      },
    ],
  },
  {
    name: "Pengajuan",
    to: "/request-management",
    icon: "person",
    child: [
      {
        name: "Lembur",
        to: "/request-management/overtime",
        icon: "person",
      },
      {
        name: "Izin",
        to: "/request-management/permission",
        icon: "person",
      },
      {
        name: "Ubah Shift",
        to: "/request-management/change-shift",
        icon: "person",
      },
      {
        name: "Reimburse",
        to: "/request-management/reimburse",
        icon: "person",
      },
      {
        name: "Kunjungan Klien",
        to: "/request-management/client-visit",
        icon: "person",
      },
      {
        name: "Klaim Gaji",
        to: "/request-management/salary-claims",
        icon: "person",
      },
    ],
  },
  { name: "Pengaturan", to: "/settings", icon: "settings" },
  { name: "Faq", to: "/faq", icon: "faq" },
]

export default function NavbarDesktop() {
  const [greyLayer, setGreyLayer] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  return (
    <>
      {/* Sidebar container */}
      <div
        className="md:flex fixed top-0 left-0 flex-col items-center w-16 h-full gap-5 py-3  bg-[#0057D6]   z-30 hover:w-60 transition-all duration-250 group hidden "
        onMouseEnter={() => setGreyLayer(true)}
        onMouseLeave={() => setGreyLayer(false)}
      >
        {/* Logo */}
        <span className="relative flex items-center w-full gap-2 px-2 text-xl text-white h-max">
          <img src="/presensia-logo-white.png" className="max-w-12 max-h-10 " />
          <span className="absolute hidden tracking-wider transition-all left-15 group-hover:block duration-250">
            Presensia
          </span>
        </span>

        {/* Navigation Items */}
        <div className="flex flex-col w-full h-full min-h-0 text-sm text-white justify-betwwen ">
          <div className="flex flex-col  items-center w-full h-[92%] gap-2 overflow-y-auto overflow-x-hidden hide-scrollbar mb-3">
            {navItems.map((item, index) => (
              <div key={index} className="flex items-center w-full ">
                <NavItem
                  name={item.name}
                  to={item.to}
                  icon={item.icon}
                  child={item.child}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              </div>
            ))}
          </div>
          {/* logout */}
          <div className="h-[8%] w-full">
            <NavItem name="Logout" to="/logout" icon="logout" />
          </div>
        </div>
      </div>
      {/* Grey Overlay */}
      <GreyLayer visible={greyLayer} />
    </>
  )
}
