import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider, Portal } from "react-native-paper";
import { View, LayoutAnimation, UIManager, Platform } from "react-native";
import ButtonPerso from "../../components/UI/ButtonPerso";
import FabPerso from "../../components/UI/Fab/client/FabGroupClient";
import ClientScreen from "./clientList";
import MapClientScreen from "./clientMapAll";
import AddClientModal from "./modals/AddClientModal"; 
import EditClientModal from "./modals/EditClientModal";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const IndexScreen: React.FC = () => {
  const [content, setContent] = useState("Liste" || "Carte");
  const customer = {
    Id: 1262,
    name: "2 I Process",
    email: "test@test.com",
    phone: "1234567890",
    address: "123 rue de la rue",
    postalCode: "12345",
    city: "Ville",
    note: "Note Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorum, voluptate id corrupti reiciendis nihil unde rerum numquam quibusdam recusandae, odio cumque quos dolor at. Quas ipsa sed eum voluptate?",
  }

  // États pour chaque modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const customAnimation = {
    duration: 200,
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.7,
    },
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };
  
  // Appliquer cette animation lors des ouvertures et fermetures
  useEffect(() => {
    LayoutAnimation.configureNext(customAnimation);
  }, [showAddClientModal, showEditClientModal]);
  

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1e40af",
      secondary: "#BFDBFE",
      accent: "#1E3A8A",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView className="flex items-center justify-start w-full h-full">
        {/*---------------------------------------- Button Nav -----------------------------*/}
        <View className="w-full flex-row items-center justify-evenly pb-2">
          <ButtonPerso
            mode={content === "Liste" ? "contained" : "outlined"}
            icon={"account"}
            text={"Liste"}
            css={`w-4.5/10 self-center ${content === "Liste" ?  "bg-blue-800" : "bg-gray-100"}`}
            onPress={() => setContent("Liste")}
          />
          <ButtonPerso
            mode={content === "Carte" ? "contained" : "outlined"}
            icon={"map-marker-account"}
            text={"Carte"}
            css={`w-4.5/10 self-center ${content === "Carte" ?  "bg-blue-800" : "bg-gray-100"}`}
            onPress={() => setContent("Carte")}
          />
        </View>
        {/*---------------------------------------- Content -----------------------------*/}
        <View>
          {content === "Liste" && <ClientScreen />}
          {content === "Carte" && <MapClientScreen />}
        </View>
        {showAddClientModal || showEditClientModal ? (null) : (
        <FabPerso
          showAddModal={() => {
            LayoutAnimation.configureNext(customAnimation);
            setShowAddClientModal(true);
          }}
          showEmailModal={() => {
            LayoutAnimation.configureNext(customAnimation);
            setShowEmailModal(true);
          }}
          showEditClientModal={() => {
            LayoutAnimation.configureNext(customAnimation);
            setShowEditClientModal(true);
          }}
          showAddClientModal={() => {
            LayoutAnimation.configureNext(customAnimation);
            setShowAddClientModal(true);
          }}
        />
        )}
        {/*---------------------------------------- Modals -----------------------------*/}
        <Portal>
          {showAddClientModal && (
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
              <AddClientModal visible={showAddClientModal} onDismiss={() => setShowAddClientModal(false)} />
            </View>
          )}
          {showEditClientModal && (
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
              <EditClientModal visible={showEditClientModal} onDismiss={() => setShowEditClientModal(false)} customer={customer} />
            </View>
          )}
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default IndexScreen;
