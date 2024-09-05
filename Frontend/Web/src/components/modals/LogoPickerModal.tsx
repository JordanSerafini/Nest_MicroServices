import Icon from "../SVG/Icon";

interface LogoPickerModalProps {
    selectedIcon?: string;
    typeChange: (newType: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedIcon?: (newType: string) => void;
    }

function LogoPickerModal({selectedIcon, typeChange}: LogoPickerModalProps) {
    const icons = ["home", "face", "build", "alarm", "work", "school", "Person", "settings", "inventory", "Local_Shipping", "Receipt_Long", "Shopping_Cart", "Account_circle", "Format_List_Bulleted", "Star", "article", "User_Attributes", "More_Horiz"];

    return (
      <div className="fixed top-10 left-10 border-1 border-black-strong rounded-xl h-8.5/10 w-8/10 bg-white-perso text-3xl z-40 ">
          <div className="items-center justify-start flex flex-wrap gap-x-8 gap-y-2">
          {icons.map((icon, index) => (
              <div key={index} className="flex flex-row items-center gap-1">
                  <Icon type={icon} theme="black" className="text-2xl"/>
                  <input type="radio" name="icon" value={icon} checked={selectedIcon === icon} onChange={(e: React.ChangeEvent<HTMLInputElement>) => typeChange(e.target.value, e)}/>
              </div>
          ))}
          </div>

      </div>
    )
}

export default LogoPickerModal

