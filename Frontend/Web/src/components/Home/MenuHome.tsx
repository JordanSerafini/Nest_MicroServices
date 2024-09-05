import Icon from "../SVG/Icon"

function MenuHome() {

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className=" font-Poppins px-2 flex flex-row w-9.5/10 h-full items-center gap-4 justify-center bg-white-perso rounded-full shadow-md shadow-gray-600 " >
    <div className="w-1/10">
      <Icon
        type="User_Attributes"
        theme="black"
        className="border- border-black rounded-full p-2 text-xl res-w-400:text-2xl sm:text-3xl"
      />
    </div>
    <div className="w-7.5/10 text-xs  sm:text-base resW400:text-sm  flex flex-col gap-">
      <div className="font-semibold">{user.nom} {user.prenom} - <span className="text-blue-perso">Solution Logique</span></div>
      <div className="font-extralight ">{user.role == 1 ? "administrateur" : "commercial" }</div>
    </div>
    
  </div>
  )
}

export default MenuHome