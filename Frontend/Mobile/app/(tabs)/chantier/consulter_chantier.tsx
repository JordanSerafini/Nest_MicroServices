import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ConstructionSite } from "../../@types/chantier.type";
import { getChantiersPaginated } from "../../utils/functions/chantier_functions";
import Icon from "react-native-vector-icons/MaterialIcons";
import { router } from "expo-router";

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

  const handleChantierPress = (chantier: ConstructionSite) => {
    if (chantier.Id) {
      router.push({
        pathname: "/chantier/chantierDetail",
        params: { id: chantier.Id, name: chantier.CustomerId },
      });
    }
  };

  const renderItem = ({ item: chantier }: { item: ConstructionSite }) => (
    <TouchableOpacity
      key={chantier.id}
      className="p-4 border-b border-gray-200 h-20 justify-between overflow-hidden"
      onPress={() => handleChantierPress(chantier)}
    >
      <Text className="italic text-sm">{chantier.Caption}</Text>
      <View className="flex-row w-full h-full justify-between items-center pl-4">
        <View className="flex-row gap-1 h-full items-center">
          <Icon name="person" size={20} color="#1e40af" />
          <Text className="text-xs w-5/10 max-h-8">{chantier.customer?.Name}</Text>
        </View>
        <View className="flex-row gap-1 items-center w-5/10">
          <Icon name="schedule" size={20} color="#166534" />
          <Text className="text-xs">du {formatDate(chantier.StartDate)}</Text>
          <Text className="text-xs">au {formatDate(chantier.EndDate)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="pb-4 h-9.5/10 w-screen items-center">
      {/* Input de recherche */}
      <View className="h-10 w-9.5/10 items-center bg-gray-200 mb-2">
        <TextInput
          className="h-10/10 w-full px-2"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
        />
      </View>

      {/* Affichage du loader ou de la liste */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1e40af" />
        </View>
      ) : (
        <FlatList
          data={chantiers}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : Math.random().toString()
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default ConsulterChantier;
