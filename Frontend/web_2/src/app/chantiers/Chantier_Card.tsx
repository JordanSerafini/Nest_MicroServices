import { ConstructionSite } from "@/@types/chantiers/chantier.type";

function Chantier_Card({ chantier }: { chantier: ConstructionSite }) {
  const formattedStartDate = chantier.StartDate
    ? new Date(chantier.StartDate).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';
    
  const formattedEndDate = chantier.EndDate
    ? new Date(chantier.EndDate).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  return (
    <div className="bg-white border p-3 rounded-xl w-full h-[25vh] flex flex-col items-center justify-start">
      <p className="">{chantier.Caption}</p>
      <p>{chantier.CustomerId}</p>
      <p>{chantier.NotesClear}</p>
      <p className="">Début : {formattedStartDate}</p>
      <p className="">Fin : {formattedEndDate}</p>
    </div>
  );
}

export default Chantier_Card;
