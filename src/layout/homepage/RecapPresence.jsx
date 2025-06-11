import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { format } from "date-fns"

export default function RecapPresence() {
  const [timeCheckIn, setTimeCheckIn] = useState("--:--")
  const [timeCheckOut, setTimeCheckOut] = useState("--:--")
  const [status, setStatus] = useState("-")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/absensi")
        const data = response.data

        const today = new Date()
        const todayFormatted = format(today, "yyyy-MM-dd")

        const dataExist = data.find((item) => item.date === todayFormatted)

        if (dataExist) {
          if (dataExist.status === "Alpha" || dataExist.status === "Izin") {
            setStatus("Ya")
          } else setStatus("Tidak")

          setTimeCheckIn(dataExist.check_in)
          setTimeCheckOut(dataExist.check_out)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="z-0 w-full bg-white rounded-md shadow-xl h-max md:border md:border-gray-300 md:shadow-none">
      {/* recap today */}
      <div className="relative flex items-center justify-center p-3 gap-15 text-md">
        {/* check in */}
        <span className="absolute flex flex-col gap-2 left-3">
          <h3 className="text-sm">Check In</h3>
          <p className="font-semibold">{timeCheckIn} WIB</p>
        </span>
        {/* Izin */}
        <span className="flex flex-col items-center gap-2">
          <h3 className="text-sm">Absen/Izin</h3>
          <p className="font-semibold ">{status}</p>
        </span>
        {/* checkout */}
        <span className="absolute flex flex-col gap-2 right-3">
          <h3 className="text-sm">Check Out</h3>
          <p className="font-semibold ">{timeCheckOut} WIB</p>
        </span>
      </div>
      {/* ajukan lembur */}
      <Link
        className="w-full p-2 text-xs  border-t border-gray-300 rounded-b-md text-[#0057D6] font-medium flex items-center justify-center gap-2 "
        to="/presensi/request-overtime"
      >
        <img src="/icon-lembur.png" />
        <span>Ajukan Lembur</span>
        <span className="w-6 h-6 bg-[#0057D6] rounded-full flex items-center justify-center">
          <ChevronRightIcon className="w-4 h-4 text-white" />
        </span>
      </Link>
    </div>
  )
}
