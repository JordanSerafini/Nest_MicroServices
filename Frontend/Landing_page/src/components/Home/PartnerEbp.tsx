import ebpPartenaire from "../../assets/ebpPartenaire.webp";

function PartnerEbp() {
  return (
    <div className="flex flex-row w-7/10 items-center justify-evenly">
      <img src={ebpPartenaire} alt="ebp_partenaire" className="h-44" />
      <div>
        <h2 className="text-3xl font-bold">Solution logique : <span className="font-light tracking-widest">Partenaire EBP depuis 1990</span></h2>
        <p></p>
      </div>
    </div>
  );
}

export default PartnerEbp;
