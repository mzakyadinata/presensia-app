import { MapPinIcon } from "@heroicons/react/24/outline"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"

export default function ConfirmCheckIn({
  currentDate,
  currentTime,
  address,
  onSubmit,
  isPage,
}) {
  const shortDate = () => {
    const dateNow = currentDate
    const [, removeDay] = dateNow.split(", ")
    const [date, month, year] = removeDay.split(" ")

    const dataShortMonth = {
      Januari: "Jan",
      Februari: "Feb",
      Maret: "Mar",
      April: "Apr",
      Mei: "Mei",
      Juni: "Jun",
      Juli: "Jul",
      Agustus: "Agu",
      September: "Sep",
      Oktober: "Okt",
      November: "Nov",
      Desember: "Des",
    }
    const shortMonth = dataShortMonth[month]
    return date + " " + shortMonth + " " + year
  }

  const [status, setStatus] = useState("") // Telat / Lembur / ""
  const [statusMessage, setStatusMessage] = useState(null) // JSX elemen status

  // Fungsi ini cuma hitung dan set state, tanpa return JSX
  const updateStatus = () => {
    const [hour, minute, second] = currentTime.split(".").map(Number)
    const now = new Date()
    const currentDateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute,
      second
    )

    const checkInTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      8,
      0,
      0
    )
    const checkOutTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      16,
      0,
      0
    )
    const overTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      17,
      0,
      0
    )

    let diffInSeconds = 0
    if (isPage === "check-in") {
      diffInSeconds = (currentDateTime - checkInTime) / 1000
    } else {
      diffInSeconds = (currentDateTime - checkOutTime) / 1000
    }
    const onOvertime = (overTime - checkOutTime) / 1000

    if (
      isPage === "check-in"
        ? diffInSeconds <= 59
        : diffInSeconds >= 0 && diffInSeconds < onOvertime
    ) {
      setStatus("")
      setStatusMessage(
        <span className="text-sm text-green-500">
          {isPage === "check-in"
            ? "Selamat! Anda Datang Tepat Waktu"
            : "Sampai Jumpa, Hati-hati dijalan yah!"}
        </span>
      )
    } else {
      setStatus(isPage === "check-in" ? "Terlambat" : "Lembur")
      const hours = Math.floor(diffInSeconds / 3600)
      const minutes = Math.floor((diffInSeconds % 3600) / 60)
      setStatusMessage(
        <span
          className={`text-sm ${
            isPage === "check-in" ? "text-red-500" : "text-green-500"
          }`}
        >
          {isPage === "check-in" ? "Anda Terlambat" : "Durasi Lembur : "} (
          {hours} jam {minutes} menit)
        </span>
      )
    }
  }

  // Panggil updateStatus tiap currentTime atau isPage berubah
  useEffect(() => {
    updateStatus()
  }, [currentTime, isPage])

  return (
    <div className="absolute bottom-0 z-50 p-5 bg-[rgba(0,0,0,.5)]  rounded-t-2xl md:w-150 w-full h-max flex flex-col gap-5">
      {/* card atas */}
      <div className="flex items-center justify-center w-full gap-5 py-1 text-white bg-black h-max rounded-2xl">
        <div className="w-[60%]  flex flex-col">
          <span className="text-2xl ">{currentTime}</span>
          {/* status */}
          {statusMessage}
        </div>
        <div className="w-[30%] flex flex-col">
          <span className="text-2xl ">{shortDate()}</span>
          <div className="flex flex-col text-xs">
            <span>Masuk : 08.00 WIB</span>
            <span>Pulang : 16.00 WIB </span>
          </div>
        </div>
      </div>
      {/* card address */}
      <div className="flex items-center gap-3 pl-3">
        <MapPinIcon className="text-white w-7 h-7" />
        <div className="w-full p-2 text-sm text-white bg-black border border-white rounded-xl">
          {address}
        </div>
      </div>
      {/* button */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 p-3 text-sm text-white cursor-pointer gradient-1 rounded-xl"
        onClick={() => onSubmit(status)}
      >
        <span>{isPage === "check-in" ? "Absen Masuk" : "Absen Pulang"}</span>
      </button>
    </div>
  )
}

ConfirmCheckIn.propTypes = {
  currentDate: PropTypes.string,
  currentTime: PropTypes.string,
  address: PropTypes.string,
  onSubmit: PropTypes.func,
  isPage: PropTypes.string,
}
