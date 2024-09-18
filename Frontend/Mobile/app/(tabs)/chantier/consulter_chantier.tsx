import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConstructionSite } from "../../@types/chantier.type";
import { getChantiersPaginated } from "../../utils/functions/chantier_functions";
import Icon from "react-native-vector-icons/MaterialIcons";

const ConsulterChantier: React.FC = () => {
  const [chantiers, setChantiers] = useState<ConstructionSite[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalChantiers, setTotalChantiers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchChantiers = async (newSearch = false) => {
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const data = await getChantiersPaginated(
        searchQuery,
        limit,
        newSearch ? 0 : offset
      );

      // Trier les chantiers par StartDate
      const sortedChantiers = data.chantiers.sort((a: any, b: any) => {
        const dateA = new Date(a.StartDate);
        const dateB = new Date(b.StartDate);
        return dateA.getTime() - dateB.getTime();
      });

      setChantiers((prevChantiers) =>
        newSearch ? sortedChantiers : [...prevChantiers, ...sortedChantiers]
      );

      setTotalPages(data.totalPages);
      setTotalChantiers(data.totalChantiers);
      setOffset(newSearch ? limit : offset + limit);
    } catch (error) {
      setError(error);
    }
    setLoadingMore(false);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchChantiers(true);
  }, [searchQuery, limit]);

  function formatDate(date: Date | string | undefined): string {
    if (!date) {
      return "Date non précisée";
    }

    if (typeof date === "string") {
      date = new Date(date);
    }

    if (isNaN((date as Date).getTime())) {
      return "Date invalide";
    }

    const day = String((date as Date).getDate()).padStart(2, "0");
    const month = String((date as Date).getMonth() + 1).padStart(2, "0");
    const year = (date as Date).getFullYear();

    return `${day}/${month}`;
  }

  return (
    <SafeAreaView className="h-full w-screen items-center">
      <View className="h-10 w-9.5/10 items-center bg-gray-200 mb-2">
        <TextInput
          className="h-10/10 w-full px-2 "
          value={searchQuery}
          //onChangeText={handleSearch}
          placeholder="Search"
        />
      </View>
      <ScrollView className="w-full h-full">
        {chantiers.map((chantier) => (
          <TouchableOpacity
            key={chantier.id}
            className="p-4 border-b border-gray-200 h-24 justify-between overflow-hidden"
          >
            <Text className="italic text-sm">{chantier.Caption}</Text>
            <View className="flex-row w-10/10  justify-between items-center pl-4">
              <View className="flex-row gap-1 h-full items-center">
                <Icon name="person" size={20} color="#1e40af" />
                <Text className="text-xs w-5/10 ">{chantier.customer?.Name}</Text>
              </View>
              <View className="flex-row gap-1 items-center w-5/10">
                <Icon name="schedule" size={20} color="#166534" />
                <Text className="text-xs">du {formatDate(chantier.StartDate)}</Text>
                <Text className="text-xs">au {formatDate(chantier.EndDate)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConsulterChantier;
