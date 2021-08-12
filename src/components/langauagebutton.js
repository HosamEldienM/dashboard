import { useContext } from "react";
import { LangContext } from "../contexts/cartContext";

const LangauageButton = ({ setMenueToggle }) => {
  const { Lang, setLang } = useContext(LangContext);
  return (
    <div className="text-center">
      <button
        className="btn btn-outline-one border-0 p-2"
        onClick={(e) => {
          e.preventDefault();
          setMenueToggle && setMenueToggle(true);
          if (Lang == "en") {
            setLang("ar");
            document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
            document.getElementsByTagName("body")[0].style.textAlign = "right";
          }
          if (Lang == "ar") {
            setLang("en");
            document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
            document.getElementsByTagName("body")[0].style.textAlign = "left";
          }
        }}
      >
        {Lang == "en" ? "عربي" : "english"}
      </button>
    </div>
  );
};

export default LangauageButton;
