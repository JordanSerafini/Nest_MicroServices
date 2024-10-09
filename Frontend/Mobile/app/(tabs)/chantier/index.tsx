import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import ConsulterChantier from "./consulter_chantier";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

const ChantierScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Chantiers" | "Maintenances" | "Autres"
  >("Chantiers");

  //?------------------------------------------- Animation setup
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let toValue = 0;
    switch (activeTab) {
      case "Chantiers":
        toValue = 0;
        break;
      case "Maintenances":
        toValue = -screenWidth;
        break;
      case "Autres":
        toValue = -2 * screenWidth;
        break;
      default:
        break;
    }
    // Animate sliding effect
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
          <ConsulterChantier />
        </View>
        <View style={{ width: screenWidth, justifyContent: "center", alignItems: "center" }}>
          <Text>Maintenances en cours...</Text>
        </View>
        <View style={{ width: screenWidth, justifyContent: "center", alignItems: "center" }}>
          <Text>Autre contenu</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <PaperProvider>
      <SafeAreaView className="h-screen w-screen items-center justify-start">
        <View className="flex-row justify-evenly w-full h-14 items-center">
          {/*----------------------------------------------- Buttons ----------------------------------------------------*/}
          <TouchableOpacity
            onPress={() => setActiveTab("Chantiers")}
            className="w-3/10 rounded-full shadow-lg"
          >
            <LinearGradient
              colors={
                activeTab === "Chantiers"
                  ? ["#4c669f", "#3b5998", "#192f6a"]
                  : ["#e0e0e0", "#d5d5d5"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="p-2 rounded-full"
            >
              <Text
                className={`text-center font-bold ${
                  activeTab === "Chantiers" ? "text-white" : "text-blue-800"
                }`}
              >
                Chantiers
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {/*----------------------------------------------- Buttons ----------------------------------------------------*/}
          <TouchableOpacity
            onPress={() => setActiveTab("Maintenances")}
            className="w-3/10 rounded-full shadow-lg"
          >
            <LinearGradient
              colors={
                activeTab === "Maintenances"
                  ? ["#4c669f", "#3b5998", "#192f6a"]
                  : ["#e0e0e0", "#d5d5d5"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="p-2 rounded-full"
            >
              <Text
                className={`text-center font-bold ${
                  activeTab === "Maintenances" ? "text-white" : "text-blue-800"
                }`}
              >
                Maintenances
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {/*----------------------------------------------- Buttons ----------------------------------------------------*/}
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
        <View className="w-screen h-screen justify-start">
          {renderContent()}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default ChantierScreen;
