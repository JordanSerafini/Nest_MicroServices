import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { getSalePaginated } from "../../utils/functions/sale_function";
import { useEffect, useState } from "react";
import { SaleDocument } from "../../@types/sales/SaleDocument.type";
import Icon from "react-native-vector-icons/MaterialIcons";

function SalesList() {
  const [sales, setSales] = useState<SaleDocument[]>([]);
  const [totalPages, setTotalPages] = useState(0); // Total pages available
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<any>(null);

  //* ------------------------ Fetch Sales ------------------------
  const fetchSales = async (newSearch = false) => {
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const data = await getSalePaginated(searchQuery, limit, newSearch ? 0 : offset);
      setSales((prevSales) => newSearch ? data.saleDocuments : [...prevSales, ...data.saleDocuments]);
      setTotalPages(data.totalPages); 
      setOffset(newSearch ? limit : offset + limit); 
    } catch (error: any) {
      console.error("Error fetching sales:", error);
      setError(error);
    }
    setLoadingMore(false);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchSales(true);
  }, [searchQuery, limit]);

  //* ------------------------ Handle Search ------------------------
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setOffset(0);
    setSales([]);
  };

  //* ------------------------ RenderItem ------------------------
  const renderItem = ({ item: sale }: { item: SaleDocument }) => {
    return (
      <TouchableOpacity
        key={sale.Id}
        className="p-4 border-b border-gray-200 h-20 justify-between overflow-hidden"
        onPress={() => console.log("Sale pressed", sale.Id)}
      >
        <Text className="italic text-sm">{sale.DocumentNumber}</Text>
        <View className="flex-row w-full h-full justify-between items-center pl-4">
          <View className="flex-row gap-1 h-full items-center">
            <Icon name="person" size={20} color="#1e40af" />
            <Text className="text-xs w-5/10 max-h-8">{sale.CustomerName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="h-full w-screen items-center">
      <View className="h-10 w-9.5/10 items-center bg-gray-200 mb-2">
        <TextInput
          className="h-full w-full px-2"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search"
        />
      </View>
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
            data={sales}
            renderItem={renderItem}
            keyExtractor={(item) => item.Id ? item.Id.toString() : Math.random().toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            onEndReached={() => {
              if (offset < totalPages * limit) {
                fetchSales();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default SalesList;
