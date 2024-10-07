import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { getSalePaginated, getSaleByCategory } from "../../utils/functions/sale_function";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { SaleDocument } from "../../@types/sales/SaleDocument.type";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

function SalesList() {
  const [sales, setSales] = useState<SaleDocument[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<any>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ["BR", "FC", "AD", "BL", "FA", "DEX", "FD", "CM", "CC", "AV", "DE"];

  const router = useRouter();

  //* ------------------------ Handle Detail Press ------------------------
  const handleDetailPress = (sale: SaleDocument) => {
    console.log("Sale pressed", sale.Id);
    if (sale.Id) {
      router.push({
        pathname: "/affaires/saleDetail",
        params: { Id: sale.Id, name: sale.CustomerName, DocumentNumber: sale.DocumentNumber },
      });
    }
  };

  //* ------------------------ Format Date ------------------------
  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  //* ------------------------ Fetch Sales ------------------------
  const fetchSales = async (newSearch = false) => {
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      let data;
      if (selectedCategory) {
        data = await getSaleByCategory(selectedCategory, limit, newSearch ? 0 : offset);
      } else {
        data = await getSalePaginated(searchQuery, limit, newSearch ? 0 : offset);
      }
      setSales((prevSales) =>
        newSearch ? data.saleDocuments : [...prevSales, ...data.saleDocuments]
      );
      setTotalPages(data.totalPages);
      setOffset(newSearch ? limit : offset + limit);
    } catch (error: any) {
      console.error("Error fetching sales:", error);
      setError(error);
    }
    setLoadingMore(false);
    setLoading(false);
  };

  //* ------------------------ useEffect ------------------------
  useEffect(() => {
    setLoading(true);
    setSales([]);
    fetchSales(true);
  }, [searchQuery, limit, selectedCategory]);

  //* ------------------------ Handle Search ------------------------
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setSelectedCategory(null);
    setOffset(0);
    setSales([]);
  };

  //* ------------------------ RenderItem ------------------------
  const uniqueSales = sales.filter(
    (sale, index, self) => index === self.findIndex((t) => t.id === sale.id)
  );

  const renderItem = ({ item: sale, index }: { item: SaleDocument; index: number }) => {
    return (
      <TouchableOpacity
        key={`${sale.id}-${index}`}
        className="p-4 border-b border-gray-200 h-20 justify-between overflow-hidden"
        onPress={() => handleDetailPress(sale)}
      >
        <Text className="italic text-sm">{sale.DocumentNumber}</Text>
        <View className="flex-row w-full h-full justify-between items-center pl-4">
          <View className="flex-row gap-1 h-full items-center">
            <Icon name="person" size={20} color="#1e40af" />
            <Text className="text-xs w-5/10 max-h-8">{sale.CustomerName}</Text>
          </View>
          <View className="flex-row gap-1 h-full items-center">
            <Icon name="event" size={20} color="#1e40af" />
            <Text className="text-xs w-5/10 max-h-8">{formatDate(sale.DocumentDate)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //* ------------------------ Return ------------------------
  return (
    <View className="h-screen w-screen items-center">
      {/* ----------------------------------------------------------------  Search Part  ----------------------------------------------------------- */}
      <View className="w-10/10 max-h-20 items-center">
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
          <View className="items-center justify-between flex-row w-9.5/10">
            <Picker
              selectedValue={selectedCategory}
              className="w-8/10 h-10 "
              onValueChange={(itemValue) => {
                setSelectedCategory(itemValue || null);
                setSearchQuery("");
                setOffset(0);
                setSales([]);
              }}
            >
              <Picker.Item label="Choisir catégorie" value="" />
              {categories.map((category) => (
                <Picker.Item label={category} value={category} key={category} />
              ))}
            </Picker>
          </View>
        )}
      </View>
      {/* ----------------------------------------------------------------  Search Part  ----------------------------------------------------------- */}
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
            data={uniqueSales}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            contentContainerStyle={{ paddingBottom: 20 }}
            onEndReached={() => {
              if (offset < totalPages * limit) {
                fetchSales();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null
            }
          />
        )}
      </View>
    </View>
  );
}

export default SalesList;
