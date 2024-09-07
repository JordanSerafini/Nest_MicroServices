import Header from "@/components/Header/Header";
import PartnerEbp from "@/components/Home/PartnerEbp";
import Presentation from "@/components/Home/Presentation";
import Pricing from "@/components/Home/Pricing";
import FAQ from "@/components/Home/Faq";

function Home() {
  return (
    <div className="h-full w-screen bg-gray-200 items-center justify-start flex-col flex gap-16">
      <Header />
      <Presentation />
      <Pricing />
      <FAQ />
      <PartnerEbp />
    </div>
  );
}

export default Home;
