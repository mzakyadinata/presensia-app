import LeaderboardList from "../../components/list-content/LeaderboardList"
import { useState } from "react"
import PropTypes from "prop-types"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import PodiumRanking from "../../components/element/PodiumRanking"

export default function Leaderboard({ showAllStatus }) {
  const [showAll, setShowAll] = useState(false)

  const handleShow = () => {
    setShowAll(!showAll)
    showAllStatus(!showAll)
  }

  const dataLeaderBoard = [
    {
      rank: 1,
      name: "John Doe",
      divison: "Product Manager",
      point: "20.000.600",
    },
    {
      rank: 2,
      name: "Adam Smith",
      divison: "UI/UX Designer",
      point: "15.960.000",
    },
    {
      rank: 3,
      name: "Hermes",
      divison: "Project Manager",
      point: "12.230.000",
    },
    {
      rank: 4,
      name: "Hestia",
      divison: "Project Manager",
      point: 500,
    },
    {
      rank: 5,
      name: "Takemizuchi",
      divison: "IT Support",
      point: 480,
    },
    {
      rank: 6,
      name: "Takemizuchi",
      divison: "IT Support",
      point: 450,
    },
    {
      rank: 7,
      name: "Takemizuchi",
      divison: "IT Support",
      point: 400,
    },
    {
      rank: 8,
      name: "Takemizuchi",
      divison: "IT Support",
      point: 380,
    },
    {
      rank: 9,
      name: "Takemizuchi",
      divison: "IT Support",
      point: 340,
    },
    {
      rank: 10,
      name: "Takemizuchi",
      divison: "IT Support",
      point: 310,
    },
  ]
  return (
    <div
      className={`z-10 w-full space-y-2 bg-white  md:border md:border-gray-500 h-max   ${
        showAll
          ? "fixed top-0 left-0 w-screen h-screen z-50 p-0 overflow-y-scroll overflow-x-hidden hide-scrollbar pb-30"
          : "p-2  px-0 md:px-2  rounded-md"
      }`}
    >
      {showAll && (
        <div className="absolute  w-full bg-[#FA8B05] h-65 rounded-b-3xl -z-10 ">
          <div className="w-full gradient-1 h-60 rounded-b-3xl">
            {/* this div for ornament color in mobile view */}
          </div>
        </div>
      )}
      {/* title */}
      <div
        className={`flex  items-center px-1 ${
          showAll
            ? "text-white px-3 pt-2 justify-center relative"
            : "justify-between"
        }`}
      >
        <span
          className={`${
            showAll ? "font-semibold text-lg" : "text-sm sm:text-base "
          }`}
        >
          Leaderboard
        </span>
        <div
          className={`text-xs transition-colors duration-200 cursor-pointer sm:text-sm ${
            showAll ? "absolute left-0 top-2" : "hover:text-blue-500"
          }`}
          onClick={handleShow}
        >
          {showAll ? (
            <ArrowLeftIcon className="absolute w-5 h-5 cursor-pointer left-3" />
          ) : (
            "Lihat Semua"
          )}
        </div>
      </div>

      {/* podium ranking  */}
      {showAll && <PodiumRanking dataTopRank={dataLeaderBoard.slice(0, 3)} />}

      {/* list leaderboard top 5 */}
      <div
        className={`flex flex-col w-full gap-3 h-max ${
          showAll ? "px-10 mt-10" : " px-0 lg:px-1"
        }`}
      >
        {!showAll &&
          dataLeaderBoard.slice(0, 3).map((item) => {
            return (
              <LeaderboardList
                key={item.rank}
                rank={item.rank}
                name={item.name}
                divison={item.divison}
                point={item.point}
              />
            )
          })}

        {dataLeaderBoard.slice(3, !showAll ? 5 : undefined).map((item) => {
          return (
            <LeaderboardList
              key={item.rank}
              rank={item.rank}
              name={item.name}
              divison={item.divison}
              point={item.point}
            />
          )
        })}
      </div>
    </div>
  )
}

Leaderboard.propTypes = {
  showAllStatus: PropTypes.func,
}
