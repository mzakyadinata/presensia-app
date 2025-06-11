import { useState, useEffect } from "react"
import RequestList from "../../../components/list-content/RequestList"
import SplashSuccess from "../../../components/splash-modal/SplashSuccess"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeftIcon,
  PlusIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline"
import ValidationRequest from "../../../components/splash-modal/ValidationRequest"
import FormClientVisit from "../../../layout/form-request/FormClientVisit"

export default function ClientVisits() {
  const [showForm, setShowForm] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeFilter, setActiveFilter] = useState("Menunggu")
  const [selectedData, setSelectedData] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // <lg
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleCancel = () => {
    setShowValidation(false)
  }

  const handleBack = () => {
    if (showForm) {
      setShowForm(false)
    } else navigate(-1)
  }

  const listPermission = [
    {
      name: "John Doe",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
      form: {
        visitingReason: "Membahas Proyek HJ",
        clientName: "Direktur PT Sinar Abadi",
        locAddress: "Klinik Mitra Husada",
        locName: "Jl. Ahmad Yani No.120, Gayungan, Surabaya",
      },
    },
    {
      name: "John Doe",
      date: "07/02/2025",
      time: "05.33",
      status: "Disetujui",
      form: {
        visitingReason: "Membahas Proyek WQ",
        clientName: "Direktur PT Surya Mandiri Logistik",
        location: [-7.2504, 112.7688],
        locName: "PT Surya Mandiri Logistik",
      },
    },

    {
      name: "John Doe",
      date: "08/02/2025",
      time: "06.13",
      status: "Disetujui",
      form: {
        visitingReason: "Membahas Proyek A",
        clientName: "Direktur PT Sinar Abadi",
        locAddress: "PT Surya Mandiri Logistik",
        locName: "Jl. Raya Darmo No.54, Wonokromo, Surabaya",
      },
    },
    {
      name: "John Doe",
      date: "09/02/2025",
      time: "05.53",
      status: "Ditolak",
      form: {
        visitingReason: "Membahas Proyek CA",
        clientName: "Direktur Klinik Mitra Husada",
        location: [-7.3337, 112.7247],
        locName: "Klinik Mitra Husada",
      },
    },
    {
      name: "John Doe",
      date: "09/02/2025",
      time: "05.53",
      status: "Disetujui",
      form: {
        visitingReason: "Membahas Proyek ZC",
        clientName: "Direktur PT Sinar Abadi",
        locAddress: "PT Surya Mandiri Logistik",
        locName: "Jl. Raya Darmo No.54, Wonokromo, Surabaya",
      },
    },
    {
      name: "John Doe",
      date: "09/02/2025",
      time: "05.53",
      status: "Disetujui",
      form: {
        visitingReason: "Membahas Proyek OL",
        clientName: "Direktur PT Sinar Abadi",
        location: [-7.2504, 112.7688],
        locName: "Café Kopi Langit",
      },
    },
    {
      name: "John Doe",
      date: "09/02/2025",
      time: "05.53",
      status: "Disetujui",
      form: {
        visitingReason: "Membahas Proyek NP",
        clientName: "Direktur Toko Maju Hardware",
        location: [-7.266, 112.7387],
        locName: "Toko Maju Hardware",
      },
    },
  ]

  const handleSubmit = (e) => {
    // logic submit
    e.preventDefault()
    setShowValidation(false)
    setShowSuccess(true)
  }

  return (
    <div
      className={`relative flex  w-full h-screen overflow-hidden ${
        showSuccess || showValidation ? "z-50" : "z-10"
      }`}
    >
      {/* title for mobile */}
      <div className="fixed top-0 left-0 z-30 flex justify-between w-full px-3 py-2 text-white h-max gradient-1 md:hidden ">
        <ArrowLeftIcon
          className="w-5 h-5 cursor-pointer"
          onClick={handleBack}
        />
        <span>Ajukan Izin</span>
        <div className="w-4"></div>
      </div>
      {/* left side */}
      <div
        className={`flex flex-col gap-5 p-4 overflow-y-auto hide-scrollbar z-10 relative h-full transition-all duration-500 ${
          showForm ? "lg:w-[45%] w-[100%]" : "w-[100%]"
        }`}
      >
        {/* title */}
        <h1 className="text-lg font-semibold w-max">
          Pengajuan Kunjungan Klien Anda
        </h1>
        {/* button filter */}
        <div
          className={`md:w-full flex  text-sm transition-all duration-300 md:bg-white/0 bg-white w-max md:p-0 md:px-0 p-2 px-4 rounded-lg  ${
            showForm ? "gap-2" : "lg:justify-between lg:gap-0 gap-2  "
          }`}
        >
          <span className={`${showForm ? "w-max" : "lg:w-[32%]"}`}>
            <button
              type="button"
              className={`p-2 py-1 cursor-pointer  w-max rounded-lg font-medium transition-colors duration-300 ${
                activeFilter === "Menunggu"
                  ? "bg-[#0057D6] text-white"
                  : showForm
                  ? "bg-white text-[#0057D6] border border-[#0057D6]"
                  : "bg-white text-[#0057D6] border border-[#0057D6] lg:bg-[#0057d6] lg:text-white"
              }`}
              onClick={() => setActiveFilter("Menunggu")}
            >
              Menunggu
            </button>
          </span>
          <span className={`${showForm ? "w-max" : "lg:w-[32%]"}`}>
            <button
              type="button"
              className={`p-2 py-1 cursor-pointer w-max rounded-lg font-medium ${
                activeFilter === "Disetujui"
                  ? "bg-[#0057D6] text-white"
                  : showForm
                  ? "bg-white text-[#0057D6] border border-[#0057D6]"
                  : "bg-white text-[#0057D6] border border-[#0057D6] lg:bg-[#0057d6] lg:text-white"
              }`}
              onClick={() => setActiveFilter("Disetujui")}
            >
              Disetujui
            </button>
          </span>
          <span className={`${showForm ? "w-max" : "lg:w-[32%]"}`}>
            <button
              type="button"
              className={`p-2 py-1 cursor-pointer  w-max rounded-lg font-medium ${
                activeFilter === "Ditolak"
                  ? "bg-[#0057D6] text-white"
                  : showForm
                  ? "bg-white text-[#0057D6] border border-[#0057D6]"
                  : "bg-white text-[#0057D6] border border-[#0057D6] lg:bg-[#0057d6] lg:text-white"
              }`}
              onClick={() => setActiveFilter("Ditolak")}
            >
              Ditolak
            </button>
          </span>
        </div>
        {/* list of permission */}
        <div className="flex justify-between w-full gap-2 h-max ">
          {showForm || isMobile ? (
            <>
              <div className="w-full p-2 py-4 space-y-3 rounded-lg ">
                {listPermission
                  .filter((item) => item.status == activeFilter)
                  .map((item, index) => (
                    <RequestList
                      key={index}
                      dataRequest={item}
                      isRequest="client-visit"
                      onClick={() => {
                        setShowForm(true)
                        setSelectedData(item)
                      }}
                    />
                  ))}
              </div>
            </>
          ) : (
            <>
              <div className="w-[32%] space-y-3 p-2 py-4 rounded-lg ">
                {listPermission
                  .filter((item) => item.status == "Menunggu")
                  .map((item, index) => (
                    <RequestList
                      key={index}
                      dataRequest={item}
                      isRequest="client-visit"
                      onClick={() => {
                        setShowForm(true)
                        setSelectedData(item)
                      }}
                    />
                  ))}
              </div>
              <div className="w-[32%] space-y-3 p-2 py-4 rounded-lg ">
                {listPermission
                  .filter((item) => item.status == "Disetujui")
                  .map((item, index) => (
                    <RequestList
                      key={index}
                      dataRequest={item}
                      isRequest="client-visit"
                      onClick={() => {
                        setShowForm(true)
                        setSelectedData(item)
                      }}
                    />
                  ))}
              </div>
              <div className="w-[32%] space-y-3  p-2 py-4 rounded-lg ">
                {listPermission
                  .filter((item) => item.status == "Ditolak")
                  .map((item, index) => (
                    <RequestList
                      key={index}
                      dataRequest={item}
                      isRequest="client-visit"
                      onClick={() => {
                        setShowForm(true)
                        setSelectedData(item)
                      }}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
        {/* add permission */}
        <div
          className={`w-15 h-15 hover:w-30 text-white flex items-center justify-center cursor-pointer bg-[#1D61E7] rounded-full absolute right-5 md:bottom-5 bottom-20 group  gap-2 transition-all duration-300 ${
            showForm ? "hidden" : "block"
          }`}
          onClick={() => {
            setShowForm(true)
            setSelectedData(null)
          }}
        >
          <span className="hidden text-sm group-hover:block">Tambah</span>
          <PlusIcon className="w-6 h-6 stroke-[2]" />
        </div>
      </div>
      {/* right side */}
      <div
        className={`lg:w-[50%] w-full lg:pl-5 md:pl-20 p-0 md:pt-10 pt-15 md:pb-5 pb-25 flex  z-0 overflow-y-auto hide-scrollbar fixed top-0 bottom-0 right-0 border-l  border-black/10 bg-white md:bg-[#fafafa] transition-all duration-500 md:px-0  px-5 ${
          showForm ? "z-20 translate-x-0" : "z-0 translate-x-full"
        } ${selectedData ? " flex-col items-center gap-2" : "justify-center"}`}
      >
        <ChevronDoubleRightIcon
          className="fixed w-6 h-6 text-black cursor-pointer top-3 lg:left-3 left-20"
          onClick={() => setShowForm(false)}
        />
        {selectedData && (
          <div
            className={`w-[90%] p-3 border-2 rounded-md flex flex-col text-sm ${
              selectedData?.status == "Disetujui"
                ? "border-green-500"
                : selectedData?.status == "Ditolak"
                ? "border-red-500"
                : selectedData?.status == "Menunggu" && "border-yellow-500"
            }`}
          >
            <h4 className="text-base font-semibold">Form Pengajuan Anda</h4>
            <span>
              <span className="font-semibold">Tanggal :</span>{" "}
              {selectedData?.date}
            </span>
            <span
              className={`font-semibold ${
                selectedData?.status == "Disetujui"
                  ? "text-green-500"
                  : selectedData?.status == "Ditolak"
                  ? "text-red-500"
                  : selectedData?.status == "Menunggu" && "text-yellow-500"
              }`}
            >
              <span className="font-semibold text-black">Status : </span>
              {selectedData?.status}{" "}
              {selectedData?.status == "Disetujui"
                ? "✅"
                : selectedData?.status == "Ditolak"
                ? "❌"
                : selectedData?.status == "Menunggu" && "⌛️"}
            </span>
            {selectedData?.status == "Ditolak" && (
              <span className="flex flex-col ">
                <span className="font-semibold text-black">
                  Alasan Penolakan :
                </span>
                {'"'}
                {selectedData?.adminMessage}
                {'"'}
              </span>
            )}
          </div>
        )}
        <div className={`md:w-[91%] w-full h-full mt-10}`}>
          <FormClientVisit
            data={selectedData}
            handleSubmit={(e) => {
              e.preventDefault()
              setShowValidation(true)
            }}
          />
        </div>
      </div>
      <ValidationRequest
        isShow={showValidation}
        onContinue={handleSubmit}
        onCancel={handleCancel}
        title="Apakah Kamu Yakin?"
        confirm="Konfirmasi"
        cancel="Batal"
      />
      <SplashSuccess
        isShowSplash={showSuccess}
        handleClose={() => {
          setShowSuccess(false)
        }}
        title="Pengajuan Berhasil"
      >
        Pengajuan Kunjungan Klien Anda telah berhasil dikirim. Mohon Tunggu
        Persetujuan dari Admin{" "}
      </SplashSuccess>
    </div>
  )
}
