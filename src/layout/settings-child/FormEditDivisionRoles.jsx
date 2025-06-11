import PropTypes from "prop-types"
import UncontrolledInput from "../../components/element/UncontrolledInput"
import PrimaryButton from "../../components/button/PrimaryButton"
import Select from "../../components/daisyComponent/Select"

export default function FormEditDivisionRoles({
  isShow,
  isContent,
  handleClose,
  handleSubmit,
  data,
}) {
  const listLevel = ["Staff", "Manager", "Admin"]

  return (
    <div
      className={`w-full top-0 left-0 fixed z-50 h-full bg-[rgba(0,0,0,.7)] flex items-end md:items-center justify-center ${
        isShow ? "block" : "hidden"
      }`}
    >
      <form
        className="p-5 bg-white md:w-[50vw] w-full space-y-2 max-h-[70vh] min-h-max overflow-auto custom-scrollbar rounded-md md:rounded-b-md rounded-b-none"
        onSubmit={handleSubmit}
      >
        {/* title */}
        <div className="flex justify-center w-full mb-10">
          <h1 className="text-2xl font-bold">
            {isContent == "add-new-divisi"
              ? "Tambah Divisi Baru"
              : isContent == "edit-divisi"
              ? "Edit Divisi"
              : "Tambah Posisi"}
          </h1>
        </div>
        {isContent != "add-new-divisi" && (
          <>
            <h3 className="text-lg font-bold">Divisi : {data?.divisi}</h3>
            {isContent == "add-position" && (
              <>
                <UncontrolledInput title="Posisi Baru" type="text">
                  Tambah Posisi Baru
                </UncontrolledInput>
                <Select title="Level" option={listLevel}>
                  Pilih Level Posisi
                </Select>
              </>
            )}
            {isContent == "edit-divisi" && (
              <div>
                <UncontrolledInput
                  title="Nama Divisi"
                  type="text"
                  defaultValue={data?.divisi}
                ></UncontrolledInput>
                {data &&
                  data.position.map((position, index) => (
                    <div className="" key={index}>
                      <h5 className="font-semibold">Posisi {index + 1}</h5>
                      <div className="w-full p-3">
                        <UncontrolledInput
                          title="Posisi"
                          defaultValue={position.name}
                        />
                        <Select
                          title="Level"
                          option={listLevel}
                          defaultValue={position.level}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}

        {/* just for add new divisi */}
        {(!data || data == null) && (
          <UncontrolledInput title="Nama Divisi" type="text">
            Masukkan Nama Divisi
          </UncontrolledInput>
        )}
        {/* button */}
        <div className="flex justify-end w-full gap-2 mt-5">
          <div className="w-[25%]">
            <PrimaryButton
              bgStyle="bg-white text-[#0057d6] border border-[#0057d6]"
              type="button"
              onClick={handleClose}
            >
              Batal
            </PrimaryButton>
          </div>
          <div className="w-[25%]">
            <PrimaryButton type="submit">Simpan</PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  )
}

FormEditDivisionRoles.propTypes = {
  isShow: PropTypes.bool,
  isContent: PropTypes.string,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  data: PropTypes.object,
}
