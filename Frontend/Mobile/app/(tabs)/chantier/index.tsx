import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

const ChantierScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Chantiers" | "Maintenances" | "Autres"
  >("Chantiers");

  const router = useRouter();

  const navigateToConsulterChantier = () => {
    router.push("/chantier/consulter_chantier");
  };

  const navigateToCreerChantier = () => {
    router.push("/chantier/Add_Chantier/creer_chantier");
  };

  return (
    <PaperProvider>
      <SafeAreaView className="h-screen w-screen items-center justify-start">
        <View className="flex-row justify-evenly h-14 items-center">
          {/*----------------------------------------------- Buttons ----------------------------------------------------*/}
          <TouchableOpacity
            onPress={() => setActiveTab("Chantiers")}
            className={`p-2 border w-3/10 rounded-full ${
              activeTab === "Chantiers" ? "bg-blue-800" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-center ${
                activeTab === "Chantiers" ? "text-white" : "text-blue-800"
              }`}
            >
              Chantiers
            </Text>
          </TouchableOpacity>
          {/*----------------------------------------------- Buttons ----------------------------------------------------*/}
          <TouchableOpacity
            onPress={() => setActiveTab("Maintenances")}
            className={`p-2 border w-3/10 rounded-full ${
              activeTab === "Maintenances" ? "bg-blue-800" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-center ${
                activeTab === "Maintenances" ? "text-white" : "text-blue-800"
              }`}
            >
              Maintenances
            </Text>
          </TouchableOpacity>
          {/*----------------------------------------------- Buttons ----------------------------------------------------*/}
          <TouchableOpacity
            onPress={() => setActiveTab("Autres")}
            className={`p-2 border w-3/10 rounded-full ${
              activeTab === "Autres" ? "bg-blue-800" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-center ${
                activeTab === "Autres" ? "text-white" : "text-blue-800"
              }`}
            >
              Autres
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default ChantierScreen;
