import NotifList from "../components/list-content/NotifList"
import PropTypes from "prop-types"
import {
  EllipsisHorizontalIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline"

export default function Notification({ ref, handleClose }) {
  return (
    <div
      ref={ref}
      className="md:absolute fixed  md:left-[-380px] left-0 md:top-5 top-0 md:w-100 w-screen md:h-40 h-screen bg-white rounded-sm text-black shadow-lg z-30"
    >
      {/* notif container */}
      <div className="flex flex-col w-full h-full">
        {/* header notification*/}
        <div className="sticky top-0 flex justify-between items-center bg-[#002E70] text-white px-3 py-1 text-sm rounded-t-sm ">
          <ArrowLeftIcon
            className="block w-5 h-5 cursor-pointer md:hidden"
            onClick={handleClose}
          />
          <h3>Notifikasi</h3>
          <div className="flex gap-1 mr-5 text-xs md:mr-0">
            <h3
              className="hidden pr-1 border-r border-white cursor-pointer md:block"
              onClick={""}
            >
              Tandai Terbaca
            </h3>
            <div className="hidden md:block">Lihat Semua</div>
            <EllipsisHorizontalIcon className="block w-6 h-6 cursor-pointer md:hidden" />
          </div>
        </div>

        <div className="flex flex-col gap-4 py-2 overflow-y-scroll  md:max-h-[200px] h-full">
          <NotifList />
          <NotifList />
          <NotifList />
          <NotifList />
          <NotifList />
          <NotifList />
          <NotifList />
          <NotifList />
          <NotifList />
        </div>
      </div>
    </div>
  )
}

Notification.propTypes = {
  ref: PropTypes.any,
  handleClose: PropTypes.func,
}
