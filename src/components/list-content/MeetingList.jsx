import { MapPinIcon, ClockIcon } from "@heroicons/react/24/outline"

export default function MeetingList() {
  return (
    <div className="flex justify-between w-full gap-3 p-3 bg-white shadow-lg md:rounded-md rounded-2xl h-max">
      {/* Detail task */}
      <div className="w-[80%] truncate space-y-2">
        <h3 className="w-full text-sm font-semibold truncate md:text-base">
          Meeting Presensia Project
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-500 md:text-sm">
          <MapPinIcon className="w-5 h-5 text-black" />
          <span className="flex flex-col gap-0 md:flex-row md:gap-1">
            <span> Ruang Training Graha Pena, </span>
            <span> Surabaya Jawa Timur</span>
          </span>
        </div>
      </div>
      {/* right side */}
      <div className="w-20% h-max flex flex-col gap-2 justify-center items-center">
        <span className="bg-[rgba(232,84,84,.2)] flex items-center rounded-xl p-1 px-3 gap-1">
          <MapPinIcon className="w-4 h-4 text-red-400" />
          <span className="text-xs text-red-400">Offline</span>
        </span>
        <span className="flex items-center gap-1">
          <ClockIcon className="w-4 h-4 text-red-500" />
          <span className="text-sm text-gray-500">09.00</span>
        </span>
      </div>
    </div>
  )
}
