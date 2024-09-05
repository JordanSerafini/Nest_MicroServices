import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import NoteCards from "./NoteCards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobalContext } from "../../context/GlobalContext";

const pp = require("../../assets/pp.jpeg");

interface Event {
  title: string;
  description: string;
  start: string;
  end: string;
  startHour: string;
  endHour: string;
  urgence?: string;
}

interface Note {
  title: string;
  description: string;
  date: string;
  urgence: string;
  category: string;
}

const events: { [key: string]: Event[] } = {
  "29/07/2024": [
    {
      title:
        "Rappeler Mr Untel Rappeler Mr Untel Rappeler Mr Untel Rappeler Mr Untel",
      description: "Description 1",
      start: "29/07/2024",
      end: "29/07/2024",
      startHour: "10:00",
      endHour: "12:00",
      urgence: "Haute",
    },
    {
      title: "Chantier Mr Laurent",
      description: "Description 2",
      start: "29/07/2024",
      end: "29/07/2024",
      startHour: "14:00",
      endHour: "16:00",
      urgence: "Moyen",
    },
    {
      title: "Event 3",
      description: "Description 3",
      start: "29/07/2024",
      end: "29/07/2024",
      startHour: "16:00",
      endHour: "18:00",
      urgence: "Moyen",
    },
    {
      title: "Event 4",
      description: "Description 4",
      start: "29/07/2024",
      end: "29/07/2024",
      startHour: "18:00",
      endHour: "20:00",
      urgence: "Faible",
    },
    {
      title: "Event 5",
      description: "Description 5",
      start: "29/07/2024",
      end: "29/07/2024",
      startHour: "20:00",
      endHour: "22:00",
    },
  ],
  "30/07/2024": [
    {
      title: "Event 1",
      description: "Description 1",
      start: "30/07/2024",
      end: "30/07/2024",
      startHour: "10:00",
      endHour: "12:00",
    },
    {
      title: "Event 2",
      description: "Description 2",
      start: "30/07/2024",
      end: "30/07/2024",
      startHour: "12:00",
      endHour: "14:00",
    },
    {
      title: "Event 3",
      description: "Description 3",
      start: "30/07/2024",
      end: "30/07/2024",
      startHour: "14:00",
      endHour: "16:00",
    },
    {
      title: "Event 4",
      description: "Description 4",
      start: "30/07/2024",
      end: "30/07/2024",
      startHour: "16:00",
      endHour: "18:00",
    },
    {
      title: "Event 5",
      description: "Description 5",
      start: "30/07/2024",
      end: "30/07/2024",
      startHour: "18:00",
      endHour: "20:00",
    },
  ],
  "31/07/2024": [
    {
      title: "Event 1",
      description: "Description 1",
      start: "31/07/2024",
      end: "31/07/2024",
      startHour: "10:00",
      endHour: "12:00",
    },
    {
      title: "Event 2",
      description: "Description 2",
      start: "31/07/2024",
      end: "31/07/2024",
      startHour: "12:00",
      endHour: "14:00",
    },
    {
      title: "Event 3",
      description: "Description 3",
      start: "31/07/2024",
      end: "31/07/2024",
      startHour: "14:00",
      endHour: "16:00",
    },
    {
      title: "Event 4",
      description: "Description 4",
      start: "31/07/2024",
      end: "31/07/2024",
      startHour: "16:00",
      endHour: "18:00",
    },
    {
      title: "Event 5",
      description: "Description 5",
      start: "31/07/2024",
      end: "31/07/2024",
      startHour: "18:00",
      endHour: "20:00",
    },
  ],
  "01/08/2024": [
    {
      title: "Event 1",
      description: "Description 1",
      start: "01/08/2024",
      end: "01/08/2024",
      startHour: "10:00",
      endHour: "12:00",
    },
    {
      title: "Event 2",
      description: "Description 2",
      start: "01/08/2024",
      end: "01/08/2024",
      startHour: "12:00",
      endHour: "14:00",
    },
    {
      title: "Event 3",
      description: "Description 3",
      start: "01/08/2024",
      end: "01/08/2024",
      startHour: "14:00",
      endHour: "16:00",
    },
    {
      title: "Event 4",
      description: "Description 4",
      start: "01/08/2024",
      end: "01/08/2024",
      startHour: "16:00",
      endHour: "18:00",
    },
    {
      title: "Event 5",
      description: "Description 5",
      start: "01/08/2024",
      end: "01/08/2024",
      startHour: "18:00",
      endHour: "20:00",
    },
  ],
  "02/08/2024": [
    {
      title: "Event 1",
      description: "Description 1",
      start: "02/08/2024",
      end: "02/08/2024",
      startHour: "10:00",
      endHour: "12:00",
    },
    {
      title: "Event 2",
      description: "Description 2",
      start: "02/08/2024",
      end: "02/08/2024",
      startHour: "12:00",
      endHour: "14:00",
    },
    {
      title: "Event 3",
      description: "Description 3",
      start: "02/08/2024",
      end: "02/08/2024",
      startHour: "14:00",
      endHour: "16:00",
    },
    {
      title: "Event 4",
      description: "Description 4",
      start: "02/08/2024",
      end: "02/08/2024",
      startHour: "16:00",
      endHour: "18:00",
    },
    {
      title: "Event 5",
      description: "Description 5",
      start: "02/08/2024",
      end: "02/08/2024",
      startHour: "18:00",
      endHour: "20:00",
    },
  ],
};

