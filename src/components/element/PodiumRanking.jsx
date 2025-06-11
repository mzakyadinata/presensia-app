import PropTypes from "prop-types"

export default function PodiumRanking({ dataTopRank }) {
  return (
    <div className="relative flex items-center justify-center w-screen mt-5 overflow-y-hidden h-90">
      <div className="relative flex items-end justify-center font-bold text-white pt-80 w-150 h-max">
        {/* rank 1 */}
        <div className="absolute top-[-8px] flex flex-col items-center w-40 text-base text-center left-55">
          <div className="rounded-full w-15 aspect-square bg-amber-200 "></div>
          <span>{dataTopRank[0].name}</span>
          <span className="bg-[#FBAE50] px-3 py-2 rounded-xl font-medium">
            {dataTopRank[0].point} Point
          </span>
        </div>
        {/* rank 2 */}
        <div className="absolute flex flex-col items-center w-40 text-base top-10 left-15">
          <div className="rounded-full w-15 aspect-square bg-amber-200 "></div>
          <span>{dataTopRank[1].name}</span>
          <span className="bg-[#FBAE50] px-3 py-2 rounded-xl font-medium">
            {dataTopRank[1].point} Point
          </span>
        </div>
        {/* rank 3 */}
        <div className="absolute flex flex-col items-center w-40 text-base text-center right-15 bottom-27 ">
          <div className="rounded-full w-15 aspect-square bg-amber-200 "></div>
          <span>{dataTopRank[2].name}</span>
          <span className="bg-[#FBAE50] px-3 py-2 rounded-xl font-medium">
            {dataTopRank[2].point} Point
          </span>
        </div>
        <img src="/podium.png " className="absolute bottom-[-120px] w-120 " />
      </div>
    </div>
  )
}

PodiumRanking.propTypes = {
  dataTopRank: PropTypes.array.isRequired,
}
