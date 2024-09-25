import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getSalePaginated } from "../../utils/functions/sale_function";
import { useEffect, useState } from "react";
import { SaleDocument } from "../../@types/sales/SaleDocument.type";
import Icon from "react-native-vector-icons/MaterialIcons";

function SalesList() {
  const [sales, setSales] = useState<SaleDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);

  //* ------------------------ Fetch Sales ------------------------
  const fetchSales = async () => {
    try {
      const data = await getSalePaginated(searchQuery, limit, offset);
      setSales(data.saleDocuments);
    } catch (error: any) {
      console.error("Error fetching sales:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [searchQuery, limit, offset]);

  //* ------------------------ Handle Search ------------------------
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setOffset(0);
  };

  //* ------------------------ RenderItem ------------------------
  const renderItem = ({ item: sale }: { item: SaleDocument }) => {
    return (
      <TouchableOpacity
        key={sale.Id}
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderColor: 'gray',
          justifyContent: 'space-between',
        }}
        onPress={() => console.log("Sale pressed", sale.Id)}
      >
        <Text style={{ fontStyle: 'italic', fontSize: 12 }}>{sale.DocumentNumber}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="person" size={20} color="#1e40af" />
            <Text style={{ fontSize: 12 }}>{sale.CustomerName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ height: 40, width: '95%', backgroundColor: 'lightgray', marginBottom: 10 }}>
        <TextInput
          style={{ height: '100%', width: '100%', paddingLeft: 10 }}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search"
        />
      </View>
      <FlatList
        data={sales}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

export default SalesList;
