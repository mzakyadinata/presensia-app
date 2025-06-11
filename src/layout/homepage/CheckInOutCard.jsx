import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function CheckInOutCard() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [checkInDisable, setCheckInDisable] = useState(false)
  const [checkOutDisable, setCheckOutDisable] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const date = new Date()
    const getDay = date.getDay()
    const parsedDate = date.toISOString().split("T")[0]
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/absensi`)
        const data = response.data

        const findData = data.find((data) => data.date == parsedDate)
        if (findData) {
          if (findData.check_in != "--:--") {
            setCheckInDisable(true)
          }
          if (findData.check_out != "--:--") {
            setCheckOutDisable(true)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    if (getDay == 0 || getDay == 6) {
      // if sunday or saturday disable btn
      setCheckInDisable(true)
      setCheckOutDisable(true)
    } else fetchData()
  }, [])

  useEffect(() => {
    const updateWaktu = () => {
      const now = new Date()
      // Format tanggal
      const day = now.toLocaleString("id-ID", { weekday: "long" })
      const dateNow = now.getDate()
      const month = now.toLocaleString("id-ID", { month: "long" })
      const year = now.getFullYear()
      setDate(`${day}, ${dateNow} ${month} ${year}`)
      // Format jam
      const hour = String(now.getHours()).padStart(2, "0")
      const minute = String(now.getMinutes()).padStart(2, "0")
      const second = String(now.getSeconds()).padStart(2, "0")
      setTime(`${hour}.${minute}.${second}`)
    }
    updateWaktu() // Update pertama
    const interval = setInterval(updateWaktu, 1000) // Update setiap detik

    return () => clearInterval(interval) // Bersihkan saat unmount
  }, [])

  const navigateCheckIn = () => {
    navigate("/check-in")
  }
  const navigateCheckOut = () => {
    navigate("/check-out")
  }

  return (
    <div className="z-0 flex flex-col w-full gap-3 p-4 bg-white shadow-xl md:border md:border-gray-300 md:rounded-md rounded-xl h-max md:shadow-none">
      {/* title and date */}
      <div className="flex justify-between">
        <span className="text-black text-md fonst-semibold">Jadwal Kerja</span>
        <span className="text-[#646B77] text-sm">{date}</span>
      </div>
      {/* time work and realtime clock */}
      <div className="flex justify-between">
        <span className="text-black text-md">08.00 - 16.00</span>
        {/* real time clock */}
        <span className="px-3 flex justify-center items-center border rounded-xl border-[#646B77] text-[#646B77]">
          {time}
        </span>
      </div>
      {/* button */}
      <div className="flex flex-col w-full gap-2 font-semibold md:text-lg">
        <button
          className={` rounded-xl shadow-md text-white text-center md:py-5   p-3 ${
            checkInDisable
              ? "cursor-not-allowed bg-[#FA8B05]/50 "
              : "cursor-pointer bg-[#FA8B05]"
          }`}
          disabled={checkInDisable}
          onClick={navigateCheckIn}
        >
          Check In
        </button>
        <button
          className={`text-[#ACB5BB] rounded-xl shadow-md text-center md:py-5  p-3 ${
            checkOutDisable
              ? "cursor-not-allowed bg-[#EDF1F3]/50 "
              : "cursor-pointer bg-[#EDF1F3] "
          }`}
          disabled={checkOutDisable}
          onClick={navigateCheckOut}
        >
          Check Out
        </button>
      </div>
    </div>
  )
}
