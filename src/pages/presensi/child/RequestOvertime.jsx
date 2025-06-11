import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SplashSuccess from "../../../components/splash-modal/SplashSuccess"
import FormRequest from "../../../layout/form-request/FormRequest"

export default function RequestOvertime() {
  const [isOneDay, setIsOneDay] = useState(false)
  const [startDateValue, setStartDateValue] = useState("")
  const [endDateValue, setEndDateValue] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOneDay) {
      const today = new Date().toISOString().split("T")[0] // format yyyy-mm-dd
      setStartDateValue(today)
      setEndDateValue(today)
    } else {
      setStartDateValue("")
      setEndDateValue("")
    }
  }, [isOneDay])

  const setOneDay = () => {
    setIsOneDay(!isOneDay)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
  }

  const backToApp = () => {
    navigate("/app")
    setShowSuccess(false)
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div
      className={`absolute top-0 bottom-0  flex items-center justify-center w-full h-max p-0 overflow-x-hidden  hide-scrollbar ${
        showSuccess ? "z-50" : "z-10"
      }`}
    >
      {/* title */}
      <div className="fixed top-0 left-0 z-30 flex justify-between w-full px-3 py-2 text-white h-max gradient-1 md:hidden ">
        <ArrowLeftIcon
          className="w-5 h-5 cursor-pointer"
          onClick={handleBack}
        />
        <span>Ajukan Lembur</span>
        <div className="w-4"></div>
      </div>
      {/* content */}
      <div className="md:w-[60vw] w-[90vw] pt-15 md:pt-2 md:mb-0 mb-10 pb-15">
        <FormRequest
          isRequest="overtime"
          handleSubmit={handleSubmit}
          setOneDay={setOneDay}
          isOneDay={isOneDay}
          startDateValue={startDateValue}
          endDateValue={endDateValue}
          onChangeStartDate={(e) => setStartDateValue(e.target.value)}
          onChangeEndDate={(e) => setEndDateValue(e.target.value)}
        />
      </div>
      <SplashSuccess
        isShowSplash={showSuccess}
        title="Berhasil Mengajukan"
        handleClose={backToApp}
      >
        Pengajuan Lembur anda telah dikirim. Mohon tunggu persetujuan dari
        admin.
      </SplashSuccess>
      <br /> <br /> <br /> <br />
      <br /> <br /> <br /> <br /> <br /> <br />
      <br /> <br />
    </div>
  )
}
