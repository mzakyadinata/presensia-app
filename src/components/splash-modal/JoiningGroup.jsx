import { UserGroupIcon, UserIcon } from "@heroicons/react/24/solid"
import PropTypes from "prop-types"

export default function JoiningGroup({ isShow, onSubmit }) {
  return (
    <div
      className={`absolute w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center ${
        isShow ? "block" : "hidden"
      }`}
    >
      {/* card */}
      <div className="sm:w-[50vw] w-full sm:static absolute sm:bottom-none bottom-0 h-max bg-base-100 shadow-xl sm:rounded-2xl rounded-t-2xl flex items-center gap-[2vh] flex-col p-10 fade-up">
        <div className="bg-[#FA8B05] w-20 h-20 rounded-full flex items-center justify-center">
          <UserGroupIcon className="w-10 h-10 text-white" />
        </div>
        <div className="text-center">
          <h1 className="font-medium">PT.Otak Kanan</h1>
          <span className="text-sm text-gray-500 ">Dibuat pada 06/02/25</span>
        </div>
        {/* icon info anggota group */}
        <div className="flex space-x-[-12px]">
          <div className="bg-[#E02D3C] w-10 h-10 rounded-full flex items-center justify-center border border-[#E1E6EF]">
            <UserIcon className="w-5 h-5 text-white " />
          </div>
          <div className="bg-[#FA9214] w-10 h-10 rounded-full flex items-center justify-center border border-[#E1E6EF]">
            <UserIcon className="w-5 h-5 text-white " />
          </div>
          <div className="bg-[#0057D6] w-10 h-10 rounded-full flex items-center justify-center border border-[#E1E6EF] text-white">
            +25
          </div>
        </div>

        {/* button */}
        <button
          className="w-full p-5 mt-4 text-white rounded-lg btn gradient-1"
          onClick={onSubmit}
        >
          Bergabung Ke Gurp
        </button>
      </div>
    </div>
  )
}

JoiningGroup.propTypes = {
  isShow: PropTypes.bool,
  onSubmit: PropTypes.func,
}
