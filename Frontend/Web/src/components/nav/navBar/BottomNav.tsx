import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "../../SVG/Icon";
import NavMenu from "../menu/NavMenu";
import { useGlobalContext } from "../../../context/globalContext";

interface BottomNavProps {
  title?: string;
  css?: string;
}

function BottomNav({
  title = "header",
  css = "",
}: BottomNavProps): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuAdmin, setShowMenuAdmin] = useState(false);
  const { isAdminPanel, swapAdminPanel } = useGlobalContext();
  

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const { isFullscreen, enterFullscreen, exitFullscreen } = useGlobalContext();


  useEffect(() => {
    if (user && user.role == 1) {
      setShowMenuAdmin(true);
    }
  }, [user]);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="z-40 bg-black-pers w-full h-auto fixed bottom-0 flex flex-col gap-2 text-white font-merriweather font-bold tracking-widest border-t-1 border-black-pers ">
      
      <div className="h-1/2 w-full ">
        <div className={`flex flex-row w-full justify-between p-2 ${css}`}>
          <div className="w-1/3">
            <Icon type="Arrow_Back_iOS" theme="" onClick={handleBack} />
          </div>
          <div className="w-1/3 text-center">{title}</div>
          <div className="w-1/3 flex justify-end gap-2">
          
            {showMenuAdmin && (
              <Icon
                type="settings"
                theme=""
                className={isAdminPanel ? "text-red-500" : "text-blue-500"}
                onClick={() => swapAdminPanel()}
              />
            )  
            }
            {isFullscreen ? (
              
              < Icon type="fullscreen_exit" theme="red" className="" onClick={exitFullscreen} />
              ) : (
              < Icon type="fullscreen" theme="" onClick={enterFullscreen} />
              )  }
            <Icon
              type="menu"
              theme=""
              onClick={handleClick}
              aria-label="Menu"
            />
          </div>
        </div>
        {showMenu && <NavMenu setShowMenu={setShowMenu} showMenu={showMenu} />}
      </div>
    </div>
  );
}

export default BottomNav;
