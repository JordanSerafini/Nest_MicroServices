import mobilePic1 from "@/assets/mobilePic1.jpg";
import mobilePic2 from "../../assets/mobilePic2.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const items = [
  {
    title: "La puissance de votre logiciel, en toute mobilité.",
    text: "Transformez votre manière de travailler avec notre application mobile. Profitez de toutes les fonctionnalités de votre logiciel de bureau, où que vous soyez, et améliorez votre productivité sans effort.",
    images: [mobilePic1, mobilePic2],
  },
  {
    title: "Gestion commerciale et de stock",
    text: "Optimisez la gestion de vos clients, articles et stocks avec notre solution mobile. Accédez à toutes les fonctionnalités de gestion commerciale où que vous soyez et assurez un suivi précis et actualisé de vos opérations.",
    images: [mobilePic1, mobilePic2],
  },
  {
    title: "Gestion de chantier et devis",
    text: "Simplifiez la gestion de vos chantiers et l'établissement de devis grâce à notre application mobile. Utilisez des outils dédiés pour organiser vos projets, suivre l'avancement des travaux et générer des devis détaillés.",
    images: [mobilePic1, mobilePic2],
  },
  {
    title: "Gestion de planning et rendez-vous",
    text: "Gérez efficacement vos plannings et rendez-vous avec notre solution mobile. Planifiez, suivez et ajustez vos rendez-vous en temps réel pour une organisation sans faille.",
    images: [mobilePic1, mobilePic2],
  },
];

function Carrousel() {
  return (
    <Carousel className="w-full max-w-9/10 pt-44" opts={{ loop: true }}>
      <CarouselContent className="">
        {items.map((item, index) => (
          <CarouselItem key={index} className="flex items-center justify-center mb-28">
            <div className="flex-col flex gap-8 w-5/10 items-center">
              <h2 className="text-6xl text-center font-bold font-edu">{item.title}</h2>
              <p className="text-xl text-center w-7.5/10 font-poppins">{item.text}</p>
              <div className="flex gap-8 w-full justify-evenly mt-8">
                <img src={item.images[0]} alt="" className="h-96" />
                <img src={item.images[1]} alt="" className="h-96" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Carrousel;
