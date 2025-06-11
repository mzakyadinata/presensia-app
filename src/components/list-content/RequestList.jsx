import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline"
import PropTypes from "prop-types"
export default function RequestList({ dataRequest, isRequest, onClick }) {
  return (
    <div
      className={`relative flex items-center justify-between w-full p-2 px-2 bg-white md:border md:border-gray-300 rounded-md h-max md:shadow-none shadow-xl ${
        onClick && "cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="flex w-full gap-3">
        {/* image profil */}
        <div className="w-12 rounded-full aspect-square bg-amber-300"></div>
        {/* detail permission */}
        <div className="flex flex-col w-[90%] ">
          <h3 className="text-lg font-semibold">{dataRequest.name}</h3>
          <div className="flex w-full gap-2 text-xs ">
            <span className="flex items-center gap-1 ">
              <CalendarDaysIcon className="w-5 h-5 text-red-500" />{" "}
              {dataRequest.date}
            </span>
            <span className="flex items-center gap-1 ">
              {dataRequest.status === "Disetujui" ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : dataRequest.status === "Ditolak" ? (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              ) : (
                <ClockIcon className="w-5 h-5 text-yellow-500" />
              )}
              {dataRequest.status}
            </span>
            {(isRequest == "change-shift" || isRequest == "reimburse") && (
              <span className="flex items-center gap-1">
                {isRequest == "change-shift" ? (
                  <>
                    <ClockIcon className="w-5 h-5 text-blue-500" />
                    {dataRequest.form.shiftRequested}
                  </>
                ) : (
                  <>
                    <BriefcaseIcon className="w-5 h-5 text-amber-500" />
                    {dataRequest.reimburse}
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* time */}
      <span className="absolute text-xs right-2 top-2">{dataRequest.time}</span>
    </div>
  )
}

RequestList.propTypes = {
  dataRequest: PropTypes.object,
  isRequest: PropTypes.string,
  onClick: PropTypes.func,
}
