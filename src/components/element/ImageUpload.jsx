import { useState, useEffect } from "react"
import { DocumentIcon } from "@heroicons/react/24/outline"
import PropTypes from "prop-types"

export default function ImageUpload({ disabled, value }) {
  const [preview, setPreview] = useState(null)
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (value) {
      setPreview(value)
    }
  }, [value])

  console.log("preview", preview)

  return (
    <div
      className={`flex items-center justify-center h-50 overflow-hidden  cursor-pointer w-40 rounded-2xl border ${
        preview ? "shadow" : " border-dashed"
      }`}
    >
      <label
        className="flex items-center w-full h-full cursor-pointer"
        onClick={(e) => {
          if (disabled) e.preventDefault()
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <DocumentIcon className="w-6 h-6 mx-auto text-gray-500" />
            <div className="text-center w-[60%] text-gray-500">
              <span className="text-[#156CF7]">Choose </span>File to Upload
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={disabled}
          className="hidden input validator"
          required
        />
      </label>
    </div>
  )
}

ImageUpload.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
}
