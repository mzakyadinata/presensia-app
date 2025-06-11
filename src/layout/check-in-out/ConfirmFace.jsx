import { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { MapPinIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"
import ConfirmCheckIn from "../../components/ConfirmCheckIn"

export default function ConfirmFace({
  isShow,
  back,
  handleSubmit,
  currentDate,
  currentTime,
  address,
  isPage,
}) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [photo, setPhoto] = useState(null)
  const [stream, setStream] = useState(null)
  const [videoReady, setVideoReady] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (!isShow || photo) return // Jangan mulai kamera kalau sudah ada photo

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
        setStream(mediaStream)
      } catch (err) {
        console.error("Gagal mengakses kamera:", err)
      }
    }

    startCamera()
  }, [isShow, photo])

  useEffect(() => {
    if (stream) {
      if (photo || !isShow) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
      }
    }
  }, [photo, isShow, stream])

  const handleLoadedMetadata = () => {
    setVideoReady(true)
  }

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    canvas.width = 640
    canvas.height = 360

    const ctx = canvas.getContext("2d")
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageData = canvas.toDataURL("image/png")

    setPhoto(imageData) // simpan gambar
    setShowConfirm(true)
  }

  return (
    <div
      className={`absolute z-30 flex flex-col items-center w-screen h-screen bg-white transition-all duration-800 ${
        isShow ? "translate-x-0" : "translate-x-400"
      }`}
    >
      {/* title */}
      <div className="absolute z-10 w-full py-1 text-center text-white gradient-1">
        <ArrowLeftIcon
          className="absolute w-5 h-5 cursor-pointer left-3"
          onClick={!showConfirm ? back : () => setShowConfirm(false)}
        />
        {!showConfirm ? "Konfirmasi Wajah" : "Konfirmasi Absen Masuk"}
      </div>
      {photo ? (
        <img
          src={photo}
          alt="Captured face"
          className="fixed inset-0 z-0 object-cover w-full h-full"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          onLoadedMetadata={handleLoadedMetadata}
          className="fixed inset-0 z-0 object-cover w-full h-full"
        />
      )}

      <canvas ref={canvasRef} className="hidden w-40 h-40 bg-red-500" />

      {showConfirm ? (
        <>
          {" "}
          <ConfirmCheckIn
            currentTime={currentTime}
            currentDate={currentDate}
            address={address}
            onSubmit={handleSubmit}
            isPage={isPage}
          />
        </>
      ) : (
        <>
          <div className="absolute bottom-0 z-10 flex flex-col gap-2 items-center justify-center text-white bg-[rgba(0,0,0,.3)] md:w-100 w-full h-50 rounded-t-2xl px-3 ">
            <span className="text-2xl">{currentTime}</span>
            <span>{currentDate}</span>
            <span className="flex items-center w-full gap-1">
              <MapPinIcon className="w-6 h-6 md:w-8 md:h-8" />{" "}
              <span className="truncate">{address}</span>
            </span>
            <button
              onClick={handleCapture}
              className=" z-10 px-4 py-1 w-[80%] flex items-center gap-3 text-white bg-[#1D61E7] justify-center rounded-lg cursor-pointer "
              disabled={!videoReady}
            >
              <img src="/navbar/user-scan-solid.png" className="w-4 h-4" />
              {isPage == "check-in" ? "Check In" : "Check Out"}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

ConfirmFace.propTypes = {
  isShow: PropTypes.bool,
  back: PropTypes.func,
  handleSubmit: PropTypes.func,
  currentDate: PropTypes.string,
  currentTime: PropTypes.string,
  address: PropTypes.string,
  isPage: PropTypes.string,
}
