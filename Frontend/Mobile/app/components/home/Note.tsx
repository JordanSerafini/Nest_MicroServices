import React from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

interface Note {
  title: string;
  description: string;
  type: string;
  date: string;
}

const NoteComponent: React.FC = () => {
  const notes: Note[] = [
    {
      title: "Rappeler Mr Untel",
      description: "appeler avant midi",
      type: "Gestion commerciale",
      date: "2024-07-29",
    },
    {
      title: "Controle technique véhicule a programmer",
      description: "il reste 2 mois pour le CT",
      type: "Matériel",
      date: "2024-07-30",
    },
    {
      title: "Controle technique véhicule a programmer",
      description: "il reste 2 mois pour le CT",
      type: "Matériel",
      date: "2024-07-30",
    },
  ];

  const getIconBgColorClass = (type: string): string => {
    switch (type) {
      case "Gestion commerciale":
        return "bg-green-500";
      case "Matériel":
        return "bg-blue-500";
      default:
        return "bg-black";
    }
  };

  return (
    <ScrollView horizontal={true} className="gap-5 max-h-40 w-full">
      {notes.map((note, index) => (
        <View key={index} className="bg-white rounded-lg w-48 p-2 h-fit justify-evenly">
          <View className="flex-row justify-between items-center">
            <ScrollView className="max-h-18">
              <Text className="text-base font-bold">{note.title}</Text>
            </ScrollView>
            <View
              className={`h-4 w-4 items-center justify-center rounded-full ${getIconBgColorClass(
                note.type
              )}`}
            >
              <Icon name="info" size={10} color="white" />
            </View>
          </View>
          <Text className="text-sm text-gray-500  self-end">{note.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default NoteComponent;
