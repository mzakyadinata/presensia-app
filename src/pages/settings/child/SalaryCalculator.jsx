import { useState, useRef } from "react"
import SecondaryButton from "../../../components/button/SecondaryButton"
import {
  CurrencyDollarIcon,
  MinusIcon,
  PencilSquareIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline"
import CalculatorResult from "../../../layout/settings-child/CalculatorResult"
import { useNavigate } from "react-router-dom"

// Fungsi untuk format angka ke ribuan (Rp. format)
function formatRupiah(value) {
  const numberString = value.replace(/\D/g, "")
  if (numberString.length > 0 && numberString.startsWith("0")) return ""
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default function SalaryCalculator() {
  // data default cost
  const defaultListCost = [
    {
      name: "base-salary",
      title: "Gaji Pokok",
      placeholder: "Masukkan Jumlah Gaji",
    },
    {
      name: "cut-of-fee",
      title: "Potongan Gaji",
      placeholder: "Masukkan Jumlah",
    },
    {
      name: "intensive-bonus",
      title: "Bonus Intensif",
      placeholder: "Masukkan Jumlah",
    },
  ]
  // for data othercost
  const [negativeCosts, setNegativeCosts] = useState([
    {
      id: 1,
      name: "other-cost-1",
      title: "Pengeluaran Lainnya 1",
      rawValue: "",
      displayValue: "",
    },
  ]) // state
  const [dataForm, setDataForm] = useState({})
  const [costCounter, setCostCounter] = useState(2)
  const [showResults, setShowResults] = useState(false)
  const inputRefs = useRef({})
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const focusInput = (id) => {
    const input = inputRefs.current[id]
    if (input) {
      input.focus()
      input.select()
    }
  }

  // add other cost
  const handleAddNegativeCost = () => {
    setNegativeCosts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: `other-cost-${costCounter}`,
        title: `Pengeluaran Lainnya ${costCounter}`,
        rawValue: "",
        displayValue: "",
      },
    ])
    setCostCounter((prev) => prev + 1)
  }

  // del other cost
  const handleRemoveNegativeCost = (id) => {
    setNegativeCosts((prev) => prev.filter((item) => item.id !== id))
  }

  // change other cost
  const handleChangeNegativeCost = (id, input) => {
    const raw = input.replace(/\D/g, "")
    const display = formatRupiah(raw)
    setNegativeCosts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, rawValue: raw, displayValue: display }
          : item
      )
    )
  }

  // submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const values = Object.fromEntries(data.entries())

    // Inject label dari setiap other cost
    negativeCosts.forEach((item) => {
      values[`${item.name}-label`] = item.title
    })

    setDataForm(values)
    setShowResults(true)
  }

  // handle keydown for title other cost
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      e.target.blur()
    }
  }

  return (
    <div className="absolute top-0 bottom-0 left-0 flex justify-between w-full h-screen overflow-x-hidden ">
      {/* title for mobile */}
      <div className="fixed top-0 left-0 z-30 flex justify-between w-full px-3 py-2 text-white h-max gradient-1 md:hidden ">
        <ArrowLeftIcon
          className="w-5 h-5 cursor-pointer"
          onClick={handleBack}
        />
        <span>Kalkulator Gaji</span>
        <div className="w-4"></div>
      </div>
      {/* Left side */}
      <div className="md:w-[50%] w-full h-full overflow-auto flex justify-center p-5 md:py-5 py-20">
        <form
          className="bg-white md:w-[90%] w-full rounded-md md:border md:border-gray-500 md:shadow-none  shadow-2xl flex flex-col items-center py-5 gap-2 h-max"
          onSubmit={handleSubmit}
        >
          {/* static cost fields */}
          {defaultListCost.map((item, index) => (
            <div className="w-[90%]" key={index}>
              <fieldset className="w-full fieldset">
                <label className="text-gray-500">{item.title}</label>
                <div className="flex items-center w-full gap-2 input input-bordered validator">
                  <span className="text-black whitespace-nowrap">Rp.</span>
                  <input
                    type="tel"
                    name={item.name}
                    required
                    inputMode="numeric"
                    minLength={4}
                    maxLength={undefined}
                    className="w-full placeholder:text-gray-500"
                    placeholder={item.placeholder}
                    onInput={(e) => {
                      e.target.value = formatRupiah(e.target.value)
                    }}
                  />
                </div>
              </fieldset>
            </div>
          ))}

          {/* tax pph */}
          <div className="w-[90%]">
            <fieldset className="w-full fieldset">
              <label className="text-sm text-gray-500">Pajak (PPH 21)</label>
              <div className="flex items-center w-full gap-2 input input-bordered validator">
                <input
                  type="tel"
                  required
                  className=" placeholder:text-gray-500"
                  name="tax"
                  placeholder="0"
                  minLength={1}
                  maxLength={2}
                  pattern="[0-9]*"
                  max={99}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "")
                  }}
                />
                <span className="font-bold">%</span>
              </div>
            </fieldset>
          </div>

          {/* dynamic other negative costs */}
          {negativeCosts.map((item) => (
            <div key={item.id} className="w-[90%] flex relative">
              <div className="w-[100%]">
                <fieldset className="w-full fieldset">
                  <div className="flex items-center w-full gap-1 ">
                    <PencilSquareIcon
                      className="w-4 h-4 text-black cursor-pointer"
                      onClick={() => focusInput(item.id)}
                    />
                    <input
                      ref={(el) => (inputRefs.current[item.id] = el)}
                      className="w-full pl-1 text-gray-500"
                      onKeyDown={handleKeyDown}
                      value={item.title}
                      onChange={(e) => {
                        const newTitle = e.target.value
                        setNegativeCosts((prev) =>
                          prev.map((cost) =>
                            cost.id === item.id
                              ? { ...cost, title: newTitle }
                              : cost
                          )
                        )
                      }}
                      onFocus={(e) => {
                        setTimeout(() => {
                          e.target.select()
                        }, 0)
                      }}
                    />
                  </div>
                  <div className="flex items-center w-[90%] gap-2 input input-bordered validator">
                    <span className="text-black whitespace-nowrap">Rp.</span>
                    <input
                      type="tel"
                      required
                      name={item.name}
                      inputMode="numeric"
                      minLength={4}
                      maxLength={undefined}
                      className="w-full placeholder:text-gray-500"
                      placeholder={item.placeholder}
                      onInput={(e) => {
                        e.target.value = formatRupiah(e.target.value)
                      }}
                      value={item.displayValue}
                      onChange={(e) =>
                        handleChangeNegativeCost(item.id, e.target.value)
                      }
                    />
                  </div>
                </fieldset>
              </div>

              <div
                className="absolute right-0 p-1 rounded-md cursor-pointer bottom-3 hover:bg-gray-500/30"
                onClick={() => handleRemoveNegativeCost(item.id)}
              >
                <MinusIcon className="w-5 h-5 stroke-2" />
              </div>
            </div>
          ))}

          {/* button add other cost */}
          <button
            type="button"
            className="w-[90%] border border-[#0057D6] rounded-lg text-sm p-3 text-[#0057D6] cursor-pointer"
            onClick={handleAddNegativeCost}
          >
            Tambah Pengeluaran
          </button>

          {/* Submit Button */}
          <div className="w-[90%]">
            <SecondaryButton type="submit" style="py-6">
              <div className="flex items-center text-white">
                <CurrencyDollarIcon className="w-5 h-5" />
                Hitung Gaji Bersih
              </div>
            </SecondaryButton>
          </div>
        </form>
      </div>

      {/* Right side */}
      <div
        className={`md:w-[50%] md:static absolute w-full bg-white border-l h-full overflow-auto px-5 pb-20 ${
          showResults ? "block" : "hidden"
        }`}
      >
        <CalculatorResult
          data={dataForm}
          negativeCosts={negativeCosts}
          handleClose={() => setShowResults(false)}
        />
      </div>
    </div>
  )
}
