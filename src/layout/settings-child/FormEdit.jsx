import PropTypes from "prop-types"

import UncontrolledInput from "../../components/element/UncontrolledInput"
import Select from "../../components/daisyComponent/Select"

export default function FormEdit({ isShow, data, handleCancel, handleEdit }) {
  const listDivisi = ["IT", "Graphic Designer", "Digital Marketing", "HR"]
  const listPosition = [
    "Mobile Developer",
    "Web Designer",
    "Web Developer",
    "Digital Marketing",
    "HR",
    "Project Manager",
    "Video Grapher",
  ]
  const listLocAbsen = ["Kantor", "Bebas"]
  const listRole = ["Admin", "Member"]
  const listStatus = ["Kontrak", "Freelance", "Magang", "Tetap"]
  const listShift = ["Pagi", "Siang", "Malam", "Bebas"]
  const listSchedule = ["Januari", "Februari", "Maret", "April", "Mei", "Juni"]

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,.7)] flex justify-center md:items-center items-end z-50 ${
        isShow ? "block" : "hidden"
      }`}
    >
      <form
        className="lg:w-[40vw] md:w-[60vw] w-full  h-max p-5  bg-white md:rounded-lg rounded-t-lg  fade-up relative flex flex-col gap-2"
        onSubmit={handleEdit}
      >
        {/* content */}
        <div className="w-full">
          <UncontrolledInput
            title="Nama"
            type="text"
            defaultValue={data ? data.name : ""}
          />
        </div>
        <div className="w-full">
          <Select
            option={listDivisi}
            defaultValue={data ? data.divisi : ""}
            title="Divisi"
          >
            Pilih
          </Select>
        </div>

        <div className="w-full ">
          <Select
            option={listPosition}
            defaultValue={data ? data.position : ""}
            title="Posisi"
          >
            Pilih
          </Select>
        </div>
        <div className="w-full">
          <Select
            option={listLocAbsen}
            defaultValue={data ? data.absenLoc : ""}
            title="Lokasi Absen"
          >
            Pilih
          </Select>
        </div>
        <div className="flex justify-between w-full ">
          <div className="w-[48%]">
            <Select
              option={listRole}
              defaultValue={data ? data.role : ""}
              title="Hak Akses"
            >
              Pilih
            </Select>
          </div>
          <div className="w-[48%]">
            <Select
              option={listStatus}
              defaultValue={data ? data.status : ""}
              title="Status"
            >
              Pilih
            </Select>
          </div>
        </div>

        <div className="flex justify-between w-full ">
          <div className="w-[48%]">
            <Select
              option={listShift}
              defaultValue={data ? data.shift : ""}
              title="Shift"
            >
              Pilih
            </Select>
          </div>
          <div className="w-[48%]">
            <Select
              option={listSchedule}
              defaultValue={data ? data.schedule : ""}
              title="Jadwal"
            >
              Pilih
            </Select>
          </div>
        </div>

        {/* button */}
        <div className="flex justify-end w-full gap-2">
          <button
            className="btn rounded-lg px-5 bg-white border border-[#0057d6] text-[#0057d6] cursor pointer"
            type="button"
            onClick={handleCancel}
          >
            Batalkan
          </button>
          <button
            className="btn rounded-lg px-5 bg-[#0057d6] text-white cursor-pointer"
            type="submit"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  )
}

FormEdit.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.object,
  handleCancel: PropTypes.func,
  handleEdit: PropTypes.func,
}
