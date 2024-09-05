import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/FontAwesome";

interface Note {
  title: string;
  description: string;
  date: string;
  urgence: string;
  category: string;
}

interface NoteCardsProps {
  notes: Note[];
}

const getIconColor = (urgence?: string): string => {
  switch (urgence) {
    case "Haute":
      return "red";
    case "Moyen":
      return "orange";
    case "Faible":
      return "green";
    default:
      return "blue";
  }
};

const NoteCards: React.FC<NoteCardsProps> = ({ notes }) => {
  const width = Dimensions.get("window").width;

  if (notes.length === 0) {
    return null; // Ne rien rendre si le tableau notes est vide
  }

  return (
    <View className="h-28">
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay
        data={notes}
        scrollAnimationDuration={2000}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{ alignItems: "center", justifyContent: "center" }}
            className={`h-20 bg-white w-8.5/10 rounded-lg self-center p-2 ${item.urgence === "Haute" ? "border-2 border-red-500" :  null}`}
          >

            <View className=" w-10/10 justify-between flex-row h-4/5 p-2">
            <Text className="font-bold italic text-base">{item.title} </Text>
              <Icon
                name="exclamation-circle"
                size={20}
                color={getIconColor(item.urgence)}
              />
            </View>

            <Text className="self-end">{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NoteCards;
