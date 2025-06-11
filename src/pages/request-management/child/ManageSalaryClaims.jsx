import { useState, useEffect } from "react"
import RequestList from "../../../components/list-content/RequestList"
import SplashSuccess from "../../../components/splash-modal/SplashSuccess"

import { useNavigate } from "react-router-dom"
import {
  ArrowLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline"
import ValidationRequest from "../../../components/splash-modal/ValidationRequest"
import FormClaimSalary from "../../../layout/form-request/FormClaimSalary"

export default function ManageSalaryClaims() {
  const [showForm, setShowForm] = useState(false)
  const [showValidation, setShowValidation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeFilter, setActiveFilter] = useState("Menunggu")
  const [selectedData, setSelectedData] = useState(null)
  const [approvalData, setApprovalData] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // <lg
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // show data
  useEffect(() => {
    console.log(selectedData)
  }, [selectedData])

  const handleBack = () => {
    if (showForm) {
      setShowForm(false)
    } else navigate(-1)
  }

  const listRequest = [
    {
      name: "John Doe",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
      position: "UI/UX Designer",
      form: {
        point: "3.000.000",
        bankAccount: "BCA",
        nameAccount: "John Doe",
        accountNumber: "7823417891",
        phoneNumber: "08123456789",
      },
    },
    {
      name: "Spongebob",
      date: "07/02/2025",
      time: "05.33",
      status: "Disetujui",
      position: "Mobile Developer",
      form: {
        point: "20.000.000",
        bankAccount: "DANA",
        nameAccount: "Spongebob Mother",
        accountNumber: "08123456789",
        phoneNumber: "08123456789",
      },
    },

    {
      name: "Mr. Krab",
      date: "08/02/2025",
      time: "06.13",
      status: "Disetujui",
      position: "Web Developer",
      form: {
        point: "4.000.000",
        bankAccount: "BRI",
        nameAccount: "Mr. Krab",
        accountNumber: "5823417891",
        phoneNumber: "08321456789",
      },
    },
    {
      name: "Squidward",
      date: "09/02/2025",
      time: "05.53",
      status: "Ditolak",
      position: "Graphic Designer",
      form: {
        point: "12.000.000",
        bankAccount: "Gopay",
        nameAccount: "Patrick Star",
        accountNumber: "089765432123",
        phoneNumber: "08123456789",
      },
    },
  ]

  const handleApproveRequest = (e) => {
    e.preventDefault()
    if (approvalData == "setuju") {
      // logic accept request
      setShowValidation(false)
      setShowSuccess(true)
    } else if (approvalData == "tolak") {
      // logic reject request
      setShowValidation(false)
      setShowSuccess(true)
    } else return
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
        <span>Pengajuan Klaim Gaji Karyawan</span>
        <div className="w-4"></div>
      </div>
      {/* left side */}
      <div
        className={`flex flex-col gap-5  p-4 overflow-auto hide-scrollbar z-10 relative h-full transition-all duration-500 ${
          showForm ? "lg:w-[45%] w-[100%]" : "w-[100%]"
        }`}
      >
        {/* title */}
        <h1 className="text-lg font-semibold w-max">
          Pengajuan Klaim Gaji Karyawan
        </h1>
        {/* button filter */}
        <div
          className={`md:w-full w-max md:bg-white/0 bg-white rounded-lg md:p-0 md:px-0 p-2 px-4 flex  text-sm transition-all duration-300 ${
            showForm ? "gap-2" : "lg:justify-between lg:gap-0 gap-2"
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
                {listRequest
                  .filter((item) => item.status == activeFilter)
                  .map((item, index) => (
                    <RequestList
                      key={index}
                      dataRequest={item}
                      isRequest=""
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
              <div className="w-[32%] space-y-3  p-2 py-4 rounded-lg ">
                {listRequest
                  .filter((item) => item.status == "Menunggu")
                  .map((item, index) => (
                    <RequestList
                      key={index}
                      dataRequest={item}
                      isRequest=""
                      onClick={() => {
                        setShowForm(true)
                        setSelectedData(item)
                      }}
                    />
                  ))}
              </div>
              <div className="w-[32%] space-y-3  p-2 py-4 rounded-lg ">
                {listRequest
                  .filter((item) => item.status == "Disetujui")
                  .map((item, index) => (
                    <RequestList
                      key={index}
                      dataRequest={item}
                      isRequest=""
                      onClick={() => {
                        setShowForm(true)
                        setSelectedData(item)
                      }}
                    />
                  ))}
              </div>
              <div className="w-[32%] space-y-3  p-2 py-4 rounded-lg ">
                {listRequest
                  .filter((item) => item.status == "Ditolak")
                  .map((item, index) => (
                    <RequestList
                      key={index}
                      dataRequest={item}
                      isRequest=""
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
      </div>
      {/* right side */}
      <div
        className={`lg:w-[50%] w-full lg:pl-5 md:pl-20 p-0 md:pt-10 pt-15 md:pb-5 pb-25 flex flex-col items-center z-0 overflow-y-auto hide-scrollbar  px-5 fixed top-0 bottom-0 right-0 border-l  gap-2 border-black/10 bg-white md:bg-[#fafafa] transition-all duration-500 ${
          showForm ? "z-20 translate-x-0" : "z-0 translate-x-full"
        }`}
      >
        <ChevronDoubleRightIcon
          className="absolute w-6 h-6 text-black cursor-pointer top-3 lg:left-3 left-20"
          onClick={() => setShowForm(false)}
        />
        {/* sini title */}
        <div
          className={`w-[90%] p-3 border-2 rounded-md flex flex-col text-sm ${
            selectedData?.status == "Disetujui"
              ? "border-green-500"
              : selectedData?.status == "Ditolak"
              ? "border-red-500"
              : selectedData?.status == "Menunggu" && "border-yellow-500"
          }`}
        >
          <h4 className="text-base font-semibold">
            Form Pengajuan {selectedData?.name}
          </h4>
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
        </div>
        <div
          className={`md:w-[90%] w-full h-full transition-all duration-500  ${
            showForm ? "translate-x-0 " : "translate-x-300 "
          } `}
        >
          <FormClaimSalary
            isAdmin={true}
            dataRequest={selectedData}
            handleAcceptRequest={(e) => {
              e.preventDefault()
              setShowValidation(true)
              setApprovalData("setuju")
            }}
            handleRejectRequest={(e) => {
              e.preventDefault()
              setShowValidation(true)
              setApprovalData("tolak")
            }}
          />
        </div>
      </div>
      <ValidationRequest
        isShow={showValidation}
        onContinue={handleApproveRequest}
        onCancel={() => setShowValidation(false)}
        title="Apakah Kamu Yakin?"
        confirm="Konfirmasi"
        cancel="Batal"
        isAdminReject={approvalData == "tolak" ? true : false}
      />
      <SplashSuccess
        isShowSplash={showSuccess}
        handleClose={() => setShowSuccess(false)}
        title={`Berhasil ${approvalData == "setuju" ? "Disetujui" : "Ditolak"}`}
      >
        Pengajuan Klaim Gaji Berhasil{" "}
        {approvalData == "setuju" ? " Disetujui!" : "Ditolak!"} Karyawan telah
        diberitahu melalui notifikasi{" "}
      </SplashSuccess>
    </div>
  )
}
