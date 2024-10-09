import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SalesList from "./salesList";
import DealsList from "./dealsList";
import FabDeal from "./Fab/dealFab";
import { PaperProvider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

export default function AffairePage() {
  const [activeTab, setActiveTab] = useState<"Sales" | "Affaires" | "Autres">(
    "Sales"
  );

  // Animation setup
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let toValue = 0;
    switch (activeTab) {
      case "Sales":
        toValue = 0;
        break;
      case "Affaires":
        toValue = -screenWidth;
        break;
      case "Autres":
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
          width: 3 * screenWidth,
          transform: [{ translateX }],
        }}
      >
        <View style={{ width: screenWidth }}>
          <SalesList />
        </View>
        <View style={{ width: screenWidth }}>
          <DealsList />
        </View>
        <View
          style={{
            width: screenWidth,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            onPress={() => setActiveTab("Sales")}
            className="w-3/10 rounded-full shadow-lg"
          >
            <LinearGradient
              colors={
                activeTab === "Sales"
                  ? ["#4c669f", "#3b5998", "#192f6a"]
                  : ["#e0e0e0", "#d5d5d5"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="p-2 rounded-full"
            >
              <Text
                className={`text-center font-bold ${
                  activeTab === "Sales" ? "text-white" : "text-blue-800"
                }`}
              >
                Ventes
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("Affaires")}
            className="w-3/10 rounded-full shadow-lg"
          >
            <LinearGradient
              colors={
                activeTab === "Affaires"
                  ? ["#4c669f", "#3b5998", "#192f6a"]
                  : ["#e0e0e0", "#d5d5d5"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="p-2 rounded-full"
            >
              <Text
                className={`text-center font-bold ${
                  activeTab === "Affaires" ? "text-white" : "text-blue-800"
                }`}
              >
                Affaires
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("Autres")}
            className="w-3/10 rounded-full shadow-lg"
          >
            <LinearGradient
              colors={
                activeTab === "Autres"
                  ? ["#4c669f", "#3b5998", "#192f6a"]
                  : ["#e0e0e0", "#d5d5d5"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="p-2 rounded-full"
            >
              <Text
                className={`text-center font-bold ${
                  activeTab === "Autres" ? "text-white" : "text-blue-800"
                }`}
              >
                Autres
              </Text>
            </LinearGradient>
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
