import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import sli from "../../assets/sli.png";
import phone from "../../assets/phoneIcon.png";

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    }
  };
// scroll
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  return (
    <div
      className={`w-full p-4 h-14 fixed top-0 left-0 flex justify-between items-center transition-transform duration-300 bg-white shadow-md z-10 ${
        showHeader ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="w-1/10 items-center flex justify-center">
        <img src={sli} alt="sli_image" className="h-10 rounded-full" />
      </div>
      <div className="w-4.5/10">
        <Navbar />
      </div>
      <div className="w-1/10 items-center flex justify-center gap-4">
        <img src={phone} alt="phone_icon" className="h-10 hover:scale-110 cursor-pointer" />
        <div className="rounded-xl text-white bg-blue-800 flex items-center justify-center px-4 py-2 cursor-pointer hover:scale-105">
          Essaie
        </div>
      </div>
    </div>
  );
}

export default Header;
