import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import CreerFicheChantier from "./creer_fiche_chantier";


import { Customer } from "../../../@types/customer.type";

import { getChantiers } from "../../../utils/functions/chantier_functions";
import { getCustomersPaginated } from "../../../utils/functions/customer_functions";
import { Chantier, FicheChantier } from "../../../@types/chantier.type";

const localisationIcon = require("../../../assets/Icons/localisation.png");
const phoneIcon = require("../../../assets/Icons/phone.png");
const emailIcon = require("../../../assets/Icons/mail.png");
const addIcon = require("../../../assets/Icons/add.png");

const CreerChantier: React.FC = () => {
  const [searchQueryCustomers, setSearchQueryCustomers] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [chantier, setChantier] = useState<Chantier>({
    name: "",
    description: "",
    address: "",
    city: "",
    postal_code: "",
    country: "",
    phone: "",
    email: "",
    contact: "",
    start_date: new Date(),
    end_date: new Date(),
    client_id: 0,
    fiche_chantier_id: 0,
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  //* -------------------------------------------------------- Input Manager -------------------------------------------------------- *//
  const handleChange = (field: keyof Chantier, value: any) => {
    setChantier({ ...chantier, [field]: value });
  };

  //* -------------------------------------------------------- Name Generation -------------------------------------------------------- *//
  const generateChantierName = async () => {
    try {
      const chantiers = await getChantiers();
      const chantierCount = chantiers.length + 1;
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, "0")}${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}${today.getFullYear()}`;
      const newName = `chantier ${chantierCount}-${formattedDate}`;
      setChantier((prev) => ({ ...prev, name: newName }));
    } catch (error) {
      console.error("Error generating chantier name:", error);
    }
  };

  useEffect(() => {
    generateChantierName();
  }, []);

  //* -------------------------------------------------------- Handle Customer -------------------------------------------------------- *//
  useEffect(() => {
    if (searchQueryCustomers.length < 2) return;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const customers = await getCustomersPaginated(
          searchQueryCustomers,
          50,
          0
        );
        setCustomers(customers.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQueryCustomers]);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    handleChange("client_id", customer.id);
    setSearchQueryCustomers(customer.Name ?? "");
  };

  const handleNewSearch = (text: string) => {
    setSearchQueryCustomers(text);
    setCustomers([]);
    setSelectedCustomer(null);
  };

  useEffect(() => {
    if (selectedCustomer) {
      setChantier((prev) => ({
        ...prev,
        client_id: selectedCustomer.id,
        address: selectedCustomer.MainDeliveryAddress_Address1 ?? "",
        city: selectedCustomer.MainDeliveryAddress_City ?? "",
        postal_code: selectedCustomer.MainDeliveryAddress_Zipcode ?? "",
        country:
          selectedCustomer.MainDeliveryAddress_Countryisocode ?? "France",
        phone: selectedCustomer.MainDeliveryContact_CellPhone ?? "",
        email: selectedCustomer.MainDeliveryContact_Email ?? "",
        contact: selectedCustomer.MainDeliveryContact_Name ?? "",
      }));
    } else if (selectedCustomer == null) {
      setChantier((prev) => ({
        ...prev,
        client_id: 0,
        address: "",
        city: "",
        postal_code: "",
        country: "",
        phone: "",
        email: "",
        contact: "",
      }));
    }
  }, [selectedCustomer]);

  //* -------------------------------------------------------- Handle Submit -------------------------------------------------------- *//
  const handleSubmit = () => {
    console.log("Chantier submitted", chantier);
  };

    //* -------------------------------------------------------- Date -------------------------------------------------------- *//
  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      handleChange("start_date", selectedDate);
    }
    setShowStartDatePicker(false);
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      handleChange("end_date", selectedDate);
    }
    setShowEndDatePicker(false);
  };

    //* -------------------------------------------------------- Save Fiche -------------------------------------------------------- *//
  const handleSaveFicheChantier = (fiche: FicheChantier) => {
    console.log('Fiche Chantier saved:', fiche);
    setShowAddModal(false);
  };

  return (
    <SafeAreaView className={`w-full h-full items-center flex justify-between ${showAddModal ? "opacity-20":""}`}>
      {/*------------------------------------------------------------------- 1st part: customer + chantier nbr ----------------------------------------------------------------------------------------------*/}
      <View className="w-full max-h-2/10 flex-row">
        <TextInput
          value={searchQueryCustomers}
          onChangeText={handleNewSearch}
          placeholder="Sélectionner un client"
          className="p-2 bg-white rounded- w-5.5/10 shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <TextInput
          value={chantier.name}
          onChangeText={(text) => handleChange("name", text)}
          placeholder="Name"
          className="p-2 bg-white shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-4.5/10"
        />
      </View>
      {/*------------------------------------------------------------------- 1st part: List customer ----------------------------------------------------------------------------------------------*/}
      <View className="max-h-5/10">
        {customers.length > 0 && !selectedCustomer && (
          <FlatList
            className="pl-"
            nestedScrollEnabled={true}
            data={customers}
            keyExtractor={(item) => (item.id ? item.id.toString() : "")}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCustomerSelect(item)}>
                <View className="p-1 bg-white rounded- w-full shadow-md border border-gray-300 mt-1">
                  <Text>{item.Name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/*------------------------------------------------------------------- 2nd part: address ----------------------------------------------------------------------------------------------*/}
      <View className="flex flex-row items-center justify-center w-9/10 gap-x-1">
        <Image source={localisationIcon} className="w-6 h-7" />
        <View>
          <TextInput
            value={chantier.address}
            onChangeText={(text) => handleChange("address", text)}
            placeholder="Address"
            className="p-2 bg-white  w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          <View className="w-full flex-row ">
            <TextInput
              value={chantier.city}
              onChangeText={(text) => handleChange("city", text)}
              placeholder="City"
              className="p-2 bg-white w-6/10 shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <TextInput
              value={chantier.postal_code}
              onChangeText={(text) => handleChange("postal_code", text)}
              placeholder="Postal Code"
              className="p-2 bg-white  w-2/10 shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <TextInput
              value={chantier.country}
              onChangeText={(text) => handleChange("country", text)}
              placeholder="Country"
              className="p-2 bg-white  w-2/10 shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </View>
        </View>
      </View>

      {/*------------------------------------------------------------------- Description ----------------------------------------------------------------------------------------------*/}
      <TextInput
        value={chantier.description}
        multiline={true}
        numberOfLines={5}
        onChangeText={(text) => handleChange("description", text)}
        placeholder="Description"
        className="p-2 bg-white rounded-xl w-9.5/10 shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 overflow-auto "
      />
      {/*------------------------------------------------------------------- Contact ----------------------------------------------------------------------------------------------*/}
      <View className="w-9.5/10 gap-y-1 items-center ">
        <TextInput
          value={chantier.contact}
          onChangeText={(text) => handleChange("contact", text)}
          placeholder="Contact"
          className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <View className="flex flex-row gap-x-1 w-9.5/10 items-center">
          <View className="w-5/10 flex-row gap-1 items-center">
            <Image source={phoneIcon} className="w-6 h-7" />
            <TextInput
              value={chantier.phone}
              onChangeText={(text) => handleChange("phone", text)}
              placeholder="Phone"
              className="p-2 bg-white w-8/10 rounded-xl shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </View>
          <View className="w-5/10 flex-row gap-1 items-center">
            <Image source={emailIcon} className="w-7 h-7" />
            <TextInput
              value={chantier.email}
              onChangeText={(text) => handleChange("email", text)}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="p-2 bg-white rounded- w-8/10 shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </View>
        </View>
      </View>

      {/*------------------------------------------------------------------- Last part ------------------------------------------------------------------------------------------------*/}
      <View className="w-9.5/10  h-2/10 items-center flex-row gap-x-2">
        {/*------------------------------------------------------------------- Date ----------------------------------------------------------------------------------------------*/}
        <View className="w-5/10 gap-y-1">
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
            <Text className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
              Start Date:{" "}
              {chantier.start_date ? chantier.start_date.toDateString() : ""}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && chantier.start_date && (
            <DateTimePicker
              value={chantier.start_date}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
            <Text className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
              End Date:{" "}
              {chantier.end_date ? chantier.end_date.toDateString() : ""}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && chantier.end_date && (
            <DateTimePicker
              value={chantier.end_date}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}
        </View>
        {/*------------------------------------------------------------------- Add fiche ----------------------------------------------------------------------------------------------*/}
        <View className="w-5/10 gap-y-1 ">
          <TouchableOpacity className="w-full items-center" onPress={()=>setShowAddModal(true)}>
            <Image source={addIcon} className="w-4/10 h-16" />
          </TouchableOpacity>
        </View>
      </View>
      {/*------------------------------------------------------------------- Submit ----------------------------------------------------------------------------------------------*/}
      <TouchableOpacity className="w-full">
        <Text
          className="w-full px-4 py-2 text-center font-bold text-white  bg-blue-700"
          style={{ letterSpacing: 8 }}
        >
          Envoyer
        </Text>
      </TouchableOpacity>
      {/*------------------------------------------------------------------- Modal ----------------------------------------------------------------------------------------------*/}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View className="w-screen h-screen items-center justify-center">
            <CreerFicheChantier setShowAddModal={setShowAddModal} onSave={handleSaveFicheChantier} chantierId={chantier.id!} />
         
          </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CreerChantier;
