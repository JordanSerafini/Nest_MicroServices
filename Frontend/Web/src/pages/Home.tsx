import BottomNav from "../components/nav/navBar/BottomNav";
import HomeContent from "../components/Home/HomeContent";
import MenuHome from "../components/Home/MenuHome";

function Home() {
  return (
    <div className="w-screen h-screen bg-gray-light2 flex flex-col justify-start items-center gap-6">
      <div className="h-1/10 w-screen flex justify-center mt-2">
        <MenuHome />
      </div>
      <div className="h-8.5/10 w-screen flex flex-col overflow-y-auto">
        <HomeContent />
      </div>
      <div className="w-screen h-1/10">
        <BottomNav title="Accueil" />
      </div>
    </div>
  );
}

export default Home;
