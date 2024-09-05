import { useState } from "react";
import Icon from "../SVG/Icon";
import axios from "axios";
import url from "../../utils/url";

interface AddCardModalProps {
  onClose: () => void;
}

function AddCardModal({ onClose }: AddCardModalProps) {
  const [cardForm, setCardForm] = useState({
    title: "",
    logo: "",
    link: "/", 
    color: "",
    isBorder: false,
    isShadow: false,
  });

  const user = JSON.parse(localStorage.getItem('user') || '{}');

    const userID = parseInt(user.id);

  const icons = ["home", "face", "build", "alarm", "work", "school", "Person", "settings", "inventory", "Local_Shipping", "Receipt_Long", "Shopping_Cart", "Account_circle", "Format_List_Bulleted", "Star", "article", "User_Attributes", "More_Horiz"];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement; 
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setCardForm(prev => ({
      ...prev,
      [target.name]: value,
    }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${url.main}/addCard/${userID}`, cardForm);
    onClose();
    window.location.reload();
  }
  const handleIconChange = (icon: string) => {
    setCardForm(prev => ({
      ...prev,
      logo: icon,
    }));
  }

  return (
    <div className="h-screen w-9.5/10 bg-white-perso2 flex justify-center items-center z-50 relative">
      <form className="bg-white p-8 rounded-lg shadow-lg relative" onSubmit={handleSubmit}>
        <button onClick={onClose} className="absolute top-0 right-0 p-2">
          <Icon type="close" theme="red" />
        </button>
        <h2 className="text-lg font-bold mb-4 text-center">Ajouter une carte</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={cardForm.title}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <div className="flex flex-wrap mb-4">
          {icons.map((icon, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleIconChange(icon)}
              className={`p-2 ${cardForm.logo === icon ? 'bg-blue-500 text-white' : 'bg-transparent text-black'}`}
            >
              <Icon type={icon} theme="black" />
            </button>
          ))}
        </div>
        <select
          name="link"
          value={cardForm.link}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        >
          <option value="/">Home</option>
          <option value="/devis">Devis</option>
          <option value="/clients">Clients</option>
          <option value="/articles">Articles</option>
          <option value="/map">Map</option>
          <option value="/stock">Stock</option>
          <option value="/setting">Settings</option>
          <option value="/fournisseurs">Fournisseurs</option>
          <option value="/favoris">Favoris</option>
          <option value="/login">Login</option>
        </select>
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={cardForm.color}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <label>
          <input
            type="checkbox"
            name="isBorder"
            checked={cardForm.isBorder}
            onChange={handleChange}
          /> Add Border
        </label>
        <label>
          <input
            type="checkbox"
            name="isShadow"
            checked={cardForm.isShadow}
            onChange={handleChange}
          /> Add Shadow
        </label>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Save Card
        </button>
      </form>
    </div>
  );
}

export default AddCardModal;
