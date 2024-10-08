import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Deal } from "../../@types/deals/Deal.entity";
import { getDealPaginated } from "../../utils/functions/deals_function";

function DealsList() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<any>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const categories = ["BR", "FC"];
  
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const router = useRouter();

  //* ------------------------ Handle Detail Press ------------------------
  const handleDetailPress = (deal: Deal) => {
    console.log("Deal pressed", deal.Id);
    router.push(`/deals/${deal.Id}`);
  };

  //* ------------------------ Format Date ------------------------
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  //* ------------------------ Fetch Deals ------------------------
  const fetchDeals = async (newSearch = false) => {
    if (loadingMore) return;
    setLoadingMore(true);

    try {
      const data = await getDealPaginated(searchQuery, limit, offset);
      setDeals((prevDeals) => newSearch ? data.deals : [...prevDeals, ...data.deals]);
      setTotalPages(data.totalPages);
      setOffset(newSearch ? limit : offset + limit);
    } catch (error: any) {
      console.error("Error fetching deals:", error);
      setError(error);
    }
    setLoadingMore(false);
    setLoading(false);
  };

  //* ------------------------ useEffect ------------------------
  useEffect(() => {
    setLoading(true);
    setDeals([]);
    fetchDeals(true);
  }, [searchQuery, limit, selectedCategory, selectedStartDate, selectedEndDate]);

  //* ------------------------ Handle Search ------------------------
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setSelectedCategory(null);
    setOffset(0);
    setDeals([]);
  };

  //* ------------------------ Handle Date Selection ------------------------
  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleConfirmStartDate = (date: Date) => {
    setSelectedStartDate(date);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleConfirmEndDate = (date: Date) => {
    setSelectedEndDate(date);
    hideEndDatePicker();
  };

  //* ------------------------ Handle Category Selection ------------------------
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setModalVisible(false);
    setSearchQuery("");
    setOffset(0);
    setDeals([]);
  };

  //* ------------------------ RenderItem ------------------------


  const renderItem = ({ item: deal, index }: { item: Deal; index: number }) => {
    return (
      <TouchableOpacity
        key={`${deal.Id}-${index}`}
        className="p-4 border-b border-gray-200 h-20 justify-between overflow-hidden"
        onPress={() => handleDetailPress(deal)}
      >
        <Text className="italic text-sm">{deal.Id}</Text>
        <View className="flex-row w-full h-full justify-between items-center pl-4">
          <View className="flex-row gap-1 h-full items-center">
            <Icon name="person" size={20} color="#1e40af" />
            <Text className="text-xs w-5/10 max-h-8">{deal.Caption}</Text>
          </View>
          <View className="flex-row gap-1 h-full items-center">
            <Icon name="event" size={20} color="#1e40af" />
            <Text className="text-xs w-5/10 max-h-8">{formatDate(deal.DealDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //* ------------------------ Return ------------------------
  return (
    <View className="h-screen w-screen items-center">
      {/* ----------------------------------------------------------------  Search Part  ----------------------------------------------------------- */}
      <View className="w-10/10 items-center">
        <View className="h-10 items-center justify-between flex-row">
          <TextInput
            className="h-full px-2 w-8.5/10 bg-gray-200 "
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search"
          />
          <Icon
            name={bannerVisible ? "arrow-drop-up" : "arrow-drop-down"}
            size={32}
            color="#3B82F6"
            onPress={() => setBannerVisible(!bannerVisible)}
          />
        </View>
        {bannerVisible && (
          <View className="max-h-20 flex-row items-center justify-between w-9.5/10 pt-2">
            {/* Category Selection */}
            <View className="items-center justify-between flex-row h-full w-5/10 ">
              <TouchableOpacity
                style={{
                  backgroundColor: "#f0f0f0",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 4,
                }}
                onPress={() => setModalVisible(true)}
                className="w-9/10 tex p-2"
              >
                <Text className="text-center" style={{ letterSpacing: 1 }}>
                  {selectedCategory ? selectedCategory : "Choisir catégorie"}
                </Text>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 20,
                      alignItems: "center",
                    }}
                  >
                    <ScrollView style={{ width: "100%" }}>
                      {categories.map((category) => (
                        <TouchableOpacity
                          key={category}
                          style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#ddd",
                          }}
                          onPress={() => handleCategorySelect(category)}
                        >
                          <Text>{category}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <TouchableOpacity
                      style={{ marginTop: 20 }}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={{ color: "red" }}>Annuler</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            {/* Date Pickers */}
            <View className="w-5/10 items-center">
              <View className=" flex-row items-center justify-evenly w-full h-12 ">
                <TouchableOpacity
                  onPress={showStartDatePicker}
                  style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 4,
                  }}
                  className="p-2 border w-20"
                >
                  <Text className="text-xs text-center">
                    {selectedStartDate
                      ? selectedStartDate.toDateString()
                      : "Début"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={showEndDatePicker}
                  style={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 4,
                  }}
                  className="p-2 border w-20"
                >
                  <Text className="text-xs text-center">
                    {selectedEndDate
                      ? selectedEndDate.toDateString()
                      : "Fin"}
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmStartDate}
                onCancel={hideStartDatePicker}
              />

              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmEndDate}
                onCancel={hideEndDatePicker}
              />
            </View>
          </View>
        )}
      </View>
      {/* ----------------------------------------------------------------  Deals List  ----------------------------------------------------------- */}
      <View className="w-full h-full">
        {loading && offset === 0 ? (
          <View className="h-8/10 flex items-center justify-center w-full gap-2 flex-row">
            <Text>Loading...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : error ? (
          <Text className="text-red-500">Error: {error.message}</Text>
        ) : (
          <FlatList
            data={deals}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.Id ? `${item.Id}-${index}` : index.toString()            }
            contentContainerStyle={{ paddingBottom: 20 }}
            onEndReached={() => {
              if (!loadingMore && offset < totalPages * limit) {
                fetchDeals();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore ? (
                <View style={{ padding: 10, alignItems: "center" }}>
                  <ActivityIndicator size="small" color="#0000ff" />
                  <Text>Chargement en cours...</Text>
                </View>
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
}

export default DealsList;
