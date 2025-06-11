import {
  EllipsisVerticalIcon,
  ArrowLeftIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import FormEdit from "../../../layout/settings-child/FormEdit"
import ValidationDelete from "../../../components/splash-modal/ValidationDelete"
import SplashSuccess from "../../../components/splash-modal/SplashSuccess"
import ValidationRequest from "../../../components/splash-modal/ValidationRequest"

export default function ManageInvitation() {
  const [openIndex, setOpenIndex] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showValidationDelete, setShowValidationDelete] = useState(false)
  const [showFormEdit, setShowFormEdit] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedCode, setSelectedCode] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showValidation, setShowValidation] = useState(null)
  const [activeTab, setActiveTab] = useState("invitation")
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const listCodeInvitation = [
    { code: "778999", divisi: "IT", position: "Mobile Developer" },
    { code: "123999", divisi: "IT", position: "Web Developer" },
    {
      code: "901349",
      divisi: "Digital Marketing",
      position: "Content Creator",
    },
    {
      code: "901349",
      divisi: "Digital Marketing",
      position: "Content Creator",
    },
    {
      code: "901349",
      divisi: "Digital Marketing",
      position: "Content Creator",
    },
    {
      code: "901349",
      divisi: "Digital Marketing",
      position: "Content Creator",
    },
  ]

  const waitingList = [
    {
      name: "John Doe",
      divisi: "IT",
      position: "Mobile Developer",
      status: "Magang",
    },
    {
      name: "Patrick Doe",
      divisi: "IT",
      position: "Web Developer",
      status: "Tetap",
    },
    {
      name: "William Doe",
      divisi: "IT",
      position: "Dev Ops",
      status: "Freelance",
    },
    {
      name: "William Doe",
      divisi: "IT",
      position: "Dev Ops",
      status: "Freelance",
    },
    {
      name: "William Doe",
      divisi: "IT",
      position: "Dev Ops",
      status: "Freelance",
    },
  ]

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenIndex(null)
      }
    }
    window.addEventListener("resize", handleResize)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggle = (index) => {
    if (isAnimating) return
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleDelete = () => {
    console.log("delete:", selectedCode)
    setShowValidationDelete(false)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    console.log("edit:", selectedCode)
    setShowFormEdit(false)
    setShowSuccess(true)
  }

  const handleApprove = () => {
    console.log("approve:", selectedUser)
    setShowValidation(null)
  }

  const handleDecline = () => {
    console.log("decline:", selectedUser)
    setShowValidation(null)
  }

  return (
    <div className="flex flex-col w-full p-5 pt-20 pb-20 md:pb-0 h-max md:pt-5">
      {/* title for mobile */}
      <div className="fixed top-0 left-0 z-30 flex justify-between w-full px-3 py-2 text-white h-max gradient-1 md:hidden">
        <ArrowLeftIcon
          className="w-5 h-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span>Managemen Undangan</span>
        <div className="w-4"></div>
      </div>

      {/* header button */}
      <div className="flex w-full gap-0 p-3 text-sm bg-white rounded-lg md:bg-transparent h-max md:gap-2">
        <div className="w-[50%]">
          <button
            className={`md:w-max w-[90%] px-8 py-2 rounded-lg cursor-pointer  ${
              activeTab === "invitation"
                ? "bg-[#0057d6] text-white"
                : "md:bg-[#0057d6] md:text-white bg-white text-[#0057d6] border border-[#0057d6]"
            }`}
            onClick={() => setActiveTab("invitation")}
          >
            Undangan
          </button>
        </div>
        <div className="w-[50%] flex md:justify-start justify-end">
          <button
            className={`md:w-max w-[90%]  px-8 py-2 rounded-lg  cursor-pointer ${
              activeTab === "waiting"
                ? "bg-[#FC9111] text-white"
                : "bg-white text-[#0057d6] border border-[#0057d6] md:bg-[#FC9111] md:text-white md:border-0"
            }`}
            onClick={() => setActiveTab("waiting")}
          >
            Pengguna Menunggu
          </button>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col w-full h-full md:flex-row">
        {(activeTab === "invitation" || isDesktop) && (
          <div className="relative flex flex-col w-full gap-3 md:w-1/2 md:h-[calc(100vh-90px)] h-max ">
            {/* add new invitation */}
            <button
              className="md:absolute fixed md:right-5 md:bottom-15 bottom-25 right-8 z-50 aspect-square rounded-full bg-[#0057d6] text-white w-13 flex justify-center items-center cursor-pointer"
              onClick={() => setShowFormEdit(true)}
            >
              <PlusIcon className="w-6 h-6 stroke-2" />
            </button>
            <div className="flex flex-col gap-3 pt-3 pb-5 pl-3 md:h-full h-max md:overflow-auto ">
              {listCodeInvitation.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col gap-3 p-4 md:w-[90%] w-full bg-white rounded-3xl shadow-md"
                >
                  <h3 className="text-lg font-bold">{item.code}</h3>
                  <div className="flex flex-col text-sm">
                    <span>
                      <b>Divisi</b>: {item.divisi}
                    </span>
                    <span>
                      <b>Posisi</b>: {item.position}
                    </span>
                  </div>
                  <div ref={dropdownRef}>
                    <EllipsisVerticalIcon
                      className="absolute w-6 h-6 text-black cursor-pointer top-3 right-3"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggle(index)
                      }}
                    />
                    <AnimatePresence
                      onExitComplete={() => setIsAnimating(false)}
                    >
                      {openIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onAnimationStart={() => setIsAnimating(true)}
                          className="absolute z-10 bg-white border rounded-md shadow-lg right-3 top-10 w-28"
                        >
                          <button
                            className="w-full px-4 py-2 text-left text-red-500 transition-all duration-200 rounded-md cursor-pointer hover:bg-gray-100 hover:font-semibold"
                            onClick={() => {
                              setSelectedCode(item)
                              setShowValidationDelete(true)
                            }}
                          >
                            Hapus
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "waiting" || isDesktop) && (
          <div className="flex flex-col w-full gap-3 p-4 pt-3 md:pb-5 pb-25 md:overflow-auto  h-max md:w-1/2 md:h-[calc(100vh-90px)]">
            {waitingList.map((user, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-2 p-4 bg-white shadow-md rounded-2xl"
              >
                <h3 className="text-sm font-bold md:text-base">{user.name}</h3>
                <div className="flex flex-col text-sm">
                  <span>
                    <b>Divisi</b>: {user.divisi}
                  </span>
                  <span>
                    <b>Posisi</b>: {user.position}
                  </span>
                  <span>
                    <b>Status</b>: {user.status}
                  </span>
                </div>
                <div className="absolute flex justify-end gap-3 mt-2 right-4">
                  <button
                    className="flex items-center justify-center w-10 bg-green-600 rounded-full aspect-square"
                    onClick={() => {
                      setSelectedUser(user)
                      setShowValidation("Setuju")
                    }}
                  >
                    <CheckIcon className="w-5 h-5 text-white stroke-2" />
                  </button>
                  <button
                    className="flex items-center justify-center w-10 bg-red-600 rounded-full aspect-square"
                    onClick={() => {
                      setSelectedUser(user)
                      setShowValidation("Tolak")
                    }}
                  >
                    <XMarkIcon className="w-5 h-5 text-white stroke-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <ValidationDelete
        isShow={showValidationDelete}
        title="Apakah Anda Yakin?"
        isContent="code"
        handleCancel={() => setShowValidationDelete(false)}
        handleDelete={handleDelete}
      >
        {selectedCode && (
          <div className="flex flex-col w-full gap-1 text-sm">
            <span>Code: {selectedCode.code}</span>
            <span>Divisi: {selectedCode.divisi}</span>
            <span>Posisi: {selectedCode.position}</span>
          </div>
        )}
      </ValidationDelete>

      <FormEdit
        isShow={showFormEdit}
        data={selectedCode}
        handleCancel={() => setShowFormEdit(false)}
        handleEdit={handleEdit}
      />

      <SplashSuccess
        isShowSplash={showSuccess}
        title="Berhasil Ditambahkan"
        handleClose={() => setShowSuccess(false)}
      >
        Undangan Pengguna Baru Berhasil Ditambahkan Ke Daftar Undangan
      </SplashSuccess>

      <ValidationRequest
        title={
          <div className="flex flex-col items-center">
            <span>
              {showValidation === "Setuju" ? "Setujui" : "Tolak"} Pengajuan
            </span>
            <span className="text-xl">{selectedUser?.name}</span>
          </div>
        }
        isShow={!!showValidation}
        onCancel={() => setShowValidation(null)}
        onContinue={showValidation === "Setuju" ? handleApprove : handleDecline}
        confirm={`Ya, ${showValidation === "Setuju" ? "Setuju" : "Tolak"}`}
        cancel="Batal"
      />
    </div>
  )
}
