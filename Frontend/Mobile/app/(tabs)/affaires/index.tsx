import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SalesList from "./salesList";
import DealsList from "./dealsList";
import FabDeal from "./Fab/dealFab"; // Import du FAB
import { PaperProvider } from "react-native-paper";

export default function AffairePage() {
  const [activeTab, setActiveTab] = useState<"sales" | "affaires" | "another">(
    "sales"
  );

  // Actions pour les ventes
  const showEditSaleModal = () => {
    console.log("Editer vente");
  };

  const showAddSaleModal = () => {
    console.log("Ajouter vente");
  };

  // Actions pour les affaires
  const showEditDealModal = () => {
    console.log("Editer affaire");
  };

  const showAddDealModal = () => {
    console.log("Ajouter affaire");
  };

  // Fonction pour rendre le contenu en fonction de l'onglet actif
  const renderContent = () => {
    switch (activeTab) {
      case "sales":
        return <SalesList />;
      case "affaires":
        return <DealsList />;
      case "another":
        return <Text>Autre contenu</Text>;
      default:
        return null;
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView className="w-screen h-screen justify-start">
        {/* Barre d'onglets */}
        <View className="flex-row justify-evenly h-14 items-center">
          <TouchableOpacity
            onPress={() => setActiveTab("sales")}
            className={`p-2 border w-3/10 rounded-full ${
              activeTab === "sales" ? "bg-blue-800" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-center ${
                activeTab === "sales" ? "text-white" : "text-blue-800"
              }`}
            >
              Ventes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("affaires")}
            className={`p-2 border w-3/10 rounded-full ${
              activeTab === "affaires" ? "bg-blue-800" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-center ${
                activeTab === "affaires" ? "text-white" : "text-blue-800"
              }`}
            >
              Affaires
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("another")}
            className={`p-2 border w-3/10 rounded-full ${
              activeTab === "another" ? "bg-blue-800" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-center ${
                activeTab === "another" ? "text-white" : "text-blue-800"
              }`}
            >
              Autres
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenu de la page */}
        <View className="w-screen h-screen justify-start">
          {renderContent()}
        </View>

        {/* Floating Action Button (FAB) */}
        <FabDeal
        content={activeTab}
          showEditSaleModal={showEditSaleModal}
          showAddSaleModal={showAddSaleModal}
          showEditDealModal={showEditDealModal}
          showAddDealModal={showAddDealModal}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}
