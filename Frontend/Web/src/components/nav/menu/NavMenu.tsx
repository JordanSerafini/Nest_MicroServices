import  { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Icon from "../../SVG/Icon";
import { useNavigate } from "react-router-dom";

interface NavMenuProps {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ showMenu, setShowMenu }) => {
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState("black-pers");
  const [textColor, setTextColor] = useState("white-perso");
  const [borderColor, setBorderColor] = useState("white-perso");

  useEffect(() => {
    if (showMenu) {
      gsap.to(menuRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(menuRef.current, {
        autoAlpha: 0,
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [showMenu]);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  const handleDarkMode = () => {
    if (bgColor === "white-perso") {
      setBgColor("black-pers");
      setTextColor("white-perso");
      setBorderColor("white-perso");
    } else {
      setBgColor("white-perso");
      setTextColor("black-pers");
      setBorderColor("black-pers");
    }
  };



  let iconColor;

  switch (bgColor) {
    case "white":
      iconColor = "black";
      break;
    case "black-pers":
      iconColor = "white";
      break;
    default:
      break;
  }

  const iconStyle = {
    cursor: "pointer",
    color: iconColor,
  };

  return (
    <div
      ref={menuRef}
      className={`z-50 p-2 border-l-1 border-black text-${textColor} fixed right-0 top-0 w-7/10 bg-${bgColor}  h-full flex flex-col `}
      style={{ transform: "translateX(100%)" }}
    >
      <Icon
        type="close"
        theme="black"
        onClick={handleClick}
        className="fixed right-2 bottom-3"
        style={iconStyle}
      />
      <div className="flex gap-4 flex-col h-full w-full items-center ">
        <div className="h-2/10 w-full">
          <div
            className={`text-center w-10/10 text-sm border-b-1 border-${borderColor} p-2 pb-4 `}
          >
            Jordan Serafini
          </div>
        </div>
        <div className="h-5/10 text-xs flex flex-col gap-4 justify-evenly items-start w-5/10 cursor-pointer">
          <div
            className="flex gap-2 items-center"
            onClick={() => handleNavigate("")}
          >
            <span>
              <Icon type="home" style={iconStyle} />
            </span>
            Accueil
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => handleNavigate("articles")}
          >
            <span>
              <Icon type="article" style={iconStyle} />
            </span>
            Articles
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => handleNavigate("clients")}
          >
            <span>
              <Icon type="Person" style={iconStyle} />
            </span>
            Clients
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => handleNavigate("stock")}
          >
            <span>
              <Icon type="inventory" style={iconStyle} />
            </span>
            Stock
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => handleNavigate("devis")}
          >
            <span>
              <Icon type="Format_List_Bulleted" style={iconStyle} />
            </span>
            Devis
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => handleNavigate("map")}
          >
            <span>
              <Icon type="pin_drop" style={iconStyle} />
            </span>
            Map
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => handleNavigate("sendform")}
          >
            <span>
              <Icon type="send" style={iconStyle} />
            </span>
            Envoyer Formulaire
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => handleNavigate("update")}
          >
            <span>
              <Icon type="Refresh" style={iconStyle} />
            </span>
            Synchronisation
          </div>
          <div
            className="flex gap-2 items-center"
            onClick={() => handleNavigate("settings")}
          >
            <span>
              <Icon type="settings" style={iconStyle} />
            </span>
            Paramètres
          </div>
        </div>
      </div>
      <Icon
        type="logout"
        theme="red"
        className="absolute bottom-2 left-2"
        onClick={handleLogout}
      />
      <Icon
        type="dark_mode"
        theme=""
        className="absolute bottom-3 right-12"
        onClick={handleDarkMode}
      />
    </div>
  );
};

export default NavMenu;
