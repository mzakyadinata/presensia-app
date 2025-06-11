import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

export default function RequestMenu() {
  const menuRequest = [
    {
      name: "Ajukan Izin",
      path: "request-permission",
      gradient: "2",
    },
    {
      name: "Ajukan Ubah Shift",
      path: "request-change-shift",
      gradient: "4",
    },
    {
      name: "Ajukan Reimburse",
      path: "request-reimburse",
      gradient: "5",
    },
    {
      name: "Kunjungan Klien",
      path: "client-visits",
      gradient: "6",
    },
    {
      name: "Riwayat Absensi",
      path: "log-presence",
      gradient: "3",
    },
  ]
  return (
    <div className="flex flex-col w-full bg-white border border-gray-300 rounded-md">
      <div className="flex justify-between w-full px-2 py-3 md:px-5 ">
        {menuRequest.map((item) => (
          <Link
            key={item.name}
            className="flex flex-col items-center gap-1 "
            to={item.path}
          >
            <div
              className={`flex items-center justify-center p-1 rounded-full lg:w-[5vw] md:w-[6vw] w-12 aspect-square gradient-${item.gradient}`}
            >
              <img
                src={`/request-menu/${item.path}.png`}
                className="w-6 h-6 md:w-7 md:h-7"
              />
            </div>
            <span className="w-15 text-center text-[11px] md:text-xs md:w-20">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      {/* point */}
      <div className="flex justify-between w-full px-5 py-2 border-t border-gray-300 h-max rounded-b-md">
        <span className="flex items-center justify-center gap-2 text-sm">
          <img src="/coin.png" />{" "}
          <span className="text-[#E17D05]">200.000</span> Point
        </span>
        <Link className="text-[#0057D6] bg-[rgba(0,93,229,.1)] rounded-3xl py-2 px-3 text-sm flex justify-center items-center gap-3">
          <img src="/badge.png" />
          Claim Point
          <div className="rounded-full bg-[#005DE5] w-5 h-5 flex justify-center items-center">
            <ChevronRightIcon className="w-3 h-3 text-white" />
          </div>
        </Link>
      </div>
    </div>
  )
}
