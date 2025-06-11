import PropTypes from "prop-types"

export default function UsernameEmailField({ children, isPage, onChange }) {
  return (
    <fieldset className="relative m-0 fieldset">
      {isPage == "register" && (
        <legend className="p-0 fieldset-legend">Email</legend>
      )}
      <label className="w-full rounded-lg input validator">
        {isPage === "login" || isPage === "onboarding" ? (
          <>
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
          </>
        ) : (
          <></>
        )}
        <input
          type="email"
          placeholder={children}
          required
          onChange={onChange}
        />
      </label>

      <div className="absolute right-0 hidden mr-3 validator-hint top-2">
        Enter valid email address!
      </div>
    </fieldset>
  )
}

UsernameEmailField.propTypes = {
  children: PropTypes.any,
  isPage: PropTypes.string,
  onChange: PropTypes.func,
}
