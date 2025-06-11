import PropTypes from "prop-types"

export default function ValidationDelete({
  isShow,
  title,
  children,
  handleCancel,
  handleDelete,
  isContent,
}) {
  return (
    <div
      className={`fixed z-50 w-screen h-screen bg-[rgba(0,0,0,.7)] flex justify-center items-center top-0 left-0 ${
        isShow ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center gap-4 p-5 px-10 bg-white rounded-lg w-max h-max fade-up">
        <h1 className="text-2xl font-bold">{title}</h1>
        {children}
        <span className="font-semibold text-red-500 ">
          {isContent == "users" ? "Akan Dihapus (Dikeluarkan)" : ""}
        </span>
        {/* button */}
        <div className="flex justify-end w-full gap-2">
          <button
            className="btn rounded-lg px-5 bg-white border border-[#0057d6] text-[#0057d6] cursor pointer"
            onClick={handleCancel}
          >
            Batalkan
          </button>
          <button
            className="btn rounded-lg px-5 bg-[#0057d6] text-white cursor-pointer"
            onClick={handleDelete}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

ValidationDelete.propTypes = {
  isShow: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.string,
  handleCancel: PropTypes.func,
  handleDelete: PropTypes.func,
  isContent: PropTypes.string,
}
