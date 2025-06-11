import TemplateLoginRegister from "../layout/form-login-register/TemplateLoginRegister"
import TemplateOnboarding from "../layout/onboarding/TemplateOnboarding"
import { useState, useEffect } from "react"
import SplashSuccess from "../components/splash-modal/SplashSuccess"
import JoiningGroup from "../components/splash-modal/JoiningGroup"
import { useSearchParams } from "react-router-dom"

const Onboarding = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [typeContent, setTypeContent] = useState("default")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showJoiningGroup, setShowJoiningGroup] = useState(false)
  const [codeInvitation, setCodeInvitation] = useState("")

  useEffect(() => {
    const step = searchParams.get("step")
    if (step == "create-organization") setTypeContent("create-organization")
    if (step == "join-organization") setTypeContent("join-organization")
  }, [searchParams])

  useEffect(() => {
    if (typeContent == "create-organization") {
      setSearchParams({ step: "create-organization" }, { replace: true })
    } else if (typeContent == "join-organization") {
      setSearchParams({ step: "join-organization" }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }, [typeContent])

  const handleSwitchContent = (type) => {
    setTypeContent(type)
  }

  const handleDataCodeInvitation = (e) => {
    const code = e.target.value
    setCodeInvitation(code)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (typeContent == "join-organization" && showJoiningGroup == false) {
      setShowJoiningGroup(true)
    } else {
      setShowSuccess(true)
      setShowJoiningGroup(false)
    }
    console.log("oke bisa submit")
  }

  return (
    <div className="flex flex-col-reverse items-center w-full h-screen mb-50 lg:flex-row border-box lg:mb-0">
      {/* Button & form Onboarding  */}
      <div className=" lg:w-[40%] w-[100%] lg:h-full h-[40%] flex flex-col gap-5  justify-center items-center  relative bottom-0 md:p-0 p-10 fade-right ">
        {/* show in desktop, hidden in mobile */}
        {typeContent == "default" ? (
          <span className="text-center w-[80%] text-sm lg:block hidden">
            Silahkan Daftarkan Organisasi Anda atau Bergabung dengan Organisasi
            yang Sudah Terdaftar{" "}
          </span>
        ) : typeContent == "join" ? (
          <span className="text-center w-[80%] text-sm lg:block hidden fade-right">
            Silahkan Masukkan Kode Undangan Organisasi Kamu{" "}
          </span>
        ) : (
          <span className="text-center w-[80%] text-sm lg:block hidden fade-right">
            Silahkan Masukkan Data-Data Organisasi Kamu{" "}
          </span>
        )}

        <TemplateOnboarding
          type={typeContent}
          handleContent={(e) => handleSwitchContent(e)}
          onSubmit={handleSubmit}
          onChange={(e) => handleDataCodeInvitation(e)}
        />
      </div>

      {/* template */}
      <TemplateLoginRegister
        isPage={
          typeContent == "default"
            ? "onboarding"
            : typeContent == "join"
            ? "join-organization"
            : "new-organization"
        }
      >
        <div className="flex flex-col gap-3">
          {typeContent == "default" ? (
            <>
              <span>Selamat Datang di Presensia </span>
              <span>
                Silahkan Daftarkan Organisasi Anda atau Bergabung dengan
                Organisasi yang Sudah Terdaftar{" "}
              </span>
            </>
          ) : typeContent == "join" ? (
            <>
              <span>Silahkan Masukkan Kode Undangan Organisasi Kamu </span>
            </>
          ) : (
            <>
              <span>Silahkan Masukkan Data-Data Organisasi Kamu </span>
            </>
          )}
        </div>
      </TemplateLoginRegister>
      {codeInvitation != "" ? (
        // splash after join group
        <SplashSuccess
          isOnboarding={true}
          isShowSplash={showSuccess}
          title="Berhasil Gabung"
        >
          Kamu berhasil bergabung ke organisasi
        </SplashSuccess>
      ) : (
        // splash after create group
        <SplashSuccess
          isOnboarding={true}
          isShowSplash={showSuccess}
          title="Berhasil Daftar"
        >
          Kamu berhasil mendaftarkan organisasi
        </SplashSuccess>
      )}
      <JoiningGroup isShow={showJoiningGroup} onSubmit={handleSubmit} />
    </div>
  )
}

export default Onboarding
