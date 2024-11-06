import { ConstructionSite } from "@/@types/chantiers/chantier.type";

function Chantier_Card({ chantier }: { chantier: ConstructionSite }) {
  return (
    <div className="flex flex-wrap bg-white border p-3 w-2/10 h-4.5/10">
      <p>{chantier.Caption}</p>
    </div>
  );
}

export default Chantier_Card;
