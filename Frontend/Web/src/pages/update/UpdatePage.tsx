import { useNavigate } from "react-router-dom";
import Icon from "../../components/SVG/Icon";
import BottomNav from "../../components/nav/navBar/BottomNav";



function UpdatePage() {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-screen h-screen">
      <div className="bg-gray-strong w-full h-full flex flex-col items-center justify-start gap-8">
        <div className=" text-white text-center pt-4 h-1/10 w-8/10 font-bold tracking-widest text-lg border-b-4 border-white">
          Page de synchronisation
        </div>
        <div className="w-full max-h-7.5/10 overflow-auto justify-between flex flex-row flex-wrap gap-8 p-4">
          <div
            onClick={() => handleCardClick("/updateCustomer")}
            className="p-10 w-48 items-center justify-center rounded-xl flex gap-4 text-white font-bold tracking-widest h-autp border-1 border-white bg-gray-500 shadow-2xl"
          >
            <Icon type="Person" theme="white" className="" />
            <h3>Clients</h3>
          </div>
          <div
            onClick={() => handleCardClick("/updateItem")}
            className="p-10 w-48 items-center justify-center rounded-xl flex gap-4 text-white font-bold tracking-widest h-autp border-1 border-white bg-gray-500 shadow-2xl"
          >
            <Icon type="Article" theme="white" className="" />
            <h3>Articles</h3>
          </div>
          <div className="p-10 w-48 items-center justify-center rounded-xl flex gap-4 text-white font-bold tracking-widest h-autp border-1 border-white bg-gray-500 shadow-2xl">
            <Icon type="Inventory" theme="white" className="" />
            <h3>Stock</h3>
          </div>
          <div className="p-10 w-48 items-center justify-center rounded-xl text-white font-bold tracking-max h-autp border-1 border-white bg-gray-500 shadow-2xl">
            blabla
          </div>
        </div>
      </div>
      <BottomNav title="Page de synchronisation" />
    </div>
  );
}

export default UpdatePage;
