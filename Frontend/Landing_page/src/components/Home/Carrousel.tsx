import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Carrousel() {
  return (
    <Carousel className="w-full max-w-xs" opts={{ loop:true }}>
      <CarouselContent>
          <CarouselItem >
            
          </CarouselItem>
          <CarouselItem >
            <div className="p-1">
              test2
            </div>
          </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Carrousel;