const notes: { [key: string]: Note[] } = {
  "29/07/2024": [
    {
      title: "Messages non lus",
      description: "Description de la Messages non lus",
      date: "29/07/2024",
      urgence: "Haute",
      category: "Catégorie 1",
    },
    {
      title: "Appelez Mr Jacques",
      description: "Description de la Appelez Mr Jacques",
      date: "29/07/2024",
      urgence: "Moyenne",
      category: "Catégorie 2",
    },
    {
      title: "Vacaresto commerciaux",
      description: "Description de la Vacaresto commerciaux",
      date: "29/07/2024",
      urgence: "Faible",
      category: "Catégorie 3",
    },
    {
      title: "Vacances Stéphane",
      description: "Description de la Vacances Stéphane",
      date: "29/07/2024",
      urgence: "Haute",
      category: "Catégorie 4",
    },
    {
      title: "Note 5",
      description: "Description de la note 5",
      date: "29/07/2024",
      urgence: "Moyenne",
      category: "Catégorie 5",
    },
  ],
  "30/07/2024": [
    {
      title: "Messages non lus",
      description: "Description de la Messages non lus",
      date: "30/07/2024",
      urgence: "Haute",
      category: "Catégorie 1",
    },
    {
      title: "Appelez Mr Jacques",
      description: "Description de la Appelez Mr Jacques",
      date: "30/07/2024",
      urgence: "Moyenne",
      category: "Catégorie 2",
    },
    {
      title: "Vacaresto commerciaux",
      description: "Description de la Vacaresto commerciaux",
      date: "30/07/2024",
      urgence: "Faible",
      category: "Catégorie 3",
    },
    {
      title: "Vacances Stéphane",
      description: "Description de la Vacances Stéphane",
      date: "30/07/2024",
      urgence: "Haute",
      category: "Catégorie 4",
    },
    {
      title: "Note 5",
      description: "Description de la note 5",
      date: "30/07/2024",
      urgence: "Moyenne",
      category: "Catégorie 5",
    },
  ],
  "31/07/2024": [
    {
      title: "Messages non lus",
      description: "Description de la Messages non lus",
      date: "31/07/2024",
      urgence: "Haute",
      category: "Catégorie 1",
    },
    {
      title: "Appelez Mr Jacques",
      description: "Description de la Appelez Mr Jacques",
      date: "31/07/2024",
      urgence: "Moyenne",
      category: "Catégorie 2",
    },
    {
      title: "Vacaresto commerciaux",
      description: "Description de la Vacaresto commerciaux",
      date: "31/07/2024",
      urgence: "Faible",
      category: "Catégorie 3",
    },
    {
      title: "Vacances Stéphane",
      description: "Description de la Vacances Stéphane",
      date: "31/07/2024",
      urgence: "Haute",
      category: "Catégorie 4",
    },
    {
      title: "Note 5",
      description: "Description de la note 5",
      date: "31/07/2024",
      urgence: "Moyenne",
      category: "Catégorie 5",
    },
  ],
  "01/08/2024": [
    {
      title: "Messages non lus",
      description: "Description de la Messages non lus",
      date: "01/08/2024",
      urgence: "Haute",
      category: "Catégorie 1",
    },
    {
      title: "Appelez Mr Jacques",
      description: "Description de la Appelez Mr Jacques",
      date: "01/08/2024",
      urgence: "Moyenne",
      category: "Catégorie 2",
    },
    {
      title: "Vacaresto commerciaux",
      description: "Description de la Vacaresto commerciaux",
      date: "01/08/2024",
      urgence: "Faible",
      category: "Catégorie 3",
    },
    {
      title: "Vacances Stéphane",
      description: "Description de la Vacances Stéphane",
      date: "01/08/2024",
      urgence: "Haute",
      category: "Catégorie 4",
    },
    {
      title: "Note 5",
      description: "Description de la note 5",
      date: "01/08/2024",
      urgence: "Moyenne",
      category: "Catégorie 5",
    },
  ],
  "02/08/2024": [
    {
      title: "Messages non lus",
      description: "Description de la Messages non lus",
      date: "02/08/2024",
      urgence: "Haute",
      category: "Catégorie 1",
    },
    {
      title: "Appelez Mr Jacques",
      description: "Description de la Appelez Mr Jacques",
      date: "02/08/2024",
      urgence: "Moyenne",
      category: "Catégorie 2",
    },
    {
      title: "Vacaresto commerciaux",
      description: "Description de la Vacaresto commerciaux",
      date: "02/08/2024",
      urgence: "Faible",
      category: "Catégorie 3",
    },
    {
      title: "Vacances Stéphane",
      description: "Description de la Vacances Stéphane",
      date: "02/08/2024",
      urgence: "Haute",
      category: "Catégorie 4",
    },
    {
      title: "Note 5",
      description: "Description de la note 5",
      date: "02/08/2024",
      urgence: "Moyenne",
      category: "Catégorie 5",
    },
  ],
  "03/08/2024": [
    {
      title: "Email non lus",
      description: "Description de la Messages non lus",
      date: "03/08/2024",
      urgence: "Haute",
      category: "Catégorie 1",
    },
    {
      title: "Appelez Mr Jacques",
      description: "Description de la Appelez Mr Jacques",
      date: "03/08/2024",
      urgence: "Moyenne",
      category: "Catégorie 2",
    },
    {
      title: "resto commerciaux",
      description: "Description de la Vacaresto commerciaux",
      date: "03/08/2024",
      urgence: "Faible",
      category: "Catégorie 3",
    },
    {
      title: "Vacances Stéphane",
      description: "Description de la Vacances Stéphane",
      date: "03/08/2024",
      urgence: "Haute",
      category: "Catégorie 4",
    },
    {
      title: "Note 5",
      description: "Description de la note 5",
      date: "03/08/2024",
      urgence: "Moyenne",
      category: "Catégorie 5",
    },
  ],
};

