import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import ControlledInput from "../../components/element/ControlledInput"
import UncontrolledInput from "../../components/element/UncontrolledInput"
import SecondaryButton from "../../components/button/SecondaryButton"
import PropTypes from "prop-types"
import PrimaryButton from "../../components/button/PrimaryButton"

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

export default function FormClientVisit({
  data,
  handleSubmit,
  isAdmin,
  handleAcceptRequest,
  handleRejectRequest,
}) {
  const [search, setSearch] = useState("")
  const [position, setPosition] = useState(null)
  const [mapsSearch, setMapSearch] = useState(true)

  useEffect(() => {
    if (data?.form?.location) {
      setPosition(data.form.location)
      setMapSearch(true)
    } else {
      setMapSearch(false)
      setPosition(null)
    }
  }, [data])

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

  return (
    <form
      className="w-full p-5 space-y-2 bg-white border border-gray-300 rounded-md h-max"
      onSubmit={isAdmin ? handleAcceptRequest : handleSubmit}
    >
      <UncontrolledInput
        title="Keperluan Kunjungan"
        type="text"
        defaultValue={data?.form?.visitingReason}
        disabled={data && true}
      >
        Keperluan
      </UncontrolledInput>
      <UncontrolledInput
        title="Nama Klien"
        type="text"
        defaultValue={data?.form?.clientName}
        disabled={data && true}
      >
        Nama Klien
      </UncontrolledInput>
      {/* maps */}
      <div className="w-full text-sm h-max">
        {mapsSearch || data?.form?.location ? (
          <>
            <span className="block mb-1 text-gray-500">Pilih Lokasi</span>
            <div className="flex items-center gap-2 mb-2">
              <ControlledInput
                onChange={(e) => setSearch(e.target.value)}
                value={data ? data.form.locName : search}
                disabled={data && true}
              >
                Cari Lokasi
              </ControlledInput>
              <div className="w-[25%]">
                <PrimaryButton type="button" onClick={handleSearch}>
                  Cari
                </PrimaryButton>
              </div>
            </div>

            <div className="w-full overflow-hidden rounded-md h-80">
              <MapContainer
                center={position || [-7.2495, 112.7361]} // default Surabaya
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
                {(position || data?.form?.location) && (
                  <>
                    <Marker position={position} />
                    <MapUpdater position={position} />
                  </>
                )}
              </MapContainer>
            </div>
          </>
        ) : (
          <>
            <UncontrolledInput
              title="Alamat"
              type="text"
              defaultValue={data ? data.form.locAddress : undefined}
              disabled={data !== null}
            >
              Masukkan Alamat Lengkap
            </UncontrolledInput>
            <UncontrolledInput
              title="Nama Lokasi"
              type="text"
              defaultValue={data ? data.form.locName : undefined}
              disabled={data !== null}
            >
              Masukkan Nama Lokasi
            </UncontrolledInput>
          </>
        )}
      </div>

      {!data && (
        <>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <hr className="w-[40%]" />
            <span>Atau</span>
            <hr className="w-[40%]" />
          </div>

          <button
            onClick={() => setMapSearch(!mapsSearch)}
            className="w-full py-6 text-center bg-gray-500/30 btn "
            type="button"
          >
            {mapsSearch ? "Masukkan Alamat Manual" : "Pilih Lokasi"}
          </button>
        </>
      )}
      {(!data || (data && isAdmin && data.status == "Menunggu")) && (
        <>
          {isAdmin && (
            <PrimaryButton style="py-6 mt-10" type="submit">
              Setujui
            </PrimaryButton>
          )}
          <SecondaryButton
            type={`${isAdmin ? "button" : "submit"}`}
            style={`py-6 ${!isAdmin && "mt-10"}`}
            onClick={isAdmin && handleRejectRequest}
          >
            {isAdmin ? "Tolak" : "Submit"}
          </SecondaryButton>
        </>
      )}
    </form>
  )
}

MapUpdater.propTypes = {
  position: PropTypes.array,
}

FormClientVisit.propTypes = {
  data: PropTypes.object,
  handleSubmit: PropTypes.func,
  isAdmin: PropTypes.bool,
  handleAcceptRequest: PropTypes.func,
  handleRejectRequest: PropTypes.func,
}
