import PropTypes from "prop-types"
import { useState } from "react"
import SecondaryButton from "../../components/button/SecondaryButton"
import PrimaryButton from "../../components/button/PrimaryButton"

export default function FormClaimSalary({
  isShow,
  isAdmin,
  dataAccount,
  isNewData,
  handleClose,
  handleSubmit,
  dataRequest,
  handleAcceptRequest,
  handleRejectRequest,
}) {
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [selectedType, setSelectedType] = useState(null)

  const handleSelectAccount = (e) => {
    const selectedValue = e.target.value
    const selectedData = dataAccount.find(
      (item) =>
        `${item["name-account"]}||${item["bank-Ewallet"]}-${item["no-account"]}` ===
        selectedValue
    )
    setSelectedAccount(selectedData)
  }
  const handleSelectType = (e) => {
    const selectedValue = e.target.value
    setSelectedType(selectedValue)
    console.log(selectedValue)
  }

  const listEwallet = ["Gopay", "Shopeepay", "OVO", "DANA"]
  const listBank = ["BCA", "BRI", "BNI", "Mandiri", "BNI"]

  if (isAdmin) {
    return (
      <div className="flex flex-col items-center w-full gap-2 pb-10">
        {/* profil member image */}
        <div className="flex flex-col items-center gap-2 w-max">
          <img
            src="/profil-ex.jpeg"
            className="w-20 border border-gray-300 rounded-full aspect-square"
          />
          {/* point */}
          <span className="flex gap-2 text-yellow-500 bg-white rounded-lg shadow-lg">
            <img src="/coin.png" className="w-6 aspect-square" />
            <span className="font-semibold">{dataRequest?.form?.point}</span>
            <span className="text-black">Point</span>
          </span>
        </div>
        {/* detail info */}
        <div className="flex flex-col items-center w-full gap-2 p-5 space-y-2 bg-white border border-gray-300 rounded-md h-max">
          {/* name */}
          <div className="flex flex-col w-full gap-1 ">
            <span className="text-xs text-gray-500">Nama</span>
            <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
              {dataRequest?.name}
            </div>
          </div>
          {/* position */}
          <div className="flex flex-col w-full gap-1 ">
            <span className="text-xs text-gray-500">Posisi</span>
            <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
              {dataRequest?.position}
            </div>
          </div>
          {/* date Requested */}
          <div className="flex flex-col w-full gap-1 ">
            <span className="text-xs text-gray-500">Tanggal Pengajuan</span>
            <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
              {dataRequest?.date}
            </div>
          </div>
          {/* point  */}
          <div className="flex flex-col w-full gap-1 ">
            <span className="text-xs text-gray-500">Point Diperoleh</span>
            <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
              {dataRequest?.form?.point}
            </div>
            <span className="text-xs text-red-500">1 Point = Rp.1</span>
          </div>
          {/* bank/ewallet */}
          <div className="flex flex-col w-full gap-1 ">
            <span className="text-xs text-gray-500">Bank / E-wallet</span>
            <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
              {dataRequest?.form?.bankAccount}
            </div>
          </div>
          {/* no rekening */}
          <div className="flex flex-col w-full gap-1 ">
            <span className="text-xs text-gray-500">No Rekening</span>
            <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
              {dataRequest?.form?.accountNumber}
            </div>
          </div>
          {/* name account */}
          <div className="flex flex-col w-full gap-1 ">
            <span className="text-xs text-gray-500">Nama Penerima</span>
            <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
              {dataRequest?.form?.nameAccount}
            </div>
          </div>
          {/* no phone */}
          <div className="flex flex-col w-full gap-1 ">
            <span className="text-xs text-gray-500">No Telepon</span>
            <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
              {dataRequest?.form?.phoneNumber}
            </div>
          </div>
          {/* button for status Menunggu */}
          {dataRequest?.status === "Menunggu" && (
            <div className="w-full space-y-2">
              <PrimaryButton type="button" onClick={handleAcceptRequest}>
                Setujui
              </PrimaryButton>
              <SecondaryButton type="button" onClick={handleRejectRequest}>
                Tolak
              </SecondaryButton>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`fixed flex items-center justify-center w-full h-full left-0  top-0 bg-[rgba(0,0,0,.5)] z-50 ${
        isShow ? "block" : "hidden"
      }`}
    >
      <form
        className={`flex flex-col gap-3 p-7 bg-white rounded-t-lg md:rounded-lg w-[40vw] h-max`}
        onSubmit={handleSubmit}
      >
        {isNewData ? (
          <>
            {/* select */}
            <fieldset className="w-full fieldset">
              <legend className="">Metode Pengiriman</legend>
              <select
                defaultValue=""
                className="w-full select"
                required
                onChange={handleSelectType}
              >
                <option disabled={true} value="">
                  Pilih Metode
                </option>
                <option value="Bank">Bank</option>
                <option value="E-wallet">E-wallet</option>
              </select>
            </fieldset>
            {/* input */}
            {selectedType && (
              <>
                {/* select bank || ewallet */}
                <fieldset className="w-full fieldset">
                  <legend className="">
                    Pilih {selectedType == "Bank" ? "Bank" : "E-wallet"}
                  </legend>
                  <select defaultValue="" className="w-full select" required>
                    <option disabled={true} value="">
                      Pilih
                    </option>
                    {selectedType == "Bank"
                      ? listBank.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))
                      : listEwallet.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                  </select>
                </fieldset>
                {/* name receiver */}
                <fieldset className="fieldset">
                  <legend className="">Nama Penerima (a/n)</legend>
                  <input
                    type="text"
                    className="w-full input placeholder:text-gray-500 validator"
                    required
                    placeholder="Nama Penerima"
                  />
                </fieldset>
                {/* no rekening */}
                <fieldset className="w-full fieldset">
                  <legend className="">
                    Nomor {selectedType == "Bank" ? "Rekening" : "E-wallet"}
                  </legend>
                  <input
                    type="text"
                    className="w-full input placeholder:text-gray-500 validator"
                    required
                    pattern={selectedType == "Bank" ? "[0-9]*" : "0\\d*"}
                    minLength="8"
                    maxLength="15"
                    placeholder={
                      selectedType == "Bank" ? "No. Rekening" : "08xx-xxx-xxx"
                    }
                    title={
                      selectedType == "E-wallet"
                        ? "Nomor harus dimulai dengan 0"
                        : undefined
                    }
                  />
                </fieldset>
              </>
            )}
          </>
        ) : (
          // select account
          <>
            <select
              defaultValue=""
              className="w-full select"
              onChange={handleSelectAccount}
            >
              <option disabled={true} value="">
                Pilih Rekening
              </option>
              {dataAccount.map((item, index) => {
                const value = `${item["name-account"]}||${item["bank-Ewallet"]}-${item["no-account"]}`
                return (
                  <option key={index} value={value}>
                    {item["name-account"]} | {item["bank-Ewallet"]} -{" "}
                    {item["no-account"]}
                  </option>
                )
              })}
            </select>
            {/* show detail account */}
            {selectedAccount && (
              <>
                <div className="flex flex-col w-full gap-1 ">
                  <span className="text-xs text-gray-500">Nama Penerima</span>
                  <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
                    {selectedAccount["name-account"]}
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1 ">
                  <span className="text-xs text-gray-500">Bank / E-wallet</span>
                  <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
                    {selectedAccount["bank-Ewallet"]}
                  </div>
                </div>
                <div className="flex flex-col w-full gap-1 ">
                  <span className="text-xs text-gray-500">No Rekening</span>
                  <div className="w-full p-2 px-4 h-max rounded- border border-[#0057d6] rounded-md text-sm">
                    {selectedAccount["no-account"]}
                  </div>
                </div>
              </>
            )}
          </>
        )}
        {/* button and checkbox */}
        {(selectedAccount || isNewData) && (
          <>
            {/* checkbox */}
            <fieldset className="w-full mt-2 rounded-box">
              <label className="text-sm label">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  required
                />
                {isNewData ? "Simpan Rekening" : "Pastikan Data Sudah Benar"}
              </label>
            </fieldset>
            {/* button */}
            <div className="flex justify-end w-full gap-2 mt-3 text-sm">
              <button
                type="button"
                className="px-3 py-2 border border-[#0057d6] rounded-lg text-[#0057d6] bg-white cursor-pointer"
                onClick={handleClose}
              >
                Batalkan
              </button>
              <button
                type="submit"
                className="px-4 py-2  rounded-lg text-white bg-[#0057d6] cursor-pointer"
              >
                Klaim
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

FormClaimSalary.propTypes = {
  isShow: PropTypes.bool,
  isAdmin: PropTypes.bool,
  dataAccount: PropTypes.array,
  isNewData: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  dataRequest: PropTypes.object,
  handleAcceptRequest: PropTypes.func,
  handleRejectRequest: PropTypes.func,
}
