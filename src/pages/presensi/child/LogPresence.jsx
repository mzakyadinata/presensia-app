import { useState, useEffect } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  // isSameMonth,
} from "date-fns"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

const statusColor = {
  Hadir: "text-green-500",
  Alpha: "text-orange-500",
  Izin: "text-blue-500",
  Terlambat: "text-red-500",
  Weekend: "text-red-600",
  Lembur: "text-purple-500",
}

export default function LogPresence() {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const [month, setMonth] = useState(new Date().getMonth()) // default curr year
  const [absensi, setAbsensi] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/absensi")
      .then((res) => res.json())
      .then((data) => setAbsensi(data))
      .catch((err) => console.error("Gagal fetch absensi:", err))
  }, [])

  const handleMonthChange = (direction) => {
    let newMonth = month + direction
    let newYear = year

    if (newMonth < 0) {
      newMonth = 11
      newYear--
    } else if (newMonth > 11) {
      newMonth = 0
      newYear++
    }

    setMonth(newMonth)
    setYear(newYear)
  }

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value))
  }

  const currentDate = new Date(year, month)

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  const getAbsenEntry = (dateStr) => {
    return absensi.find((a) => a.date === dateStr)
  }

  // Rekap per bulan
  const monthlySummary = {
    Hadir: 0,
    Alpha: 0,
    Izin: 0,
    Terlambat: 0,
    Lembur: 0,
  }

  absensi.forEach((entry) => {
    const entryDate = new Date(entry.date)
    if (entryDate.getMonth() === month && entryDate.getFullYear() === year) {
      if (monthlySummary[entry.status] !== undefined) {
        monthlySummary[entry.status] += 1
      }
    }
  })

  return (
    <div className="absolute top-0 left-0 z-10 w-full h-screen p-4 overflow-x-hidden overflow-y-auto bg-white md:pl-20 ">
      {/* title */}
      <div className="fixed top-0 left-0 z-50 flex justify-between w-full px-3 py-2 text-white h-max gradient-1 md:hidden ">
        <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
        <span>Log Absensi</span>
        <div className="w-4"></div>
      </div>
      {/* Recap Presence in Month*/}
      <div className="grid grid-cols-2 gap-10 mt-10 mb-4 md:mt-0 sm:grid-cols-5">
        {Object.keys(monthlySummary).map((key) => (
          <div
            key={key}
            className="px-1 py-2 text-center shadow-sm card bg-base-200"
          >
            <h3 className={`font-semibold ${statusColor[key] || ""}`}>{key}</h3>
            <p className="text-xl font-bold">{monthlySummary[key]}x</p>
          </div>
        ))}
      </div>

      {/* Header Bulan + Tahun */}
      <div className="flex items-center justify-between mt-8 mb-2">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => handleMonthChange(-1)}
        >
          ←
        </button>

        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">{format(currentDate, "MMMM")}</h2>
          <select
            className="select select-sm select-bordered"
            value={year}
            onChange={handleYearChange}
          >
            {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(
              (y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              )
            )}
          </select>
        </div>

        <button
          className="btn btn-sm btn-outline"
          onClick={() => handleMonthChange(1)}
        >
          →
        </button>
      </div>

      {/* Label Hari */}
      <div className="grid grid-cols-7 gap-1 mt-5 mb-1 text-sm font-semibold text-center">
        {["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map(
          (d) => (
            <div key={d}>{d}</div>
          )
        )}
      </div>

      {/* Kalender */}
      <div className="grid grid-cols-7 gap-1 mt-5 text-xs">
        {/* Empty awal bulan */}
        {Array(getDay(startOfMonth(currentDate)))
          .fill(null)
          .map((_, idx) => (
            <div key={`empty-${idx}`} className="h-20 sm:h-24"></div>
          ))}

        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd")
          const entry = getAbsenEntry(dateStr)
          const status = entry?.status || "--"
          const checkInOut =
            entry?.check_in && entry?.check_out
              ? `${entry.check_in} - ${entry.check_out}`
              : "--:--"

          const isSunday = getDay(day) === 0

          return (
            <div
              key={dateStr}
              className={`border rounded-lg p-1 sm:p-2 flex flex-col justify-between ${
                isSunday ? "bg-red-100" : "bg-base-200"
              }`}
            >
              <div className="text-lg font-semibold">{format(day, "dd")}</div>
              <div className="text-sm text-gray-600">{checkInOut}</div>
              <div
                className={`text-sm font-semibold ${
                  statusColor[status] || "text-gray-400"
                }`}
              >
                {status}
              </div>
              {isSunday && (
                <div className="text-[9px] text-red-500">Weekend Holiday</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
