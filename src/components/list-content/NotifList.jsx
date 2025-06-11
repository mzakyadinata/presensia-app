export default function NotifList() {
  return (
    <div className="flex items-center w-full md:gap-3 gap-5 md:px-3 md:py-0 px-5 py-3  bg-[rgba(102,164,255,0.1)] h-max">
      <div className="w-12 rounded-full aspect-square md:w-10 gradient-2 "></div>
      {/* description */}
      <div className="text-base md:text-sm">
        <h5 className="">Presensi Berhasil!</h5>
        <p className="text-sm leading-3 md:text-xs ">
          {" "}
          Presensi masuk Anda pada pukul 08:00 telah tercatat. Selamat bekerja!
          🎯
        </p>
      </div>
    </div>
  )
}