const Dashboard = () => {
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { toggleMenu } = useGlobalContext();

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateSelected;
    setShowPicker(false);
    setDateSelected(currentDate);
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(dateSelected);


  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("user");
    router.push("/login");
  };



  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      className="w-screen"
    >
      <View className="pt-8 h-fit w-full rounded-3xl items-center">
        {/* ------------------------------------------------------------ Header --------------------------------------------------------------------------- */}
        <View className="items-center w-9/10 flex-row justify-between">
        <TouchableOpacity onPress={toggleMenu}>
            <Icon name="navicon" size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-base">
            Tableau de bord
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Image source={pp} className="rounded-full w-12 h-12" />
          </TouchableOpacity>
        </View>
        {/* ------------------------------------------------------------ Input date du jour --------------------------------------------------------------------------- */}
        <View className="w-9/10 items-center pt-3">
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            className="mt-2 w-full "
          >
            <View className="bg-white rounded-full p-2 text-blue-800 w-full text-center flex-row items-center justify-between">
              <Text className=" ">{dateSelected.toDateString()}</Text>
              <Icon name="calendar" size={25} color="blue" />
            </View>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={dateSelected}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        {/* ------------------------------------------------------------ Card events --------------------------------------------------------------------------- */}
        <View className="h-fit mt-8">
          <NoteCards notes={notes[formattedDate] || []} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Dashboard;
