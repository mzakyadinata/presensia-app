import PropTypes from "prop-types"
// import { useMemo } from "react"

export default function CalculatorResult({ data, negativeCosts, handleClose }) {
  // Format ke rupiah
  const formatRupiah = (value) => {
    const number = parseInt(value || "0", 10)
    return `Rp. ${number.toLocaleString("id-ID")}`
  }

  const baseSalary = parseInt((data["base-salary"] || "0").replace(/\D/g, ""))
  const bonus = parseInt((data["intensive-bonus"] || "0").replace(/\D/g, ""))
  const cut = parseInt((data["cut-of-fee"] || "0").replace(/\D/g, ""))
  const taxPercent = parseInt(data["tax"] || "0")

  const plusCost = baseSalary + bonus
  const tax = Math.floor((plusCost * taxPercent) / 100)

  const totalOtherCosts = negativeCosts.reduce(
    (acc, curr) => acc + parseInt(curr.rawValue || "0", 10),
    0
  )

  const total = plusCost - tax - cut - totalOtherCosts

  return (
    <div className="p-4 mt-10 text-black border border-gray-500 rounded-md">
      <h2 className="mb-2 text-xl font-bold">Rincian</h2>
      <div className="flex gap-2">
        <span className="flex justify-between w-[40%]">
          <span>💰 Gaji Pokok</span>:
        </span>
        <span> {formatRupiah(baseSalary)}</span>
      </div>
      <div className="flex gap-2">
        <span className="w-[40%] flex justify-between">
          <span> ⚠️ Potongan Gaji</span>:
        </span>
        <span>{formatRupiah(cut)}</span>
      </div>
      <div className="flex gap-2">
        <span className="w-[40%] flex justify-between">
          <span>🏆 Bonus Intensif</span> :
        </span>
        <span>{formatRupiah(bonus)}</span>
      </div>
      <div className="flex gap-2">
        <span className="w-[40%] flex justify-between">
          <span>🏦 Pajak (PPH 21)</span>:
        </span>
        <span>{taxPercent}%</span>
      </div>

      {/* Dynamic other costs from edited titles */}
      {negativeCosts.map((cost) => (
        <div key={cost.id} className="flex gap-2">
          <span className="w-[40%] flex justify-between">
            <span>💳 {cost.title}</span> :
          </span>
          <span>{formatRupiah(cost.rawValue)}</span>
        </div>
      ))}

      <hr className="my-2" />

      <h3 className="mb-2 text-lg font-bold">Detail Perhitungan</h3>
      <div className="flex gap-2">
        <span className="w-[40%] flex justify-between">
          <span>Gaji + Bonus</span>:
        </span>
        <span>+ {formatRupiah(plusCost)}</span>
      </div>
      <div className="flex gap-2">
        <span className="w-[40%] flex justify-between">
          <span>Pajak (PPH 21)</span>:
        </span>
        <span> - {formatRupiah(tax)}</span>
      </div>
      <div className="flex gap-2">
        <span className="w-[40%] flex justify-between">
          <span>Pengeluaran Lainnya</span>:
        </span>
        <span>- {formatRupiah(totalOtherCosts)}</span>
      </div>
      <hr className="my-2" />
      <div className="flex gap-2 mt-2 text-xl font-bold">
        <span className="w-[40%] flex justify-between">
          <span>Hasil Bersih </span>:
        </span>
        <span>{formatRupiah(total)} ✅</span>
      </div>
      <button
        type="button"
        onClick={handleClose}
        className="w-full mt-8 btn bg-white border border-[#0057D6] text-[#0057d6] rounded-lg"
      >
        Kembali
      </button>
    </div>
  )
}

CalculatorResult.propTypes = {
  data: PropTypes.object.isRequired,
  negativeCosts: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
}
