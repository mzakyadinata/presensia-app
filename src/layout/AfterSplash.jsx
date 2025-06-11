import AfterSplashContent from "../components/afterSplash/AfterSplashContent"
import { useState } from "react"
import ButtonAfterSplash from "../components/afterSplash/ButtonAfterSplash"
export default function AfterSplash() {
  const onboardingList = [
    {
      title: " Kelola Kehadiran Dengan Mudah",
      caption:
        "Pantau kehadiran karyawan secara real-time, di mana saja dan kapan saja.Presensia memudahkan Anda mengelola presensi dengan fitur lokasi personal dan aturan yang fleksibel.",
      imgPath: "/img-note.png",
    },
    {
      title: "Tingkatkan Produktivitas Tim",
      caption:
        "Atur tugas dan proyek dengan efisien. Kolaborasi dalam grup menjadi lebih lancar dengan fitur diskusi dan berbagi file yang terintegrasi.",
      imgPath: "/img-team.png",
    },
    {
      title: " Pantau Kinerja dengan Analitik Cerdas",
      caption:
        "Dapatkan laporan presensi dan progres tugas secara otomatis. Leaderboard karyawan membantu Anda memantau dan meningkatkan kinerja tim.",
      imgPath: "/img-leaderboard.png",
    },
  ]
  const [data] = useState(onboardingList)
  const [indexContent, setIndexContent] = useState(0)
  const next = () => {
    setIndexContent((prev) => (prev < 2 ? prev + 1 : prev))
  }
  const back = () => {
    setIndexContent((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const translateXContent = -680 * indexContent
  console.log(data.length)

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden animate-fadeIn p-15">
      {/* list onboarding */}
      <div className=" md:w-[50vw] w-[90vw] h-full relative overflow-hidden ">
        <div
          className={`flex flex-row  items-center justify-start absolute transition-transform duration-500`}
          style={{ transform: `translateX(${translateXContent}px)` }}
        >
          {data.map((item, index) => (
            <div key={index} className="w-[680px]">
              <AfterSplashContent
                title={item.title}
                caption={item.caption}
                imgPath={item.imgPath}
              />
            </div>
          ))}
        </div>
      </div>

      {/* button next and prev */}
      {/* button prev */}
      <div className="md:w-[65vw] w-[80vw] transition animate-slideUp flex items-center justify-between gap-[10vw] box-border relative">
        <ButtonAfterSplash
          label="Kembali"
          onClick={back}
          style={`${indexContent === 0 ? "opacity-0" : "opacity-100"}`}
        />
        {/* dots progress */}
        <div className="flex gap-[2vw] ">
          {data.map((_, index) => (
            <div
              key={index}
              className={`w-[2vh] h-[2vh] rounded-full transition-all duration-400  ${
                indexContent == index ? "bg-gray-500" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
        {/* button next */}
        {indexContent == 2 ? (
          <ButtonAfterSplash label="Login ->" onClick="login" />
        ) : (
          <ButtonAfterSplash label="Selanjutnya" onClick={next} />
        )}
      </div>
    </div>
  )
}
