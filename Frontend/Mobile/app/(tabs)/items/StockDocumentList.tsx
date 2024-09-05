import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { getStockDocPaginated } from "../../utils/functions/stock_function";
import Icon from "react-native-vector-icons/AntDesign";
import { StockDocument } from "../../@types/item.type";
import Table from "../../components/item/stock/Table";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function StockDocumentList() {
  const [stockDoc, setStockDoc] = useState<StockDocument[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [BeDocument, setBeDocument] = useState<StockDocument[]>([]);
  const [showBe, setShowBe] = useState(false);

  const [BsDocument, setBsDocument] = useState<StockDocument[]>([]);
  const [showBs, setShowBs] = useState(false);

  const [BlDocument, setBlDocument] = useState<StockDocument[]>([]);
  const [showBl, setShowBl] = useState(false);

  const [InventoryDocument, setInventoryDocument] = useState<StockDocument[]>(
    []
  );
  const [showInventory, setShowInventory] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  console.log(BeDocument);

  useEffect(() => {
    setPage(0);
    setBeDocument([]);
    setBsDocument([]);
    setBlDocument([]);
    setInventoryDocument([]);
    fetchStockDoc(50, 0, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchStockDoc(50, 0, searchQuery);
  }, []);

  const fetchStockDoc = async (
    limit: number,
    page: number,
    searchQuery: string
  ) => {
    if (loading) return;
    setLoading(true);

    const data = await getStockDocPaginated(limit, page * limit, searchQuery);
    const BeDoc = data.StockDoc.filter(
      (line: { NumberPrefix: string }) => line.NumberPrefix == "BE"
    );
    setBeDocument((prev) => [...prev, ...BeDoc]);

    const BsDoc = data.StockDoc.filter(
      
      (line: { NumberPrefix: string }) => line.NumberPrefix == "BS"
    );
    setBsDocument((prev) => [...prev, ...BsDoc]);

    const BlDoc = data.StockDoc.filter(
      (line: { NumberPrefix: string }) => line.NumberPrefix == "BL"
    );
    setBlDocument((prev) => [...prev, ...BlDoc]);

    const InventoryDoc = data.StockDoc.filter(
      (line: { NumberPrefix: string }) => line.NumberPrefix === "INV"
    );
    setInventoryDocument((prev) => [...prev, ...InventoryDoc]);

    setLoading(false);
  };

  const handleShow = (documentType: string) => {
    const customAnimation = {
      duration: 500,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
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
  
    LayoutAnimation.configureNext(customAnimation);

    switch (documentType) {
      case "BE":
        setShowBe(!showBe);
        setShowBs(false);
        setShowBl(false);
        setShowInventory(false);
        break;
      case "BS":
        setShowBs(!showBs);
        setShowBe(false);
        setShowBl(false);
        setShowInventory(false);
        break;
      case "BL":
        setShowBl(!showBl);
        setShowBe(false);
        setShowBs(false);
        setShowInventory(false);
        break;
      case "INV":
        setShowInventory(!showInventory);
        setShowBe(false);
        setShowBs(false);
        setShowBl(false);
        break;
      default:
        break;
    }
  };
  const handleLoadMore = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchStockDoc(50, nextPage, searchQuery);
    }
  };

  const onChange = (event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <SafeAreaView className="w-screen h-10/10 justify-start pt-2 gap-y-10">
      {/* ----------------------------------------------------------------------------- BON ENTREE ------------------------------------------------------------------------------------------- */}
      {!showBs && !showBl && !showInventory && (
        <View className="w-9.5/10 max-h-9/10 self-center border-b border-blue-800">
          <TouchableOpacity
            className="flex-row w-full justify-between"
            onPress={() => handleShow("BE")}
          >
            <Text className="text-blue-800 font-bold">Bons entrées :</Text>
            <Icon
              name={`${showBe ? "caretup" : "caretdown"}`}
              size={20}
              color="#1e40af"
            />
          </TouchableOpacity>
          {showBe && (
            <View>
              <View className="pb-4 w-full flex-row justify-between items-center">
                <TextInput
                  className="w-8.5/10 h-8 bg-white"
                  label="recherche..."
                  mode="outlined"
                  placeholder="Search"
                  value={searchQuery}
                  onChangeText={(text) => {
                    setSearchQuery(text);
                  }}
                />
                <TouchableOpacity onPress={showDatepicker} className="w-1/10">
                  <Icon name="calendar" size={28} color="#1e40af" />
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
              <Table Data={BeDocument} onEndReached={handleLoadMore} />
            </View>
          )}
        </View>
      )}
      {/* ----------------------------------------------------------------------------------- BON SORTI ------------------------------------------------------------------------------------------- */}
      {!showBe && !showBl && !showInventory && (
        <View className="w-9.5/10 max-h-9/10 self-center border-b border-blue-800">
          <TouchableOpacity
            className="flex-row w-full justify-between"
            onPress={() => handleShow("BS")}
          >
            <Text className="text-blue-800 font-bold">Bons Sorties :</Text>
            <Icon
              name={`${showBs ? "caretup" : "caretdown"}`}
              size={20}
              color="#1e40af"
            />
          </TouchableOpacity>
          {showBs && <Table Data={BsDocument} onEndReached={handleLoadMore} />}
        </View>
      )}
      {/* ----------------------------------------------------------------------------- BON LIVRAISON ------------------------------------------------------------------------------------------- */}
      {/*
      {!showBe && !showBs && !showInventory && (
        <View className="w-9.5/10 max-h-9/10 self-center border-b border-blue-800">
          <TouchableOpacity
            className="flex-row w-full justify-between"
            onPress={() => handleShow("BL")}
          >
            <Text className="text-blue-800 font-bold">Bons livraisons :</Text>
            <Icon
              name={`${showBl ? "caretup" : "caretdown"}`}
              size={20}
              color="#1e40af"
            />
          </TouchableOpacity>
          {showBl && <Table Data={BlDocument} onEndReached={handleLoadMore} />}
        </View>
      )}
       
       */}
      {/* ----------------------------------------------------------------------------- INVENTAIRE ------------------------------------------------------------------------------------------- */}
      {!showBe && !showBs && !showBl && (
        <View className="w-9.5/10 max-h-9/10 self-center border-b border-blue-800">
          <TouchableOpacity
            className="flex-row w-full justify-between"
            onPress={() => handleShow("INV")}
          >
            <Text className="text-blue-800 font-bold">Inventaire :</Text>
            <Icon
              name={`${showInventory ? "caretup" : "caretdown"}`}
              size={20}
              color="#1e40af"
            />
          </TouchableOpacity>
          {showInventory && (
            <Table Data={InventoryDocument} onEndReached={handleLoadMore} />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

export default StockDocumentList;
