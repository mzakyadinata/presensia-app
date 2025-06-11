import { useNavigate } from "react-router-dom"
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"
import { useEffect, useState, useRef } from "react"
import ValidationDelete from "../../../components/splash-modal/ValidationDelete"
import FormEditDivisionRoles from "../../../layout/settings-child/FormEditDivisionRoles"
import SplashSuccess from "../../../components/splash-modal/SplashSuccess"

export default function DivisionRoles() {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState(null)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [showValidationDelete, setShowValidationDelete] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formMode, setFormMode] = useState("")

  const menuRefs = useRef([])
  const triggerRefs = useRef([])
  const scrollRefs = useRef([])

  const divisionRoles = [
    {
      divisi: "IT",
      position: [
        { name: "Mobile Developer", level: "Staff" },
        { name: "Web Developer", level: "Staff" },
        { name: "UI/UX Designer", level: "Staff" },
        { name: "DevOps Engineer", level: "Staff" },
        { name: "Project Manager", level: "Manager" },
        { name: "QA Engineer", level: "Staff" },
        { name: "System Analyst", level: "Staff" },
      ],
    },
    {
      divisi: "Digital Marketing",
      position: [
        { name: "Content Creator", level: "Staff" },
        { name: "Social Media Manager", level: "Manager" },
        { name: "Video Editor", level: "Staff" },
        { name: "Copywriter", level: "Staff" },
        { name: "SEO Specialist", level: "Staff" },
        { name: "Email Marketing Specialist", level: "Staff" },
        { name: "PPC Strategist", level: "Staff" },
      ],
    },
    {
      divisi: "Human Resources",
      position: [
        { name: "HR Manager", level: "Manager" },
        { name: "Recruiter", level: "Staff" },
        { name: "Training Specialist", level: "Staff" },
        { name: "Compensation Analyst", level: "Staff" },
        { name: "HR Generalist", level: "Staff" },
        { name: "Employee Relations Specialist", level: "Staff" },
        { name: "HRIS Analyst", level: "Staff" },
      ],
    },
    {
      divisi: "Finance",
      position: [
        { name: "Accountant", level: "Staff" },
        { name: "Financial Analyst", level: "Staff" },
        { name: "Auditor", level: "Staff" },
        { name: "Payroll Specialist", level: "Staff" },
        { name: "Budget Analyst", level: "Staff" },
        { name: "Tax Specialist", level: "Staff" },
        { name: "Controller", level: "Staff" },
      ],
    },
    {
      divisi: "Operations",
      position: [
        { name: "Operations Manager", level: "Manager" },
        { name: "Logistics Coordinator", level: "Staff" },
        { name: "Supply Chain Analyst", level: "Staff" },
        { name: "Inventory Manager", level: "Manager" },
        { name: "Process Improvement Analyst", level: "Staff" },
        { name: "Facilities Manager", level: "Manager" },
        { name: "Vendor Manager", level: "Manager" },
      ],
    },
    {
      divisi: "Customer Service",
      position: [
        { name: "Customer Support Representative", level: "Staff" },
        { name: "Customer Success Manager", level: "Manager" },
        { name: "Technical Support Specialist", level: "Staff" },
        { name: "Call Center Agent", level: "Staff" },
        { name: "Client Relations Specialist", level: "Staff" },
        { name: "Support Analyst", level: "Staff" },
        { name: "Helpdesk Technician", level: "Staff" },
      ],
    },
  ]

  useEffect(() => {
    if (expandedIndex !== null && scrollRefs.current[expandedIndex]) {
      scrollRefs.current[expandedIndex].scrollTop = 0
    }
  }, [expandedIndex])

  useEffect(() => {
    menuRefs.current = menuRefs.current.slice(0, divisionRoles.length)
    triggerRefs.current = triggerRefs.current.slice(0, divisionRoles.length)
  }, [divisionRoles.length])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        activeMenu !== null &&
        menuRefs.current[activeMenu] &&
        !menuRefs.current[activeMenu].contains(e.target) &&
        triggerRefs.current[activeMenu] &&
        !triggerRefs.current[activeMenu].contains(e.target)
      ) {
        setActiveMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activeMenu])

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    const data = selectedData
    // LOGIC DELETE
    console.log("data dihapus : ", data)
    setShowValidationDelete(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formMode == "add-new-divisi") {
      // logic formdata
    } else if (formMode == "edit-divisi") {
      const data = selectedData
      console.log(data)
      // logic edit data
    } else if (formMode == "add-position") {
      const data = selectedData
      console.log(data)
      // logic add position
    } else return
    setShowForm(false)
    setShowSuccess(true)
  }

  const renderItem = (item, index) => {
    const isExpanded = expandedIndex === index

    return (
      <div
        key={index}
        className="relative bg-white border border-gray-300 rounded-lg"
      >
        {/* Divisi box */}
        <div className="relative">
          <div
            className="flex items-center justify-between w-full h-10 px-4 cursor-pointer"
            onClick={() => toggleExpand(index)}
          >
            {item.divisi}
          </div>

          <EllipsisVerticalIcon
            ref={(el) => (triggerRefs.current[index] = el)}
            className="absolute w-5 h-5 cursor-pointer right-4 top-2"
            onClick={(e) => {
              e.stopPropagation()
              setActiveMenu(activeMenu == index ? null : index)
            }}
          />

          <div
            ref={(el) => (menuRefs.current[index] = el)}
            className={`absolute z-50 w-32 text-xs bg-white border border-gray-300 rounded-md shadow-lg top-10 right-2 transition-all duration-200 ${
              activeMenu === index
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }`}
          >
            {/* new position */}
            <div
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded-t-md"
              onClick={() => {
                setShowForm(true)
                setFormMode("add-position")
                setSelectedData(item)
              }}
            >
              Tambah Posisi <PlusIcon className="w-4 h-4 stroke-3" />
            </div>
            {/* edit */}
            <div
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setShowForm(true)
                setFormMode("edit-divisi")
                setSelectedData(item)
              }}
            >
              Edit
              <PencilSquareIcon className="w-4 h-4 stroke-2" />
            </div>
            {/* delete */}
            <div
              className="flex items-center justify-between p-2 text-red-500 cursor-pointer hover:bg-gray-100 rounded-b-md"
              onClick={() => {
                setShowValidationDelete(true)
                setSelectedData(item)
              }}
            >
              Hapus <TrashIcon className="w-4 h-4 stroke-2" />
            </div>
          </div>
        </div>

        {/* Expandable list of positions */}
        <div
          className={`transition-all  duration-300 ease-in-out ${
            isExpanded ? "max-h-40 border-t border-gray-400 " : "max-h-0"
          } overflow-hidden px-4`}
        >
          <div
            className="pt-2 pb-3 pr-2 space-y-2 overflow-y-auto custom-scrollbar max-h-40"
            ref={(el) => (scrollRefs.current[index] = el)}
          >
            {item.position.map((pos, i) => (
              <div key={i} className="text-sm">
                <div className="font-medium">Posisi : {pos.name}</div>
                <div className="text-xs text-gray-500">Level : {pos.level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full p-5 pb-20 h-max">
      {/* Title */}
      <div className="fixed top-0 left-0 z-30 flex justify-between w-full px-3 py-2 text-white h-max gradient-1 md:hidden ">
        <ArrowLeftIcon
          className="w-5 h-5 cursor-pointer"
          onClick={handleBack}
        />
        <span>Divisi dan Posisi</span>
        <div className="w-4"></div>
      </div>

      {/* add new divisi */}
      <button className="md:absolute fixed md:right-10 cursor-pointer md:bottom-10 bottom-25 right-8 z-50 aspect-square rounded-full bg-[#0057d6] text-white w-13 flex justify-center items-center">
        <PlusIcon
          className="w-6 h-6 stroke-2"
          onClick={() => {
            setShowForm(true)
            setFormMode("add-new-divisi")
            setSelectedData(null)
          }}
        />
      </button>

      {/* Content */}
      <div className="pb-20 mt-10 md:mt-0 h-max ">
        {/* Search */}
        <div className="w-full p-3 bg-white rounded-lg shadow-[2px_2px_20px_rgba(0,0,0,0.3)] h-max space-x-3 relative">
          <label className="input w-[50%]">
            <MagnifyingGlassIcon className="w-5 h-5" />
            <input type="search" required placeholder="Cari Divisi / Posisi" />
          </label>
          <button
            type="button"
            className="text-sm btn bg-[#0057d6]/90 text-white hover:bg-[#0057d6] transition-colors duration-200 px-6 rounded-lg"
          >
            Cari
          </button>
          <div className="absolute left-0 font-bold text-white -bottom-10 md:text-black">
            Total {divisionRoles.length} Divisi... dan{" "}
            {divisionRoles.reduce(
              (total, divisi) => total + divisi.position.length,
              0
            )}{" "}
            Posisi...
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col justify-between w-full gap-3 md:gap-0 md:flex-row mt-15">
          {/* Left side */}
          <div className="md:w-[48%] w-full flex flex-col gap-3">
            {divisionRoles
              .slice(0, Math.ceil(divisionRoles.length / 2))
              .map(renderItem)}
          </div>

          {/* Right right side */}
          <div className="md:w-[48%] w-full flex flex-col gap-3">
            {divisionRoles
              .slice(Math.ceil(divisionRoles.length / 2))
              .map((item, index) =>
                renderItem(item, index + Math.ceil(divisionRoles.length / 2))
              )}
          </div>
        </div>
      </div>
      <ValidationDelete
        isShow={showValidationDelete}
        handleCancel={() => {
          setShowValidationDelete(false)
          setSelectedData(null)
        }}
        handleDelete={handleDelete}
        title="Apakah Anda Yakin?"
      >
        <span>
          Menghapus divisi{" "}
          <span className="font-bold">
            {selectedData?.divisi} dan posisi yang ada didalamnya
          </span>
        </span>
      </ValidationDelete>
      <FormEditDivisionRoles
        isShow={showForm}
        isContent={formMode}
        handleClose={() => setShowForm(false)}
        handleSubmit={handleSubmit}
        data={selectedData}
      />
      <SplashSuccess
        isShowSplash={showSuccess}
        title={`Berhasil ${
          formMode == "edit-divisi" ? "Edit Data" : "Tambah Data"
        }  `}
        handleClose={() => setShowSuccess(false)}
      >
        Berhasil{" "}
        {formMode == "edit-divisi"
          ? "Mengedit Divisi"
          : formMode == "add-new-divisi"
          ? "Menambah Data Divisi Baru"
          : "Menambah Posisi Baru"}
      </SplashSuccess>
    </div>
  )
}
