import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SalesList from "./salesList";
import DealsList from "./dealsList";
import FabDeal from "./Fab/dealFab"; // Import du FAB
import { PaperProvider } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

export default function AffairePage() {
  const [activeTab, setActiveTab] = useState<"sales" | "affaires" | "another">("sales");

  // Animation setup
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let toValue = 0;
    switch (activeTab) {
      case "sales":
        toValue = 0;
        break;
      case "affaires":
        toValue = -screenWidth;
        break;
      case "another":
        toValue = -2 * screenWidth;
        break;
      default:
        break;
    }
    // Animation de glissement
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  const renderContent = () => {
    return (
      <Animated.View
        style={{
          flexDirection: "row",
          width: 3 * screenWidth, // 3 tabs * largeur de l'écran
          transform: [{ translateX }],
        }}
      >
        <View style={{ width: screenWidth }}>
          <SalesList />
        </View>
        <View style={{ width: screenWidth }}>
          <DealsList />
        </View>
        <View style={{ width: screenWidth, justifyContent: "center", alignItems: "center" }}>
          <Text>Autre contenu</Text>
        </View>
      </Animated.View>
    );
  };

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
        <View style={{ width: screenWidth, overflow: "hidden", flex: 1 }}>
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
