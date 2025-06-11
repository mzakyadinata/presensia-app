import {
  UserIcon,
  UsersIcon,
  UserPlusIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  PencilSquareIcon,
  CalculatorIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export default function SettingsProfile({ isContent }) {
  const itemsProfile = [
    {
      name: "Ubah Profil",
      icon: <UserIcon className="w-5 h-5" />,
      path: "/settings/change-profile",
    },
    {
      name: "Manajemen Pengguna",
      icon: <UsersIcon className="w-5 h-5" />,
      path: "/settings/manage-members",
    },
    {
      name: "Managemen Undangan",
      icon: <UserPlusIcon className="w-5 h-5" />,
      path: "/settings/manage-invitation",
    },
  ]
  const itemsManageEmployee = [
    {
      name: "Klaim Gaji",
      icon: <CurrencyDollarIcon className="w-5 h-5" />,
      path: "/settings/claims-salary",
    },
    {
      name: "Monitoring Gaji",
      icon: <PencilSquareIcon className="w-5 h-5" />,
      path: "/settings/monitoring-salary",
    },
    {
      name: "Kalkulator Gaji",
      icon: <CalculatorIcon className="w-5 h-5" />,
      path: "/settings/salary-calculator",
    },
  ]
  const itemsSettingsApp = [
    {
      name: "Kelola Cabang",
      icon: <MapPinIcon className="w-5 h-5" />,
      path: "/settings/office",
    },
    {
      name: "Divisi & Posisi",
      icon: <BriefcaseIcon className="w-5 h-5" />,
      path: "/settings/division-roles",
    },
    {
      name: "Hak Akses & Izin",
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      path: "/settings/access-control",
    },
    {
      name: "Shift & Jadwal",
      icon: <ClockIcon className="w-5 h-5" />,
      path: "/settings/schedule",
    },
  ]
  return (
    <div className="w-full p-3 space-y-2 bg-white md:border md:border-gray-500 md:rounded-md rounded-lg md:shadow-none shadow-[3px_3px_10px_gray] h-max">
      <h2 className="font-semibold">
        {isContent == "profile"
          ? "Profil Pengguna"
          : isContent == "manage-employee"
          ? "Manajemen Karyawan"
          : "Pengaturan Aplikasi"}
      </h2>
      <div className="flex flex-col gap-2 text-sm">
        {(isContent === "profile"
          ? itemsProfile
          : isContent === "manage-employee"
          ? itemsManageEmployee
          : itemsSettingsApp
        ).map((item, index) => (
          <Link
            className="relative flex items-center w-full gap-3 text-black"
            key={index}
            to={item.path}
          >
            {item.icon} {item.name}
            <ChevronRightIcon className="absolute w-5 h-5 right-3" />
          </Link>
        ))}
      </div>
    </div>
  )
}

SettingsProfile.propTypes = {
  isContent: PropTypes.string,
}
