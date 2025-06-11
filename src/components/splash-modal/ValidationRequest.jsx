import PropTypes from "prop-types"
import PrimaryButton from "../button/PrimaryButton"
import { XMarkIcon } from "@heroicons/react/24/outline"
import UncontrolledInput from "../element/UncontrolledInput"

export default function ValidationRequest({
  isShow,
  onContinue,
  onCancel,
  handleClose,
  title,
  confirm,
  cancel,
  isAdminReject,
}) {
  return (
    <div
      className={`fixed z-50 top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center  ${
        isShow ? "block" : "hidden"
      }`}
    >
      <div className="relative p-10 space-y-5 bg-white rounded-lg w-max h-max">
        {handleClose && (
          <XMarkIcon
            className="absolute w-6 h-6 text-black cursor-pointer top-3 right-3"
            onClick={handleClose}
          />
        )}
        <h1 className="text-3xl font-semibold">{title}</h1>
        <form onSubmit={isAdminReject && onContinue}>
          {/* reason reject admin */}
          {isAdminReject && (
            <UncontrolledInput
              type="text"
              isDescription={true}
              title="Alasan Penolakan "
            >
              Beri Alasan Penolakan
            </UncontrolledInput>
          )}
          {/* button */}
          <div className="flex flex-col w-full gap-2">
            <PrimaryButton
              type={`${isAdminReject ? "submit" : "button"}`}
              onClick={!isAdminReject && onContinue}
            >
              {confirm}
            </PrimaryButton>
            <PrimaryButton
              type="button"
              bgStyle="bg-white text-black"
              style="border border-[#1D61E7]"
              onClick={onCancel}
            >
              {cancel}
              {/* {isOption ? "Rekening Baru" : "Batal"} */}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}

ValidationRequest.propTypes = {
  isShow: PropTypes.bool,
  onContinue: PropTypes.func,
  onCancel: PropTypes.func,
  handleClose: PropTypes.func,
  title: PropTypes.any,
  confirm: PropTypes.string,
  cancel: PropTypes.string,
  isAdminReject: PropTypes.bool,
}
