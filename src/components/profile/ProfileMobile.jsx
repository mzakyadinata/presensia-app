import PropTypes from "prop-types"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

export default function ProfileMobile({ isSettings, children }) {
  return (
    <div
      className={`flex w-full  p-3 pl-0 rounded-md   h-max ${
        isSettings
          ? "md:text-black text-white gap-7 pl-2 md:shadow-xl"
          : "md:hidden gap-2 text-white "
      }`}
    >
      {/* image profile */}
      <div className="relative flex items-center justify-center bg-red-200 border-2 border-white rounded-full w-23 h-23">
        <img
          src="/profil-ex.jpeg"
          className="w-full h-full border border-white rounded-full"
        />
        {isSettings && (
          <div className="absolute bottom-0 right-0 flex items-center justify-center p-2 rounded-full md:bg-[#004FC2] bg-white">
            <PencilSquareIcon className="w-4 h-4 md:text-white text-[#004FC2] " />
          </div>
        )}
      </div>
      {/* caption & point */}
      <div className="flex flex-col gap-1">
        {!children && (
          <>
            <span>Hai Selamat Pagi</span>
            <span className="text-lg font-semibold">John Doe</span>
            {/* point */}
            <div className="flex w-full gap-1 px-2 py-1 text-sm text-black bg-white shadow-lg h-max rounded-3xl">
              <span>
                <img src="/coin.png" />
              </span>
              <span className="text-[#E17D05]">3.000.000</span>
              <span>Point</span>
            </div>
          </>
        )}
        {children}
      </div>
    </div>
  )
}

ProfileMobile.propTypes = {
  isSettings: PropTypes.bool,
  children: PropTypes.any,
}
