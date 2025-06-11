import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import UncontrolledInput from "../../../components/element/UncontrolledInput"
import SecondaryButton from "../../../components/button/SecondaryButton"
import { useState, useEffect } from "react"
import SplashSuccess from "../../../components/splash-modal/SplashSuccess"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import PropTypes from "prop-types"
import ControlledInput from "../../../components/element/ControlledInput"
import PrimaryButton from "../../../components/button/PrimaryButton"

// Fix default icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

function MapUpdater({ position }) {
  const map = useMap()
  if (position) map.setView(position, 16)
  return null
}

export default function OfficeSettings() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [search, setSearch] = useState("")
  const [position, setPosition] = useState(null)
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  const dataOffice = {
    name: "PT OTAK KANAN",
    typeLoc: "Pusat",
    radiusAbsen: "100",
    latitude: "-7.32038",
    longitude: "112.73179",
  }

  useEffect(() => {
    const officeCoordinate = [
      parseFloat(dataOffice.latitude),
      parseFloat(dataOffice.longitude),
    ]
    setPosition(officeCoordinate)
  }, [])

  const handleSearch = async () => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        search
      )}&format=json`
    )
    const data = await res.json()
    if (data && data.length > 0) {
      const { lat, lon } = data[0]
      setPosition([parseFloat(lat), parseFloat(lon)])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // logic submit
    setShowSuccess(true)
  }

  return (
    <div className="w-full h-full ">
      {/* title for mobile */}
      <div className="fixed top-0 left-0 z-30 flex justify-between w-full px-3 py-2 text-white h-max gradient-1 md:hidden ">
        <ArrowLeftIcon
          className="w-5 h-5 cursor-pointer"
          onClick={handleBack}
        />
        <span>Pengaturan Kantor</span>
        <div className="w-4"></div>
      </div>
      {/* content */}
      <div className="flex justify-center w-full p-5 pb-20 mt-10 h-max md:mt-0 md:pb-5">
        <form
          className="md:w-[60%] h-max bg-white border border-gray-300  rounded-lg p-5 w-full space-y-2"
          onSubmit={handleSubmit}
        >
          <UncontrolledInput
            title="Nama Kantor"
            defaultValue={dataOffice.name}
          />
          <div className="flex justify-between w-full">
            <div className="w-[48%]">
              <UncontrolledInput
                title="Tipe Kantor"
                defaultValue={dataOffice.typeLoc}
              />
            </div>
            <div className="w-[48%]">
              <UncontrolledInput
                title="Radius Absen"
                defaultValue={dataOffice.radiusAbsen}
              />
            </div>
          </div>
          {/* lat long  */}
          <div className="flex justify-between w-full">
            <div className="w-[48%]">
              <UncontrolledInput
                title="Koordinat Latitude"
                defaultValue={dataOffice.latitude}
              />
            </div>
            <div className="w-[48%]">
              <UncontrolledInput
                title="Koordinat Longitude"
                defaultValue={dataOffice.longitude}
              />
            </div>
          </div>
          {/* search loc */}
          <div className="flex items-center gap-2 mb-2">
            <ControlledInput
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            >
              Cari Lokasi
            </ControlledInput>
            <div className="w-[25%]">
              <PrimaryButton type="button" onClick={handleSearch}>
                Cari
              </PrimaryButton>
            </div>
          </div>
          {/* maps */}
          <div className="w-full bg-red-300 rounded-md h-80">
            <MapContainer
              center={position} // default Surabaya
              zoom={13}
              className="z-0 w-full h-full"
              scrollWheelZoom={false} // disable zoom  scroll
              doubleClickZoom={false} // disable zoom double click
              dragging={false} //  disable swipe maps
              zoomControl={false} //  hide button +/-
              touchZoom={false} //  disable pinch zoom in mobile
              keyboard={false} //  disable zoom  with keyboard
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {position && (
                <>
                  <Marker position={position} />
                  <MapUpdater position={position} />
                </>
              )}
            </MapContainer>
          </div>
          <SecondaryButton style="py-6 mt-2" type="submit">
            Simpan Pengaturan
          </SecondaryButton>
        </form>
      </div>
      <SplashSuccess
        title="Berhasil Disimpan"
        isShowSplash={showSuccess}
        handleClose={() => setShowSuccess(false)}
      >
        Pengaturan Kantor berhasil disimpan
      </SplashSuccess>
    </div>
  )
}

MapUpdater.propTypes = {
  position: PropTypes.array,
}
