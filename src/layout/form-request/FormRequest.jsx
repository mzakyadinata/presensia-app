import PropTypes from "prop-types"
import ToggleOnOff from "../../components/element/ToggleOnOff"
import Select from "../../components/daisyComponent/Select"
import ImageUpload from "../../components/element/ImageUpload"
import SecondaryButton from "../../components/button/SecondaryButton"
import { useState, useEffect } from "react"
import UncontrolledInput from "../../components/element/UncontrolledInput"
import ControlledInput from "../../components/element/ControlledInput"
import PrimaryButton from "../../components/button/PrimaryButton"

export default function FormRequest({
  isRequest,
  handleSubmit,
  setOneDay,
  isOneDay,
  startDateValue,
  endDateValue,
  onChangeStartDate,
  onChangeEndDate,
  currentShift,
  data,
  isAdmin,
  handleAcceptRequest,
  handleRejectRequest,
}) {
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  useEffect(() => {
    if (isOneDay) {
      setStartTime("08:00")
      setEndTime("12:00")
    } else {
      setStartTime("")
      setEndTime("")
    }
  }, [isOneDay])

  const optionOvertime = ["Kantor", "Rumah"]
  const optionPermission = ["Sakit", "Keperluan Keluarga"]
  const optionShift = ["08:00-16:00", "16:00-24:00", "24:00-08:00"]
  const optionReimburse = ["Akomodasi", "Transport", "Pembelian", "Kerusakan"]
  const optionBank = ["BCA", "BRI", "BNI", "Gopay", "DANA"]

  const formatDateForInput = (dateStr) => {
    const [day, month, year] = dateStr.split("/")
    return `${year}-${month}-${day}`
  }

  return (
    <form
      className="w-full p-5 space-y-2 bg-white border border-gray-300 rounded-md h-max "
      onSubmit={handleSubmit}
    >
      {/* reason(overtime) || type permission(permision) || date request(change-shift)*/}
      {isRequest == "overtime" || isRequest == "change-shift" ? (
        <UncontrolledInput
          type={`${isRequest == "overtime" ? "text" : "date"}`}
          title={`${
            isRequest == "overtime" ? "Alasan Lembur" : "Tanggal Pengajuan"
          }`}
          defaultValue={
            isRequest == "overtime"
              ? data?.form?.reason
              : data && formatDateForInput(data.form.date)
          }
          disabled={data && true}
        >
          {isRequest == "overtime" && "Alasan"}
        </UncontrolledInput>
      ) : isRequest == "permission" || isRequest == "reimburse" ? (
        <Select
          title={`Jenis ${isRequest == "permission" ? "Izin" : "Reimburse"}`}
          option={
            isRequest == "permission" ? optionPermission : optionReimburse
          }
          defaultValue={
            data
              ? isRequest == "permission"
                ? data.form.typePermission
                : data.form.typeReimburse
              : undefined
          }
          disabled={data && true}
        >
          Pilih Jenis {isRequest == "permission" ? "Izin" : "Reimburse"}
        </Select>
      ) : (
        <></>
      )}
      {/* toggle set */}
      {(isRequest == "overtime" || isRequest == "permission") && !data && (
        <div className="flex items-center w-full gap-5">
          <span className="text-sm text-gray-500">
            {isRequest == "overtime"
              ? "Satu Hari"
              : isRequest == "permission"
              ? "Setengah Hari"
              : ""}{" "}
            ?
          </span>
          <ToggleOnOff handleClick={setOneDay} isOn={isOneDay} />
        </div>
      )}
      {/* time for permission, or set shift for changeshift */}
      {(isRequest == "permission" || isRequest == "change-shift") && (
        <div className="flex justify-between w-full p-0">
          <div className="w-[47%]">
            {isRequest == "permission" ? (
              <ControlledInput
                type="time"
                title="Waktu Mulai"
                value={data ? data.form.timeStart : startTime}
                disabled={isOneDay || data}
                onChange={(e) => setStartTime(e.target.value)}
              />
            ) : (
              <UncontrolledInput
                type="text"
                title="Shift saat ini"
                value={data ? data.form.currentShift : currentShift}
                disabled={true}
              />
            )}
          </div>
          <div className="w-[47%]">
            {isRequest == "permission" ? (
              <ControlledInput
                type="time"
                title="Waktu Berakhir"
                value={data ? data.form.timeEnd : endTime}
                disabled={isOneDay || data}
                onChange={(e) => setEndTime(e.target.value)}
              />
            ) : (
              <Select
                option={optionShift}
                title="Shift yang diajukan"
                defaultValue={data ? data.form.shiftRequested : undefined}
                disabled={data && true}
              >
                Pilih Shift
              </Select>
            )}
          </div>
        </div>
      )}
      {/* date */}
      <div className="flex justify-between w-full p-0">
        {isRequest != "reimburse" ? (
          <>
            <div className="w-[47%]">
              {isRequest != "change-shift" ? (
                <ControlledInput
                  type="date"
                  title="Tanggal Mulai"
                  value={
                    data
                      ? formatDateForInput(data.form.dateStart)
                      : startDateValue
                  }
                  disabled={isOneDay || data}
                  onChange={onChangeStartDate}
                />
              ) : (
                <UncontrolledInput
                  type="date"
                  title="Tanggal Mulai"
                  defaultValue={
                    data ? formatDateForInput(data.form.dateStart) : undefined
                  }
                  disabled={data && true}
                />
              )}
            </div>
            <div className="w-[47%]">
              {isRequest != "change-shift" ? (
                <ControlledInput
                  type="date"
                  title="Tanggal Berakhir"
                  value={
                    data ? formatDateForInput(data.form.dateEnd) : endDateValue
                  }
                  disabled={isOneDay || data}
                  onChange={onChangeEndDate}
                />
              ) : (
                <UncontrolledInput
                  type="date"
                  title="Tanggal Berakhir"
                  defaultValue={
                    data ? formatDateForInput(data.form.dateEnd) : undefined
                  }
                  disabled={data && true}
                />
              )}
            </div>
          </>
        ) : (
          <div className="w-full">
            <UncontrolledInput
              type="date"
              title="Tanggal Berlangsung"
              defaultValue={
                data ? formatDateForInput(data.form.date) : undefined
              }
              disabled={data && true}
            />
          </div>
        )}
      </div>
      {/* select(overtime) || reason(permission) || biaya(reimburse) */}
      <div className="w-full">
        {isRequest == "overtime" ? (
          <Select
            title="Lokasi"
            option={optionOvertime}
            defaultValue={data ? data.form.location : undefined}
            disabled={data && true}
          >
            Lokasi Lembur
          </Select>
        ) : isRequest == "permission" || isRequest == "reimburse" ? (
          <UncontrolledInput
            type={isRequest == "permission" ? "text" : "tel"} // disini
            title={isRequest == "permission" ? "Alasan Izin" : "Jumlah Biaya"}
            spesification={
              isRequest == "reimburse" ? "cost-reimburse" : undefined
            }
            defaultValue={
              isRequest == "permission"
                ? data?.form?.reason
                : data?.form?.requestedReimburse
            }
            disabled={data && true}
          >
            {isRequest == "permission" ? "Alasan" : "Masukan Jumlah"}
          </UncontrolledInput>
        ) : (
          <></>
        )}
      </div>
      {/* emergency number for permission || reason for change-shift || desc for reimburse */}
      {(isRequest == "permission" ||
        isRequest == "change-shift" ||
        isRequest == "reimburse") && (
        <div className={`w-full ${isRequest == "reimburse" && "h-30"}`}>
          {isRequest == "permission" ? (
            <UncontrolledInput
              type="tel"
              title="Nomor Darurat"
              defaultValue={data?.form?.emergencyNumber}
              disabled={data && true}
            >
              xxx-xxxx-xxxx
            </UncontrolledInput>
          ) : (
            <UncontrolledInput
              type="text"
              title={
                isRequest == "reimburse" ? "Deskripsi" : "Alasan Pengajuan"
              }
              isDescription={isRequest == "reimburse" ? true : false}
              defaultValue={
                data
                  ? isRequest == "change-shift"
                    ? data.form.reason
                    : data.form.description
                  : undefined
              }
              disabled={data && true}
            >
              {isRequest == "reimburse"
                ? "Masukan Deskripsi"
                : "Masukan Alasan"}
            </UncontrolledInput>
          )}
        </div>
      )}
      {/* no rek for reimburse */}
      {isRequest == "reimburse" && (
        <div className="flex flex-col w-full h-20 gap-1 mb-5">
          <span className="text-sm text-black">Rekening Penerima :</span>
          <div className="flex justify-between w-full">
            <div className="w-[33%]">
              <Select
                option={optionBank}
                title="Bank / e-wallet"
                defaultValue={data?.form?.bank}
                disabled={data && true}
              >
                Pilih Bank
              </Select>
            </div>
            <div className="w-[63%]">
              <UncontrolledInput
                type="tel"
                title="No Rekening/Telp"
                spesification="no-bank-account"
                defaultValue={data?.form?.accountNumber}
              >
                Masukkan No. Rek
              </UncontrolledInput>
            </div>
          </div>
        </div>
      )}

      {/* upload file */}
      <fieldset className="w-full fieldset">
        <legend className="text-sm text-gray-500">Lampiran</legend>
        <span className="text-xs text-gray-400">
          Bukti Foto JPEG, JPG, PNG, File Maximal 10mb
        </span>
        <ImageUpload disabled={data && true} value={data && data.form.image} />
      </fieldset>

      <div
        className={`space-y-2  ${
          !data
            ? "block"
            : !isAdmin
            ? "hidden"
            : data?.status != "Menunggu"
            ? "hidden"
            : "block"
        }`}
      >
        {" "}
        {/* admin only */}
        <PrimaryButton
          style="py-7"
          type="button"
          onClick={data ? handleAcceptRequest : handleSubmit}
        >
          {!data ? "Submit" : data?.status == "Menunggu" && "Setujui"}
        </PrimaryButton>
        <SecondaryButton
          style="py-7"
          type="button"
          onClick={handleRejectRequest}
        >
          Tolak
        </SecondaryButton>
      </div>
    </form>
  )
}

FormRequest.propTypes = {
  isRequest: PropTypes.string,
  handleSubmit: PropTypes.func,
  setOneDay: PropTypes.func,
  isOneDay: PropTypes.bool,
  currentShift: PropTypes.string,
  startDateValue: PropTypes.string,
  endDateValue: PropTypes.string,
  onChangeStartDate: PropTypes.func,
  onChangeEndDate: PropTypes.func,
  isAdmin: PropTypes.bool,
  data: PropTypes.object,
  handleAcceptRequest: PropTypes.func,
  handleRejectRequest: PropTypes.func,
}
