import PropTypes from "prop-types"

export default function LeaderboardList({ rank, name, divison, point }) {
  return (
    <div className="bg-white border-2 border-[#0068FF] rounded-4xl shadow-lg flex items-center  py-2">
      {/* ranking */}
      <div className="lg:w-[12%] w-[20%] flex justify-center">
        <div className="flex items-center justify-center w-10 h-10 bg-[#0068FF] rounded-full text-white">
          {rank > 0 && rank < 4 ? (
            <img
              src={`/rank-icon/rank-${rank}.png`}
              alt={`Rank-${rank}`}
              className="w-full h-full"
            />
          ) : (
            <>{rank}</>
          )}
        </div>
      </div>
      {/* detail name and division */}
      <div className="flex flex-col px-3 md:w-[50%] w-[60%] border-gray-500 border-x">
        <h3 className="font-semibold truncate">{name}</h3>
        <span className="text-sm truncate">{divison}</span>
      </div>
      {/* point */}
      <div className="flex items-center w-[40%] justify-center gap-2 px-2">
        <span className="gap-1 text-lg font-semibold lg:text-xl">{point}</span>
        <span className="text-sm">Point</span>
      </div>
    </div>
  )
}

LeaderboardList.propTypes = {
  rank: PropTypes.number,
  name: PropTypes.string,
  divison: PropTypes.string,
  point: PropTypes.number,
}
