import { useState } from "react"
import TaskList from "../../components/list-content/TaskList"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function Tasks() {
  const [showAll, setShowAll] = useState(false)

  const handleShow = () => {
    setShowAll(!showAll)
  }

  return (
    <div
      className={`z-0 w-full overflow-x-hidden  md:bg-white  md:border md:border-gray-300 h-max ${
        showAll
          ? "fixed top-0 left-0 bg-white z-50 w-screen h-screen"
          : "md:px-4  p-3 px-0 rounded-md"
      }`}
    >
      {/* task title */}
      <div
        className={`flex  w-full mb-2 text-xs sm:text-sm ${
          showAll
            ? "gradient-1 text-white px-3 py-1 justify-center"
            : "justify-between"
        }`}
      >
        <span className="text-sm sm:text-base">Tugas Hari Ini</span>{" "}
        {/* button lihat semua & close */}
        <div
          className={`transition-colors duration-200 cursor-pointer ${
            showAll ? "absolute left-3" : "hover:text-blue-500"
          }`}
          onClick={handleShow}
        >
          {showAll ? (
            <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
          ) : (
            "Lihat Semua"
          )}
        </div>
      </div>
      {/* list */}
      <div
        className={`flex w-full  overflow-x-scroll md:flex-col hide-scrollbar ${
          showAll
            ? "px-5 py-5 gap-5 flex-col "
            : "py-2  md:py-0 gap-3 md:gap-2  flex-row "
        }`}
      >
        <TaskList isShowAll={showAll} />
        <TaskList isShowAll={showAll} />
        <TaskList isShowAll={showAll} />
      </div>
    </div>
  )
}
