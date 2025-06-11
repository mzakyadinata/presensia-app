import ProfileMobile from "../../../components/profile/ProfileMobile"
import ValidationRequest from "../../../components/splash-modal/ValidationRequest"
import FormClaimSalary from "../../../layout/form-request/FormClaimSalary"
import SplashSuccess from "../../../components/splash-modal/SplashSuccess"
import { useState } from "react"
import {
  ChevronRightIcon,
  CurrencyDollarIcon,
  GiftIcon,
  UserIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"

export default function SalaryClaims() {
  const [showAccountType, setShowAccountType] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isNewData, setIsNewData] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const dataAccount = [
    {
      "name-account": "John Doe",
      "bank-Ewallet": "Gopay ",
      "no-account": "081234567892",
    },
    {
      "name-account": "John Julian",
      "bank-Ewallet": "BCA ",
      "no-account": "76128547298",
    },
    {
      "name-account": "David Doe",
      "bank-Ewallet": "BRI ",
      "no-account": "922345723491278",
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // logic submit
    setShowSuccess(true)
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    setShowForm(false)
    setShowAccountType(false)
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="absolute top-0 bottom-0 left-0 w-full p-5 mt-10 md:mt-0">
      {/* title for mobile */}
      <div className="fixed top-0 left-0 z-30 flex justify-between w-full px-3 py-2 text-white h-max gradient-1 md:hidden ">
        <ArrowLeftIcon
          className="w-5 h-5 cursor-pointer"
          onClick={handleBack}
        />
        <span>Klaim Gaji</span>
        <div className="w-4"></div>
      </div>
      <div className="flex flex-col w-full gap-2 lg:gap-5 lg:flex-row ">
        {/* profile */}
        <div className="w-max">
          <ProfileMobile isSettings={true} />
        </div>
        {/* klaim path  */}
        <div className="w-[max]">
          <h3 className="text-white md:text-black ">Alur Pengambilan Gaji</h3>
          <div className="flex items-center justify-between w-full gap-4 p-5 text-sm text-white rounded-lg md:py-8 md:w-max h-max md:justify-start gradient-4">
            <span className="flex items-center gap-1">
              <CurrencyDollarIcon className="w-6 h-6" /> Poin Saya
            </span>
            <ChevronRightIcon className="w-5 h-5 " />
            <span className="flex items-center gap-1">
              <GiftIcon className="w-6 h-6" /> Klaim Gaji
            </span>
            <ChevronRightIcon className="w-5 h-5" />
            <span className="flex items-center gap-1">
              <UserIcon className="w-6 h-6" /> Konfirmasi Admin
            </span>
          </div>
        </div>
      </div>
      {/* klaim  */}
      <div className="flex items-center justify-between w-full gap-3 p-4 mt-2 bg-white rounded-lg shadow-xl md:w-max md:justify-start h-max">
        <img src="/badge.png" className="" />
        <div className="flex flex-col text-black">
          <span className="text-lg font-semibold">Klaim Gaji</span>
          <span className="text-[#0057D6] text-sm font-semibold">
            Tukar Poin dengan voucher atau rupiah.
          </span>
        </div>
        <button
          type="button"
          className="text-white rounded-lg btn gradient-2"
          onClick={() => setShowAccountType(true)}
        >
          Klaim Gaji
        </button>
      </div>

      <ValidationRequest
        isShow={showAccountType}
        handleClose={() => setShowAccountType(false)}
        title="Pilih Opsi Rekening"
        onContinue={() => {
          setShowAccountType(false)
          setShowForm(true)
          setIsNewData(false)
        }}
        onCancel={() => {
          setShowAccountType(false)
          setShowForm(true)
          setIsNewData(true)
        }}
        confirm="Rekening Yang Sudah Ada"
        cancel="Rekening Baru"
      />
      <FormClaimSalary
        isShow={showForm}
        dataAccount={dataAccount}
        isNewData={isNewData}
        handleClose={() => setShowForm(false)}
        handleSubmit={handleSubmit}
      />
      <SplashSuccess
        isShowSplash={showSuccess}
        handleClose={handleCloseSuccess}
        title="Berhasil Mengajukan"
      >
        Gaji anda berhasil diajukan kepada admin untuk ditinjau. Silahkan tunggu
        1 x24 jam
      </SplashSuccess>
    </div>
  )
}
