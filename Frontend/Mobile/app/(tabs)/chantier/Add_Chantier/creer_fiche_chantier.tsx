import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

import { getItemPaginated } from "../../../utils/functions/item_function";
import { getStaff } from "../../../utils/functions/chantier_functions";

import { FicheChantier, Staff } from "../../../@types/chantier.type";
import { Item } from "../../../@types/item.type";

const closeIcon = require("../../../assets/Icons/close.png");
const addPersonIcon = require("../../../assets/Icons/addPerson.png");
const outilsIcon = require("../../../assets/Icons/outils.png");
const workerIcon = require("../../../assets/Icons/worker.png");
const expandIcon = require("../../../assets/Icons/expand.png");

const CreerFicheChantier: React.FC<{
  setShowAddModal: (value: boolean) => void;
  onSave: (fiche: FicheChantier) => void;
  chantierId: number;
}> = ({ onSave, chantierId, setShowAddModal }) => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [staffSelected, setStaffSelected] = useState<Staff[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [itemsSelected, setItemsSelected] = useState<Item[]>([]);
  const [showStaffList, setShowStaffList] = useState(false);
  const [showItemsList, setShowItemsList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffResponse = await getStaff();
        setStaff(staffResponse);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }

      try {
        const itemResponse = await getItemPaginated(50, 0, "");
        setItems(itemResponse.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);

  const handleStaffSelect = (selectedStaff: Staff) => {
    setStaffSelected([...staffSelected, selectedStaff]);
    setStaff(staff.filter((s) => s.id !== selectedStaff.id));
  };

  const handleItemSelect = (selectedItem: Item) => {
    setItemsSelected([...itemsSelected, selectedItem]);
    setItems(items.filter((i) => i.id !== selectedItem.id));
  };

  const handleSubmit = () => {
    const newFicheChantier: FicheChantier = {
      id: 0,
      name: "",
      project_manager_id: undefined,
      chantier_id: chantierId,
    };
    onSave(newFicheChantier);
  };

  const renderGrid = (data: any) => {
    let rows = [];
    for (let i = 0; i < data.length; i += 2) {
      rows.push(
        <View
          key={i}
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        >
          <TouchableOpacity
            onPress={() => handleStaffSelect(data[i])}
            style={{ flex: 1, alignItems: "center", padding: 10 }}
          >
            <Image source={workerIcon} style={{ width: 50, height: 50 }} />
            <Text>{data[i].name}</Text>
          </TouchableOpacity>
          {data[i + 1] && (
            <TouchableOpacity
              onPress={() => handleStaffSelect(data[i + 1])}
              style={{ flex: 1, alignItems: "center", padding: 10 }}
            >
              <Image source={workerIcon} style={{ width: 50, height: 50 }} />
              <Text>{data[i + 1].name}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return rows;
  };

  const deleteStaffSelected = (id: number) => {
    const staffSelectedCopy = staffSelected.filter((s) => s.id !== id);
    const staffSelectedDeleted = staffSelected.find((s) => s.id === id);
    if (staffSelectedDeleted) {
      setStaffSelected(staffSelectedCopy);
      setStaff([...staff, staffSelectedDeleted]);
    }
  };

  return (
    <View className="w-9/10 h-8/10 z-50 bg-white border rounded-3xl items- justify-between">
      {/*-------------------------------------------- Close Button ------------------------------------------------------*/}
      <TouchableOpacity
        onPress={() => setShowAddModal(false)}
        style={{ position: "absolute", top: 10, right: 10 }}
        className={`z-40 ${showStaffList || showItemsList ? "hidden" : ""} `}
      >
        <Image source={closeIcon} className="w-6 h-6" />
      </TouchableOpacity>

      {/*-------------------------------------------- Ajouter staff ------------------------------------------------------*/}
      <View
        className={`w-full p-2  items-center justify-center ${
          showStaffList ? " min-h-7.5/10 " : " h-4.5/10 "
        }
        ${showItemsList ? "hidden" : " h-4.5/10 "}
        `}
      >
        <TouchableOpacity className="self-start">
          <Image source={expandIcon} className="w-4 h-4" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowStaffList(!showStaffList)}>
          <Image source={addPersonIcon} className="w-12 h-12" />
        </TouchableOpacity>
        {showStaffList ? (
          <ScrollView className="w-full h-8/10">{renderGrid(staff)}</ScrollView>
        ) : (
          <FlatList
            data={staffSelected}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="justify-between items-center p-8 border rounded-lg ml-4 ">
                {/*-------------------------------------------- Delete Icon staff ------------------------------------------------------*/}
                <TouchableOpacity
                  onPress={() => deleteStaffSelected(item.id)}
                  style={{ position: "absolute", top: 10, right: 10 }}
                  className="z-40"
                >
                  <Image source={closeIcon} className="w-6 h-6" />
                </TouchableOpacity>

                <Image source={workerIcon} className="w-6 h-6" />
                <Text>{item.name}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.role}</Text>
              </View>
            )}
            style={{ width: "100%", height: "100%" }}
            contentContainerStyle={{ alignItems: "center" }}
          />
        )}
      </View>

      {/*-------------------------------------------- Ajouter Item ------------------------------------------------------*/}
      <View
        className={`w-full p-2 items-center justify-center ${
          showStaffList ? "hidden" : " h-4.5/10 "
        }
        ${showItemsList ? " h-9/10 " : " h-4.5/10 "}
        `}
      >
        <TouchableOpacity onPress={() => setShowItemsList(!showItemsList)}>
          <Image source={outilsIcon} className="w-12 h-12" />
        </TouchableOpacity>
        {showItemsList && (
          <FlatList
            className="w-full h-8/10 gap-2 flex-row border-2 border-red-400"
            data={items}
            horizontal={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleItemSelect(item)}
                className="flex items-center justify-center p-2 shadow-2xl"
              >
                <Text>{item.Caption}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        <FlatList
          data={itemsSelected}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.Caption}</Text>
            </View>
          )}
        />
      </View>

      {/*-------------------------------------------- More + Save ------------------------------------------------------*/}
      <View className="flex flex-row w-full bg-green-500 rounded-b-2xl h-0.5/10">
        <TouchableOpacity>
          <Text
            className="h-full min-w-1/10 text-center"
          >
            ...
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          className=" w-fullrounded-b-3xl"
        >
          <Text
            className="bg-blue-500 h-full min-w-9/10 text-white text-center font-bold"
            style={{ letterSpacing: 5 }}
          >
            Sauvegarder
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreerFicheChantier;
