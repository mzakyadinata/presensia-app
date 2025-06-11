import UncontrolledInput from "../../../components/element/UncontrolledInput"
import InputFieldOnboarding from "../../../components/daisyComponent/InputFieldOnboarding"
import PrimaryButton from "../../../components/button/PrimaryButton"
import SplashSuccess from "../../../components/splash-modal/SplashSuccess"
import { PencilSquareIcon, ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
export default function ChangeProfile() {
  const [showSuccess, setShowSuccess] = useState(false)
  const inputImageRef = useRef()
  const navigate = useNavigate()

  const formatToInputDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/")
    return `${year}-${month}-${day}`
  }

  const dataUser = {
    image: "/profil-ex.jpeg",
    name: "John Doe",
    birthday: "27/08/2003",
    divisi: "IT",
    position: "UI/UX Designer",
    email: "johndoe@gmail.com",
    phone: "08123456789",
  }

  const handleBack = () => {
    navigate(-1)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // logic submit
    setShowSuccess(true)
  }

  return (
    <>
      <form
        className="flex flex-col items-center w-full gap-4 p-5 mt-10 md:mt-0 pb-30 h-max"
        onSubmit={handleSubmit}
      >
        {/* title for mobile */}
        <div className="fixed top-0 left-0 z-30 flex justify-between w-full px-3 py-2 text-white h-max gradient-1 md:hidden ">
          <ArrowLeftIcon
            className="w-5 h-5 cursor-pointer"
            onClick={handleBack}
          />
          <span>Ubah Profil</span>
          <div className="w-4"></div>
        </div>
        {/* ubah profil */}
        <div className="relative flex flex-col items-center gap-0 w-max ">
          <InputFieldOnboarding
            ref={inputImageRef}
            type="profil"
            profileRounded="rounded-full aspect-square border border-white w-25"
            defaultImage={dataUser.image}
          />
          <div
            className="bg-[#0BB77E] text-lg text-white font-semibold w-7 h-7 flex items-center justify-center absolute rounded-full bottom-[3vh] right-[-0.5vw] cursor-pointer"
            onClick={() => inputImageRef.current?.triggerUpload()}
          >
            <span>
              <PencilSquareIcon className="w-4 h-4 " />
            </span>
          </div>
          <span className="text-xs text-white md:text-gray-600">
            Ubah Foto{" "}
          </span>
        </div>
        {/* card */}
        <div className="md:w-[70vw] w-[85vw] h-max p-3 bg-white border border-gray-500 rounded-lg flex flex-col gap-2 items-center">
          {/* input field */}
          <UncontrolledInput
            title="Nama"
            defaultValue={dataUser.name}
            type="text"
          />
          <UncontrolledInput
            title="Email"
            type="email"
            defaultValue={dataUser.email}
          />
          <UncontrolledInput
            title="Tanggal Lahir"
            type="date"
            defaultValue={formatToInputDate(dataUser.birthday)}
          />
          <UncontrolledInput
            title="Divisi"
            value={dataUser.divisi}
            disabled={true}
          />
          <UncontrolledInput
            title="Posisi"
            value={dataUser.position}
            disabled={true}
          />
          <UncontrolledInput
            title="No. Telepon"
            defaultValue={dataUser.phone}
            type="tel"
          />
          <PrimaryButton type="submit" style="py-6">
            Simpan
          </PrimaryButton>
        </div>
      </form>
      <SplashSuccess
        isShowSplash={showSuccess}
        title="Berhasil Disimpan"
        handleClose={handleBack}
      >
        Profil anda berhasil disimpan
      </SplashSuccess>
    </>
  )
}
