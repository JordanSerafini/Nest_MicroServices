import PricingCard from "./PrincingCards";

function Pricing() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Choisissez le plan qui vous correspond
          </p>
        </div>

        <div className="mt-10 flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <PricingCard
              badge="Standard"
              describe="Tout ce dont vous avez besoin pour commencer. Parfait pour les petites entreprises et les indépendants."
              price="$19 / mois"
              features={["Gestion de projet", "Suivi des tâches", "Intégration de base"]}
              onClick={() => alert("Plan Standard sélectionné")}
            />
          </div>
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <PricingCard
              badge="Pro"
              describe="Des outils avancés pour les entreprises en croissance. Ajoutez des modules selon vos besoins."
              price="$39 / mois"
              features={["Gestion de projet", "Suivi des tâches", "Intégration de base", "Gestion avancée des clients", "Rapports détaillés", "Support téléphonique"]}
              onClick={() => alert("Plan Pro sélectionné")}
            />
          </div>
          <div className="w-full md:w-1/3 px-4">
            <PricingCard
              badge="Personnalisé"
              describe="Solutions sur mesure pour répondre à vos besoins spécifiques. Contactez-nous pour un devis personnalisé."
              price="Contactez-nous"
              features={["Solution sur mesure", "Support prioritaire", "Intégration personnalisée"]}
              onClick={() => alert("Plan Personnalisé sélectionné")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
