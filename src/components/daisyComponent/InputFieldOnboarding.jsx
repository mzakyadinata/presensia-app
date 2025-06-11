import {
  BriefcaseIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import PropTypes from "prop-types"
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react"

const InputFieldOnboarding = forwardRef(
  ({ type, onChange, profileRounded, defaultImage }, ref) => {
    const [preview, setPreview] = useState(null)
    const fileImageInputRef = useRef(null)

    useImperativeHandle(ref, () => ({
      triggerUpload: () => {
        fileImageInputRef.current?.click()
      },
    }))

    useEffect(() => {
      if (defaultImage) {
        setPreview(defaultImage)
      }
    }, [defaultImage])

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

    // for input profil
    if (type === "profil") {
      return (
        <div
          className={`flex items-center justify-center overflow-hidden bg-gray-400 shadow cursor-pointer ${
            profileRounded ? profileRounded : "rounded-3xl w-20 h-20"
          } `}
        >
          <label className="flex items-center w-full h-full cursor-pointer">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <UsersIcon className="w-10 h-10 mx-auto text-white" />
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileImageInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      )
    }

    return (
      <label className="w-full m-0 input validator">
        {type === "code-invitation" ? (
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
        ) : type === "organization" ? (
          <BriefcaseIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <MapPinIcon className="w-5 h-5 text-gray-500" />
        )}
        <input
          type="text"
          required
          inputMode={type === "code-invitation" ? "numeric" : "text"}
          placeholder={
            type === "code-invitation"
              ? "Masukkan Kode Undangan Kamu"
              : type === "organization"
              ? "Masukkan Nama Organisasi"
              : "Masukkan Alamat Organisasi"
          }
          onChange={type === "code-invitation" ? onChange : undefined}
          pattern={type === "code-invitation" ? "[0-9]*" : ". "}
        />
      </label>
    )
  }
)

InputFieldOnboarding.displayName = "InputFieldOnboarding"

InputFieldOnboarding.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  profileRounded: PropTypes.string,
  defaultImage: PropTypes.string,
}

export default InputFieldOnboarding
