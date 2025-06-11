import PropTypes from "prop-types"

export default function AfterSplashContent({ title, caption, imgPath }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:w-[50vw] w-[90vw]   ">
      <h1 className="text-[max(2vw,5vh)] w-full text-white text-center font-montserrat max-w-xs">
        {title}
      </h1>
      <p className="text-[max(1.5vw,2vh)] text-white text-center max-w-[65vw] mt-2">
        {caption}
      </p>
      <img
        src={imgPath}
        alt="Team"
        className="w-48 h-48 object-contain mt-2 animate-slideUp"
      />
    </div>
  )
}

AfterSplashContent.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.string,
  imgPath: PropTypes.string,
}
