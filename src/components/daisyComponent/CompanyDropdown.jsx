import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

export default function CompanyDropdown() {
  const companies = [
    "PT. Otak Kanan - Surabaya",
    "PT. Kiri Hebat - Jakarta",
    "PT. Tengah Inovatif - Bandung",
  ]

  const [selectedCompany, setSelectedCompany] = useState(companies[0])
  const [open, setOpen] = useState(false)

  const handleSelect = (company) => {
    setSelectedCompany(company)
    setOpen(false)
  }

  return (
    <div className="relative z-10 flex justify-center ">
      <div
        className="flex items-center gap-2 text-sm cursor-pointer "
        onClick={() => setOpen(!open)}
      >
        {selectedCompany} <ChevronDownIcon className="w-4 h-4 " />
      </div>

      {open && (
        <div className="absolute z-0 w-[150%] h-max left-0 top-10 bg-white shadow-2xl">
          {companies.map((company, index) => (
            <div
              key={index}
              onClick={() => handleSelect(company)}
              className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black ${
                company === selectedCompany ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {company}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
