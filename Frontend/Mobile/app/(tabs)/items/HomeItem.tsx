import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Dimensions, ActivityIndicator, Touchable, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ButtonPerso from "../../components/UI/ButtonPerso";
import { getStockDocWithinDateRange } from "../../utils/functions/stock_function";
import { StockDocument } from "../../@types/item.type";
import Icon from "react-native-vector-icons/AntDesign";


interface HomeItemProps {
  onItemClick: () => void;
  onStockClick: () => void;
}

const HomeItem: React.FC<HomeItemProps> = ({ onItemClick, onStockClick }) => {
  const [stockDocuments, setStockDocuments] = useState<StockDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<{ startDate: string, endDate: string }>({ startDate: '', endDate: '' });
  const width = Dimensions.get("window").width;

  const formatDateToMidnight = (date: Date): string => {
    date.setHours(0, 0, 0, 0);
    return date.toISOString().split('T')[0] + 'T00:00:00';
  };

  useEffect(() => {
    const fetchStockDocuments = async () => {
      try {
        const endDate = formatDateToMidnight(new Date());
        const startDate = formatDateToMidnight(new Date(new Date().setDate(new Date().getDate() - 30)));
        const data = await getStockDocWithinDateRange(startDate, endDate);
        setStockDocuments(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des documents de stock:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockDocuments();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-9.5/10 w-9.5/10 justify-center items-center">
            <View className="h-1/3">
</View>
      <View className="h-1/3">
        <Text className="text-lg font-bold text-sky-900">Articles:</Text>
        <ButtonPerso
          mode="outlined"
          icon="account"
          text="Liste des articles"
          css="w-4.5/10 self-center"
          onPress={onItemClick}
        />
      </View>

      <View className="h-1/3 w-9/10 ">
      <View className="flex-row w-full justify-between items-center pb-3">
        <Text className="text-lg font-bold text-sky-900">Documents de stock :</Text>
        <TouchableOpacity onPress={onStockClick}>
          < Icon name="calendar" size={30} color="#1e40af" />
        </TouchableOpacity>
        </View>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay
          data={stockDocuments}
          scrollAnimationDuration={1000}
          renderItem={({ item, index }) => (
            <View
              key={index}
              className="rounded-lg w-6/10 h-20 items-center border"
            >
              
              <Text className="text-gray-600">{new Date(item.DocumentDate).toLocaleDateString()}</Text>
              <Text className="text-lg font-bold text-sky-900">{item.NumberPrefix}</Text>
            </View>
          )}
        />
        <ButtonPerso
        mode="outlined"
        icon="account"
        text="STOCK"
        css="w-4.5/10"
        onPress={onStockClick}
      />
      </View>

      
    </SafeAreaView>
  );
};

export default HomeItem;
