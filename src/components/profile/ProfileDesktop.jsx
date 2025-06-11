export default function ProfileDesktop() {
  return (
    <div className="items-center hidden gap-1 md:flex w-36">
      {/* photo */}
      <div className="bg-gray-300 rounded-full w-9 h-9">
        <img src="/profil-ex.jpeg" className="w-full h-full rounded-full" />
      </div>
      {/* name, division */}
      <div className="flex flex-col text-xs w-27">
        <span className="font-medium truncate ">John Doe</span>
        <span>UI/UX Designer</span>
      </div>
    </div>
  )
}
