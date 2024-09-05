import React from "react";
import { View, Text, ScrollView } from "react-native";
import NotificationComponent from "./Notification";
import MapEvent from "./MapEvents";

const MainHome: React.FC = () => {
  const notifications = [
    {
      title: "Inspection du bâtiment",
      description:
        "Inspection générale du bâtiment pour vérifier l'état des structures.",
      type: "inspection",
      start: "2024-08-01T00:00:00.000Z",
      end: "2024-08-01T00:00:00.000Z",
      startHour: "09:00",
      endHour: "11:00",
      address: "10 Avenue de la République, 74000 Annecy",
      zipCode: "74000",
      city: "Annecy",
      lon: 6.1234,
      lat: 45.8992,
    },
    {
      title: "Réunion de chantier",
      description:
        "Réunion hebdomadaire avec les chefs de chantier pour discuter des progrès et des problèmes.",
      type: "meeting",
      start: "2024-07-29T00:00:00.000Z",
      end: "2024-07-29T00:00:00.000Z",
      startHour: "10:00",
      endHour: "11:00",
      address: "20 Rue Royale, 74000 Annecy",
      zipCode: "74000",
      city: "Annecy",
      lon: 6.1294,
      lat: 45.8989,
    },
    {
      title: "Devis Mr Stefan",
      description:
        "Réunion hebdomadaire avec les chefs de chantier pour discuter des progrès et des problèmes.",
      type: "meeting",
      start: "2024-07-29T00:00:00.000Z",
      end: "2024-07-29T00:00:00.000Z",
      startHour: "10:00",
      endHour: "11:00",
      address: "20 Rue Royale, 74000 Annecy",
      zipCode: "74000",
      city: "Annecy",
      lon: 6.1294,
      lat: 45.8989,
    },
    {
      title: "Maintenance HVAC",
      description:
        "Maintenance programmée des systèmes de chauffage, ventilation et climatisation.",
      type: "maintenance",
      start: "2024-08-03T00:00:00.000Z",
      end: "2024-08-03T00:00:00.000Z",
      startHour: "08:00",
      endHour: "12:00",
      address: "5 Rue de l'Industrie, 74960 Cran-Gevrier",
      zipCode: "74960",
      city: "Cran-Gevrier",
      lon: 6.1161,
      lat: 45.9059,
    },
    {
      title: "Livraison de matériaux",
      description:
        "Réception et vérification des matériaux de construction livrés sur site.",
      type: "delivery",
      start: "2024-08-04T00:00:00.000Z",
      end: "2024-08-04T00:00:00.000Z",
      startHour: "14:00",
      endHour: "15:00",
      address: "12 Chemin de Bellevue, 74940 Annecy-le-Vieux",
      zipCode: "74940",
      city: "Annecy-le-Vieux",
      lon: 6.1371,
      lat: 45.9106,
    },
    {
      title: "Formation sécurité",
      description:
        "Formation sur les protocoles de sécurité pour tous les employés du site.",
      type: "training",
      start: "2024-08-05T00:00:00.000Z",
      end: "2024-08-05T00:00:00.000Z",
      startHour: "13:00",
      endHour: "17:00",
      address: "8 Rue du Mont Blanc, 74370 Pringy",
      zipCode: "74370",
      city: "Pringy",
      lon: 6.1298,
      lat: 45.9365,
    },
  ];

  // Date actuelle pour les tests : 29 juillet 2024
  const today = new Date("2024-07-29T00:00:00.000Z");

  const todayNotifications = notifications.filter(notification => {
    const notificationDate = new Date(notification.start);

    return (
      notificationDate.getDate() === today.getDate() &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
      <View className="pt-6 w-9.5/10 items-center justify-center h-full pb-8">
        <View className="h-40 mb-4">
          <Text>Evènements aujourd'hui</Text>
          <NotificationComponent notifications={todayNotifications} />
        </View>
        <MapEvent events={todayNotifications} />
        <View className="h-40">
          <Text>Evènements cette semaine</Text>
          <NotificationComponent notifications={notifications} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MainHome;
