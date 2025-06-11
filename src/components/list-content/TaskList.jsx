import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline"
import PropTypes from "prop-types"

export default function TaskList({ isShowAll }) {
  return (
    <div
      className={`flex justify-between  p-3 bg-white md:rounded-md rounded-2xl shadow-lg md:w-full ${
        isShowAll ? "w-full" : "w-[70%]"
      }`}
    >
      {/* Detail task */}
      <div className="w-[70%] space-y-1 truncate ">
        <h3 className="w-full text-sm font-semibold truncate sm:text-base">
          Perancangan Design Website abshashashasdadsadsasadsadadasdasdsdasasd
        </h3>
        <div className="flex gap-2 text-xs text-gray-500 sm:text-sm">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4 text-[#E02D3C]" /> 20.00 WIB
          </span>
          <span className="flex items-center gap-1">
            <CheckCircleIcon className="w-4 h-4 text-[#0BB77E]" /> Prioritas
          </span>
        </div>
        <span className="flex items-center gap-1 text-[#FA8B05] p-1 px-2 border border-[#FA8B05] w-max rounded-3xl text-xs">
          <img src="/coin.png" className="w-5 h-5" /> +20.000
        </span>
      </div>
      {/* progress */}
      <div className="w-[20%] flex items-center justify-end ">
        <div className="relative lg:w-18 lg:h-18 md:w-14 md:h-14 sm:w-16 sm:h-16 w-13 h-13">
          <div className="w-full h-full rounded-full bg-[conic-gradient(#04FFFF_0%,#0029FF_75%,#e5e7eb_75%)]"></div>
          <div className="absolute flex items-center justify-center bg-white rounded-full inset-1.5">
            <span className="text-xs font-semibold text-gray-600 ld:text-base md:text-sm sm:text-xs">
              75%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

TaskList.propTypes = {
  isShowAll: PropTypes.bool,
}
