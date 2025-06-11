import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ValidationDelete from "../../../components/splash-modal/ValidationDelete"
import FormEdit from "../../../layout/settings-child/FormEdit"
import SplashSuccess from "../../../components/splash-modal/SplashSuccess"
import { useNavigate } from "react-router-dom"

export default function ManageMembers() {
  const [openIndex, setOpenIndex] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showValidationDelete, setShowValidationDelete] = useState(false)
  const [showFormEdit, setShowFormEdit] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const navigate = useNavigate()

  const dropdownRef = useRef(null)

  const listUsers = [
    {
      name: "John Doe",
      divisi: "IT",
      position: "Mobile Developer",
      role: "Member",
      absenLoc: "Kantor",
      status: "Kontrak",
      shift: "Pagi (08.00 - 16.00)",
      schedule: "Mei",
    },
    {
      name: "John William",
      divisi: "IT",
      position: "Web Developer",
      role: "Member",
      absenLoc: "Bebas",
      status: "Freelance",
      shift: "Bebas",
      schedule: "April",
    },
    {
      name: "Patrick",
      divisi: "IT",
      position: "Data Entry",
      role: "Member",
      absenLoc: "Kantor",
      status: "Tetap",
      shift: "Pagi (08.00 - 16.00)",
      schedule: "Mei",
    },
    {
      name: "Spongebob",
      divisi: "IT",
      position: "Project Manager",
      role: "Admin",
      absenLoc: "Kantor",
      status: "Tetap",
      shift: "Pagi (08.00 - 16.00)",
      schedule: "Mei",
    },
    {
      name: "Mr. Krab",
      divisi: "IT",
      position: "Mobile Developer",
      role: "Member",
      absenLoc: "Kantor",
      status: "Tetap",
      shift: "Pagi (08.00 - 16.00)",
      schedule: "Mei",
    },
    {
      name: "Squidward",
      divisi: "Digital Marketing",
      position: "Content Creator",
      role: "Member",
      absenLoc: "Kantor",
      status: "Tetap",
      shift: "Pagi (08.00 - 16.00)",
      schedule: "Mei",
    },
    {
      name: "Ny. Puff",
      divisi: "Digital Marketing",
      position: "Video Grapher",
      role: "Member",
      absenLoc: "Kantor",
      status: "Tetap",
      shift: "Pagi (08.00 - 16.00)",
      schedule: "Mei",
    },
    {
      name: "Sandy",
      divisi: "Digital Marketing",
      position: "Project Manager",
      role: "Admin",
      absenLoc: "Kantor",
      status: "Tetap",
      shift: "Pagi (08.00 - 16.00)",
      schedule: "Mei",
    },
    {
      name: "Plankton",
      divisi: "Digital Marketing",
      position: "Graphic Designer",
      role: "Member",
      absenLoc: "Kantor",
      status: "Tetap",
      shift: "Pagi (08.00 - 16.00)",
      schedule: "Mei",
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggle = (index) => {
    if (isAnimating) return

    if (openIndex === index) {
      // Tutup dropdown
      setOpenIndex(null)
    } else {
      // Buka dropdown baru
      setOpenIndex(index)
    }
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setShowFormEdit(false)
    setShowSuccess(true)
  }

  const handleDelete = () => {
    const data = selectedUser
    console.log(data)
    // logic delete
    setShowValidationDelete(false)
  }

  return (
    <div className="flex flex-col w-full h-full gap-3 p-5 pt-20 md:pt-5">
      {/* title for mobile */}
      <div className="fixed top-0 left-0 z-30 flex justify-between w-full px-3 py-2 text-white h-max gradient-1 md:hidden ">
        <ArrowLeftIcon
          className="w-5 h-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span>Managemen Pengguna</span>
        <div className="w-4"></div>
      </div>
      {/* search bar */}
      <div className="w-full p-3 bg-white rounded-lg shadow-[2px_2px_20px_rgba(0,0,0,0.3)] h-max space-x-3 relative">
        <label className="input w-[50%]">
          <MagnifyingGlassIcon className="w-5 h-5" />
          <input type="search" required placeholder="Search" />
        </label>
        <button
          type="button"
          className="text-sm btn bg-[#0057d6]/90 text-white hover:bg-[#0057d6] transition-colors duration-200 px-6 rounded-lg"
        >
          Cari
        </button>
        <div className="absolute left-0 font-bold text-white -bottom-10 md:text-black">
          Total {listUsers.length} users...
        </div>
      </div>

      {/* list users */}
      <div className="flex flex-col w-full gap-3 pb-20 mt-13 h-max">
        <div className="flex flex-wrap justify-center lg:gap-x-15 md:gap-x-5 gap-y-4">
          {listUsers.map((user, index) => (
            <div
              className="h-40 bg-white md:rounded-xl rounded-3xl shadow-[2px_2px_10px_rgba(0,0,0,.5)] md:w-80 w-[90%] relative flex flex-col p-4 gap-3"
              key={index}
            >
              <h3 className="text-lg font-bold">{user.name}</h3>
              <div className="flex flex-col">
                <span>
                  <span className="font-semibold">Divisi</span> : {user.divisi}
                </span>
                <span>
                  <span className="font-semibold">Posisi</span> :{" "}
                  {user.position}
                </span>
                <span>
                  <span className="font-semibold">Role</span> : {user.role}
                </span>
              </div>

              <div ref={dropdownRef}>
                <EllipsisVerticalIcon
                  className="absolute w-6 h-6 text-black cursor-pointer stroke-2 md:right-2 md:top-3 top-4 right-3"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggle(index)
                  }}
                />

                <AnimatePresence
                  onExitComplete={() => {
                    setIsAnimating(false)
                  }}
                >
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onAnimationStart={() => setIsAnimating(true)}
                      className="absolute z-10 text-sm bg-white border rounded-md shadow-lg right-3 top-10 w-28"
                    >
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-t-md"
                        type="button"
                        onClick={() => {
                          setSelectedUser(user)
                          setShowFormEdit(true)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 rounded-b-md"
                        type="button"
                        onClick={() => {
                          setSelectedUser(user)
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
      <ValidationDelete
        isShow={showValidationDelete}
        title="Apakah Anda Yakin?"
        isContent="users"
        handleCancel={() => setShowValidationDelete(false)}
        handleDelete={handleDelete}
      >
        {selectedUser && (
          <div className="flex flex-col w-full gap-1 text-sm">
            <span>Nama : {selectedUser.name}</span>
            <span>Divisi : {selectedUser.divisi}</span>
            <span>Posisi : {selectedUser.position}</span>
          </div>
        )}
      </ValidationDelete>
      <FormEdit
        isShow={showFormEdit}
        data={selectedUser}
        handleCancel={() => setShowFormEdit(false)}
        handleEdit={handleEdit}
      />
      <SplashSuccess
        isShowSplash={showSuccess}
        title="Berhasil Disimpan"
        handleClose={() => setShowSuccess(false)}
      >
        {selectedUser && (
          <div>
            Data Member <span className="font-bold">{selectedUser.name}</span>{" "}
            Berhasil Diperbarui
          </div>
        )}
      </SplashSuccess>
    </div>
  )
}
