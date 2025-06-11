import PropTypes from "prop-types"
import InputFieldOnboarding from "../../components/daisyComponent/InputFieldOnboarding"
import InputField from "../../components/daisyComponent/InputField"
import UsernameEmailField from "../../components/daisyComponent/UsernameEmailField"
import PrimaryButton from "../../components/button/PrimaryButton"
import SecondaryButton from "../../components/button/SecondaryButton"
import { useRef } from "react"

export default function TemplateOnboarding({
  type,
  handleContent,
  onSubmit,
  onChange,
}) {
  const inputImageRef = useRef()
  return (
    <form
      onSubmit={onSubmit}
      className="w-[85%]  lg:static absolute lg:top-0 top-[-20vh]"
    >
      <fieldset
        className={`flex flex-col w-full rounded-lg  items-center validator p-5 bg-base-100  lg:top-0 top-[-5vh] shadow-xl ${
          type == "default" ? "gap-[3vh]" : "gap-[2vh] fade-right"
        } `}
      >
        {type == "default" ? (
          // content default
          <>
            <PrimaryButton
              onClick={() => handleContent("create-organization")}
              bgStyle="gradient-1 p-7 text-white"
            >
              Daftar Organisasi
            </PrimaryButton>
            <div className="flex items-center justify-between ">
              <hr className=" bg-[#333] sm:w-[40%] w-[35%]" />
              <span className="text-xs text-center">Atau </span>
              <hr className=" bg-[#333] sm:w-[5=40%] w-[35%]" />
            </div>
            <SecondaryButton
              onClick={() => handleContent("join-organization")}
              style="p-7"
            >
              Gabung Organisasi
            </SecondaryButton>
          </>
        ) : type == "join-organization" ? (
          // content join organization
          <>
            <div className="flex flex-col w-full gap-0">
              <span className="text-xs text-gray-600">Kode Undangan </span>
              <InputFieldOnboarding
                type="code-invitation"
                onChange={onChange}
              />
              <span className="text-xs text-gray-600">
                *Kode undangan didapatkan oleh admin organisasi
              </span>
            </div>
            <SecondaryButton style="mt-4 p-2  ">Gabung</SecondaryButton>
          </>
        ) : (
          // content new organization
          <>
            <div className="relative flex flex-col items-center gap-0 w-max ">
              <InputFieldOnboarding type="profil" ref={inputImageRef} />
              <div
                className="bg-[#0BB77E] text-lg text-white font-semibold w-7 h-7 flex items-center justify-center absolute rounded-full bottom-[3vh] right-[-0.8vw] cursor-pointer"
                onClick={() => inputImageRef.current?.triggerUpload()}
              >
                <span>+</span>
              </div>
              <span className="text-xs text-gray-600">Ubah Foto </span>
            </div>
            <div className="flex flex-col w-full gap-0">
              <span className="text-xs text-gray-600">Nama Organisasi </span>
              <InputFieldOnboarding type="organization" />
            </div>
            <div className="flex flex-col w-full gap-0">
              <span className="text-xs text-gray-600">Alamat</span>
              <InputFieldOnboarding type="address" />
            </div>
            <div className="flex flex-col w-full gap-0">
              <span className="text-xs text-gray-600">No. Telepon</span>
              <InputField type="tel" />
            </div>
            <div className="flex flex-col w-full gap-0">
              <span className="text-xs text-gray-600">Email Kantor</span>
              <UsernameEmailField isPage="onboarding">
                Masukkan email organisasi{" "}
              </UsernameEmailField>
            </div>

            <PrimaryButton bgStyle="gradient-1">
              Daftarkan Organisasi
            </PrimaryButton>
          </>
        )}
      </fieldset>
    </form>
  )
}

TemplateOnboarding.propTypes = {
  type: PropTypes.string,
  handleContent: PropTypes.func,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
}
