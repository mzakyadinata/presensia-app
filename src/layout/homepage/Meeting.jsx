import { useState } from "react"
import MeetingList from "../../components/list-content/MeetingList"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function Meeting() {
  const [showAll, setShowAll] = useState(false)

  const handleShow = () => {
    setShowAll(!showAll)
  }
  return (
    <div
      className={`z-0 w-full  overflow-x-hidden md:bg-white  md:border md:border-gray-300 h-max ${
        showAll
          ? "fixed top-0 left-0 bg-white z-50 w-screen h-screen"
          : "p-3 md:px-4  px-0  rounded-md"
      }`}
    >
      {/* title */}
      <div
        className={`flex  w-full mb-2 text-xs sm:text-sm  ${
          showAll
            ? "gradient-1 text-white px-3 py-1 justify-center relative"
            : "justify-between"
        }`}
      >
        <span className="text-sm sm:text-base">Meeting Hari Ini </span>
        <div
          className={`transition-colors duration-200 cursor-pointer ${
            showAll ? "absolute left-3" : "hover:text-blue-500"
          } `}
          onClick={handleShow}
        >
          {showAll ? (
            <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
          ) : (
            "Lihat Semua"
          )}
        </div>
      </div>
      <div
        className={`flex  overflow-x-scroll hide-scrollbar ${
          showAll
            ? "flex-col px-5 pr-7 gap-5 mt-5 py-5"
            : "gap-2 py-2 md:py-0 flex-row  md:flex-col "
        }`}
      >
        <MeetingList />
        <MeetingList />
        <MeetingList />
      </div>
    </div>
  )
}
