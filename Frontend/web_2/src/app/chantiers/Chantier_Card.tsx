import { ConstructionSite } from "@/@types/chantiers/chantier.type";

function Chantier_Card({ chantier }: { chantier: ConstructionSite }) {
  return (
    <div className="bg-white border p-3 rounded-xl w-full h-full flex items-center justify-center">
      <p className="text-center">{chantier.Caption}</p>
    </div>
  );
}

export default Chantier_Card;
