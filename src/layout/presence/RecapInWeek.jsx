import { useEffect, useState } from "react"
import {
  startOfWeek,
  endOfWeek,
  parseISO,
  format,
  eachDayOfInterval,
  getDay,
} from "date-fns"
import id from "date-fns/locale/id"
import axios from "axios"

const statusColor = {
  Hadir: "text-green-500",
  Alpha: "text-orange-500",
  Izin: "text-blue-500",
  Terlambat: "text-red-500",
  Lembur: "text-purple-500",
}

export default function RecapInWeek() {
  const [summary, setSummary] = useState({
    Hadir: 0,
    Alpha: 0,
    Izin: 0,
    Terlambat: 0,
    Lembur: 0,
  })
  const [weeklyData, setWeeklyData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/absensi")
        const data = response.data

        const now = new Date()
        const start = startOfWeek(now, { weekStartsOn: 0 }) // Minggu
        const end = endOfWeek(now, { weekStartsOn: 0 }) // Sabtu

        const days = eachDayOfInterval({ start, end })

        const tempSummary = {
          Hadir: 0,
          Alpha: 0,
          Izin: 0,
          Terlambat: 0,
          Lembur: 0,
        }

        const weekly = days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd")
          const found = data.find((item) => item.date === dateStr)

          if (found && tempSummary[found.status] !== undefined) {
            tempSummary[found.status] += 1
          }

          const dayIndex = getDay(day) // 0 = Minggu
          const isSunday = dayIndex === 0

          return {
            date: dateStr,
            dateFull: format(day, "EEEE dd MMMM yyyy", { locale: id }),
            isSunday,
            check_in: found?.check_in || "--:--",
            check_out: found?.check_out || "--:--",
          }
        })

        setWeeklyData(weekly)
        setSummary(tempSummary)
      } catch (error) {
        console.error("Gagal ambil data absensi:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="w-full mt-5 md:mb-0 mb-30">
      <h2 className="mb-2 text-lg font-bold">Rekap Mingguan</h2>
      <div className="flex flex-col justify-between w-full gap-5 md:flex-row md:gap-0">
        {/* Recap In week */}
        <div className="grid sm:grid-cols-5 grid-cols-3 gap-2 md:grid-cols-2 md:w-[25%] lg:w-[35%] 0">
          {Object.entries(summary).map(([key, value]) => (
            <div
              key={key}
              className="px-2 py-3 text-center shadow-md card bg-base-200"
            >
              <h3 className={`font-semibold ${statusColor[key] || ""}`}>
                {key}
              </h3>
              <p className="text-xl font-bold">{value}x</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="md:w-[70%] lg:w-[60%] bg-white border border-gray-300 rounded-md text-xs">
          <div className="grid w-full h-full grid-cols-1 md:grid-cols-8">
            {/* flex items-center justify-between h-full py-3 font-semibold text-center bg-gray-100 border-r border-gray-300 md:py-5 md:flex-col md:pt-7 md:rounded-l-md rounded-t-md md:rounded-t-none */}
            {/* Left Header*/}
            <div className="grid items-center grid-cols-3 py-3 font-semibold text-center bg-gray-100 border-r border-gray-300 md:grid-cols-1 md:grid-rows-3 md:py-0 ">
              <span>Tanggal</span>
              <span>Check In</span>
              <span>Check Out</span>
            </div>

            {/* text-center border-r border-gray-200 py-5 flex md:flex-col md:justify-between justify-start items-center h-full px-1 gap-40 md:gap-0 md:pl-0 pl-12  */}
            {/* Week from Sunday */}
            {weeklyData.map((day, index) => (
              <div
                key={index}
                className={`text-center border-r border-gray-200 grid py-6 pt-8 md:grid-cols-1 md:gap-15 md:grid-rows-3  grid-cols-3 ${
                  day.isSunday ? "bg-red-500/30  font-medium text-red-500" : ""
                }`}
              >
                <span
                  className={`font-semibold ${
                    day.isSunday ? "text-red-500" : ""
                  }`}
                >
                  {format(parseISO(day.date), "EEEE dd MMMM yyyy", {
                    locale: id,
                  })}
                </span>

                {day.isSunday ? (
                  <>
                    <span>Weekend</span>
                    <span>Holiday</span>
                  </>
                ) : (
                  <>
                    <span>{day.check_in}</span>
                    <span>{day.check_out}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
