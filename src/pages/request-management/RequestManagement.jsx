import NavbarDesktop from "../../layout/navbar/NavbarDesktop"
import NavbarMobile from "../../layout/navbar/NavbarMobile"
import { Outlet, useLocation } from "react-router-dom"
import {
  ClipboardDocumentListIcon, // izin
  ClockIcon, //lembur
  ArrowPathIcon, // ubah shift
  BanknotesIcon, // reimburse
  CurrencyDollarIcon, // klaim gaji
  ChevronRightIcon,
} from "@heroicons/react/24/solid"
import Header from "../../layout/Header"
import RequestList from "../../components/list-content/RequestList"
import { Link } from "react-router-dom"

function RequestManagement() {
  const location = useLocation()
  const isChild = location.pathname !== "/request-management"

  // for data take status "Menunggu/pending"

  const listRequestOvertime = [
    {
      name: "John Doe",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
    },
    {
      name: "William Moriarty",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
    },
  ]

  const listRequestPermission = [
    {
      name: "John Doe",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
    },
    {
      name: "William Moriarty",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
    },
  ]
  const listRequestChangeShift = [
    {
      name: "John Doe",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
      form: {
        shiftRequested: "16:00-24:00",
      },
    },
    {
      name: "William Moriarty",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
      form: {
        shiftRequested: "24:00-08:00",
      },
    },
  ]
  const listRequestReimburse = [
    {
      name: "John Doe",
      date: "06/02/2025",
      time: "05.33",
      reimburse: "Transport",
      status: "Menunggu",
    },
    {
      name: "William Moriarty",
      date: "06/02/2025",
      time: "05.33",
      reimburse: "Akomodasi",
      status: "Menunggu",
    },
  ]

  const listRequestClientVisit = [
    {
      name: "John Doe",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
    },
    {
      name: "William Moriarty",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
    },
  ]

  const listRequestSalaryClaims = [
    {
      name: "John Doe",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
    },
    {
      name: "William Moriarty",
      date: "06/02/2025",
      time: "05.33",
      status: "Menunggu",
    },
  ]

  return (
    <div className="flex w-full ">
      <NavbarDesktop />
      <NavbarMobile />
      <main className="w-full h-screen md:ml-16 md:bg-[#fafafa] relative  ">
        {/* ornament color in mobile view */}
        <div className="absolute block w-full bg-[#FA8B05] h-65 rounded-b-3xl -z-10 md:hidden">
          <div className="w-full gradient-1 h-60 rounded-b-3xl">
            {/* this div for ornament color in mobile view */}
          </div>
        </div>
        {!isChild && (
          <>
            <Header />
            {/* content */}
            <div className="w-full p-5 space-y-3 md:mt-13">
              <h1 className="text-xl font-semibold text-white md:text-black">
                Pengajuan
              </h1>
              {/* main content */}
              <div className="flex flex-wrap items-center w-full gap-3">
                {/* request overtime */}
                <div className="flex flex-col bg-white shadow-lg md:border md:border-gray-300 md:shadow-none w-140 h-max md:rounded-xl rounded-3xl">
                  {/* title */}
                  <div className="flex items-center w-full gap-5 p-3 text-lg font-medium border-b border-gray-300">
                    <div className="flex items-center justify-center rounded-full w-13 aspect-square gradient-6 ">
                      <ClockIcon className="w-6 h-6 text-white" />
                    </div>
                    <span>Pengajuan Lembur</span>
                  </div>
                  {/* list waiting */}
                  <div className="w-full">
                    {listRequestOvertime.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 md:border-gray-300/0 md:border-none"
                      >
                        <RequestList
                          dataRequest={item}
                          isRequest="permission"
                        />
                      </div>
                    ))}
                  </div>
                  {/* button see all */}
                  <Link
                    className="z-0 flex items-center w-full gap-8 p-3 text-sm text-gray-500 bg-white border-t border-gray-300 cursor-pointer"
                    to="overtime"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    Lihat Semua
                  </Link>
                </div>
                {/* request permission */}
                <div className="flex flex-col bg-white shadow-lg md:border md:border-gray-300 md:shadow-none w-140 h-max md:rounded-xl rounded-3xl">
                  {/* title */}
                  <div className="flex items-center w-full gap-5 p-3 text-lg font-medium border-b border-gray-300">
                    <div className="flex items-center justify-center rounded-full w-13 aspect-square gradient-2 ">
                      <ClipboardDocumentListIcon className="w-6 h-6 text-white" />
                    </div>
                    <span>Pengajuan Izin</span>
                  </div>
                  {/* list waiting */}
                  <div className="w-full">
                    {listRequestPermission.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 md:border-gray-300/0 md:border-none"
                      >
                        <RequestList
                          dataRequest={item}
                          isRequest="permission"
                        />
                      </div>
                    ))}
                  </div>
                  {/* button see all */}
                  <Link
                    className="z-0 flex items-center w-full gap-8 p-3 text-sm text-gray-500 bg-white border-t border-gray-300 cursor-pointer"
                    to="permission"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    Lihat Semua
                  </Link>
                </div>
                {/* request change shft */}
                <div className="flex flex-col bg-white shadow-lg md:border md:border-gray-300 md:shadow-none w-140 h-max md:rounded-xl rounded-3xl">
                  {/* title */}
                  <div className="flex items-center w-full gap-5 p-3 text-lg font-medium border-b border-gray-300">
                    <div className="flex items-center justify-center rounded-full w-13 aspect-square gradient-1 ">
                      <ArrowPathIcon className="w-6 h-6 text-white" />
                    </div>
                    <span>Pengajuan Ubah Shift</span>
                  </div>
                  {/* list waiting */}
                  <div className="w-full">
                    {listRequestChangeShift.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 md:border-gray-300/0 md:border-none"
                      >
                        <RequestList
                          dataRequest={item}
                          isRequest="change-shift"
                        />
                      </div>
                    ))}
                  </div>
                  {/* button see all */}
                  <Link
                    className="z-0 flex items-center w-full gap-8 p-3 text-sm text-gray-500 bg-white border-t border-gray-300 cursor-pointer"
                    to="change-shift"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    Lihat Semua
                  </Link>
                </div>
                {/* request reimburse */}
                <div className="flex flex-col bg-white shadow-lg md:border md:border-gray-300 md:shadow-none w-140 h-max md:rounded-xl rounded-3xl">
                  {/* title */}
                  <div className="flex items-center w-full gap-5 p-3 text-lg font-medium border-b border-gray-300">
                    <div className="flex items-center justify-center rounded-full w-13 aspect-square gradient-6 ">
                      <BanknotesIcon className="w-6 h-6 text-white" />
                    </div>
                    <span>Pengajuan Reimburse</span>
                  </div>
                  {/* list waiting */}
                  <div className="w-full">
                    {listRequestReimburse.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 md:border-gray-300/0 md:border-none"
                      >
                        <RequestList dataRequest={item} isRequest="reimburse" />
                      </div>
                    ))}
                  </div>
                  {/* button see all */}
                  <Link
                    className="z-0 flex items-center w-full gap-8 p-3 text-sm text-gray-500 bg-white border-t border-gray-300 cursor-pointer"
                    to="reimburse"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    Lihat Semua
                  </Link>
                </div>
                {/* request client visit */}
                <div className="flex flex-col bg-white shadow-lg md:border md:border-gray-300 md:shadow-none w-140 h-max md:rounded-xl rounded-3xl">
                  {/* title */}
                  <div className="flex items-center w-full gap-5 p-3 text-lg font-medium border-b border-gray-300">
                    <div className="flex items-center justify-center rounded-full w-13 aspect-square gradient-6 ">
                      <BanknotesIcon className="w-6 h-6 text-white" />
                    </div>
                    <span>Pengajuan Kunjungan Klien</span>
                  </div>
                  {/* list waiting */}
                  <div className="w-full">
                    {listRequestClientVisit.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 md:border-gray-300/0 md:border-none"
                      >
                        <RequestList dataRequest={item} isRequest="reimburse" />
                      </div>
                    ))}
                  </div>
                  {/* button see all */}
                  <Link
                    className="z-0 flex items-center w-full gap-8 p-3 text-sm text-gray-500 bg-white border-t border-gray-300 cursor-pointer"
                    to="client-visit"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    Lihat Semua
                  </Link>
                </div>
                {/* request claim salary */}
                <div className="flex flex-col bg-white shadow-lg md:border md:border-gray-300 md:shadow-none w-140 h-max md:rounded-xl rounded-3xl">
                  {/* title */}
                  <div className="flex items-center w-full gap-5 p-3 text-lg font-medium border-b border-gray-300">
                    <div className="flex items-center justify-center rounded-full w-13 aspect-square gradient-4 ">
                      <CurrencyDollarIcon className="w-6 h-6 text-white" />
                    </div>
                    <span>Pengajuan Klaim Gaji</span>
                  </div>
                  {/* list waiting */}
                  <div className="w-full">
                    {listRequestSalaryClaims.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 md:border-gray-300/0 md:border-none"
                      >
                        <RequestList
                          dataRequest={item}
                          isRequest="permission"
                        />
                      </div>
                    ))}
                  </div>
                  {/* button see all */}
                  <Link
                    className="z-0 flex items-center w-full gap-8 p-3 text-sm text-gray-500 bg-white border-t border-gray-300 cursor-pointer"
                    to="salary-claims"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    Lihat Semua
                  </Link>
                </div>
                {/*  */}
              </div>
            </div>
          </>
        )}
        <Outlet />
      </main>
    </div>
  )
}

export default RequestManagement
