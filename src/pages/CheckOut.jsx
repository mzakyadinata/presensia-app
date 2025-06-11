import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import PrimaryButton from "../components/button/PrimaryButton"
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/outline"
import ConfirmFace from "../layout/check-in-out/ConfirmFace"
import SplashSuccess from "../components/splash-modal/SplashSuccess"
import axios from "axios"
import { parse, format } from "date-fns"
import { id } from "date-fns/locale"

// Fix icon path issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export default function CheckOut() {
  const [position, setPosition] = useState(null)
  const [confirmFace, setConfirmFace] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [address, setAddress] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const navigate = useNavigate()
  const getDay = currentDate.split(", ")
  console.log(getDay[0])

  // get current time and date
  useEffect(() => {
    const now = new Date()

    const time = now
      .toLocaleTimeString("id-ID", { hour12: false })
      .slice(0, 8)
      .replace(/:/g, ".")
    setCurrentTime(time)

    const date = now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    setCurrentDate(date)
  }, [])

  // get user loc
  useEffect(() => {
    const geo = navigator.geolocation

    if (!geo) {
      alert("Geolocation tidak didukung browser Anda")
      return
    }

    const watcher = geo.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        const coords = [latitude, longitude]
        setPosition(coords)

        // Reverse geocoding
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=id`
          )
          const data = await response.json()
          const fullAddress = data.display_name
          setAddress(fullAddress) // ← SIMPAN ke state
        } catch (error) {
          console.error("Gagal mengambil alamat:", error)
          setAddress("Alamat tidak ditemukan")
        }
      },
      (err) => {
        console.error(err)
        alert("Gagal mendapatkan lokasi: " + err.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 100000,
        maximumAge: 0,
      }
    )

    return () => geo.clearWatch(watcher)
  }, [])

  // for submit data
  const handleSubmit = async (status) => {
    const [hours, minutes] = currentTime.split(".")
    const parsedDate = parse(currentDate, "EEEE, d MMMM yyyy", new Date(), {
      locale: id,
    })
    const formattedDate = format(parsedDate, "yyyy-MM-dd")
    const newDataCheckOut = {
      date: formattedDate,
      check_out: `${hours}:${minutes}`,
      status: status,
    }
    try {
      const response = await axios.get("http://localhost:3001/absensi")
      const dataList = response.data

      const matchedEntry = dataList.find(
        (data) => data.date == newDataCheckOut.date
      )
      if (matchedEntry) {
        // PATCH check_out dan status tanpa validasi check_in
        await axios.patch(`http://localhost:3001/absensi/${matchedEntry.id}`, {
          check_out: newDataCheckOut.check_out,
          status: newDataCheckOut.status,
        })
        setSubmitSuccess(true)
      }
    } catch (error) {
      console.error("Failed to submit data:", error)
    }
  }

  const backToApp = () => {
    setConfirmFace(false)
    navigate("/app")
  }

  return (
    <div className="relative z-0 flex justify-center w-screen h-screen overflow-hidden rounded-lg shadow-lg">
      {position ? (
        <MapContainer
          center={position}
          zoom={20}
          scrollWheelZoom={false} // disable scroll zoom
          className="absolute z-0 w-full h-full"
          doubleClickZoom={false} // disable double click zoom
          dragging={false} //  disable drag
          zoomControl={false} //  hide +/– buttons
          touchZoom={false} //  disable pinch zoom on touch
          keyboard={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={position}>
            <Popup>Lokasi Anda Saat Ini</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p className="mt-10 text-center">Mengambil lokasi...</p>
      )}

      <div className="absolute bottom-0 p-5 justify-center gap-2 flex flex-col z-20 md:w-[50vw] w-full h-max bg-white rounded-t-2xl text-black">
        <span className="flex items-center gap-2">
          {" "}
          <img
            src="/navbar/user-scan-solidBlue.png"
            className="w-6 h-6 "
          />{" "}
          John Doe
        </span>
        <span className="flex items-center gap-2 ">
          <MapPinIcon className="w-6 h-6 shrink-0 text-[#1D61E7]" />{" "}
          <span className="truncate">{address ? address : "Memuat...."}</span>
        </span>
        <span className="flex items-center gap-2">
          <ClockIcon className="w-6 h-6 text-[#1D61E7]" /> {currentTime}
        </span>
        <span className="flex items-center gap-3 pl-[2px] ">
          {address == "" ? (
            <>Silahkan masukkan lokasi </>
          ) : (
            <>
              <img src="/in-radius.png" className="w-5 h-5" />
              Lokasi kamu berada dalam radius
            </>
          )}
        </span>
        <PrimaryButton
          style="p-6 shadow-xl "
          isDisabled={address == "" ? true : false}
          onClick={() => setConfirmFace(true)}
        >
          Lanjutkan
        </PrimaryButton>
      </div>
      <ConfirmFace
        isShow={confirmFace}
        back={() => setConfirmFace(false)}
        handleSubmit={handleSubmit}
        currentDate={currentDate}
        currentTime={currentTime}
        address={address}
        isPage="check-out"
      />
      {submitSuccess && (
        <SplashSuccess
          isShowSplash={submitSuccess}
          title="Check Out Berhasil"
          handleClose={backToApp}
        >
          <div className="flex flex-col items-center justify-center gap-2 w-max">
            <span className="text-sm">
              Kehadiran Kamu Telah Berhasil Dicatat
            </span>
            <div className="flex flex-col justify-center w-max h-max rounded-2xl p-3 bg-[#F8F9FC] shadow-[0_4px_20px_rgba(0,0,0,.7)] ">
              <span>{currentTime}</span>
              <span>{currentDate}</span>
            </div>
          </div>
        </SplashSuccess>
      )}
    </div>
  )
}
