import Icon from "../../SVG/Icon"

function bottomNavBar1() {
  return (
      <div className="w-full h-full flex justify-between items-center ">
        <div className="w-1/4 h-full flex justify-center items-center">
          <Icon type="home" className=" text-black-pers text-3xl " />
        </div>
        <div className="w-1/4 h-full flex justify-center items-center">
          <Icon type="search" className=" text-black-pers text-3xl " />
        </div>
        <div className="w-1/4 h-full flex justify-center items-center">
          <Icon type="add_task" className=" text-black-pers text-3xl " />
        </div>
        <div className="w-1/4 h-full flex justify-center items-center">
          <Icon type="pin_drop" className=" text-black-pers text-3xl  " />
        </div>
      </div>
  )
}

export default bottomNavBar1