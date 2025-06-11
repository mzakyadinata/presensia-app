export default function AnalysisProfile() {
  const analysisData = [
    {
      name: "Total Data",
      color: "gradient-3",
      count: 22,
    },
    {
      name: "Performa",
      color: "gradient-2",
      count: "95%",
    },
    {
      name: "Tugas Aktif",
      color: "gradient-5",
      count: 13,
    },
    {
      name: "Absen",
      color: "gradient-6",
      count: 1,
    },
  ]
  return (
    <div className="w-full p-3 space-y-2 bg-white shadow-[3px_3px_10px_gray] md:border md:border-gray-500 md:rounded-md rounded-xl h-max md:shadow-none">
      <h2 className="font-semibold">Analisis</h2>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-3 h-max">
        {analysisData.map((item, index) => (
          <div
            className="relative flex items-center gap-5 text-black "
            key={index}
          >
            <span className={`w-4 h-4 rounded-full ${item.color}`}></span>
            <span className="text-gray-500">{item.name}</span>
            <span className="absolute right-5">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
