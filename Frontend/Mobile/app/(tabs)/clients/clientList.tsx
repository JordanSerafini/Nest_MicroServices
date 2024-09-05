import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { getCustomersPaginated } from "../../utils/functions/customer_functions";
import { Customer } from "../../@types/customer.type";
import { Menu, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const ClientScreen: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedPhones, setSelectedPhones] = useState<string[]>([]);
  const [menuAnchor, setMenuAnchor] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const router = useRouter();

  const fetchCustomers = async (newSearch = false) => {
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const data = await getCustomersPaginated(searchQuery, limit, newSearch ? 0 : offset);
      setCustomers((prevCustomers) => newSearch ? data.customers : [...prevCustomers, ...data.customers]);
      setTotalPages(data.totalPages);
      setTotalCustomers(data.totalCustomers);
      setOffset(newSearch ? limit : offset + limit);
    } catch (error) {
      setError(error);
    }
    setLoadingMore(false);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchCustomers(true);
  }, [searchQuery, limit]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setOffset(0);
    setCustomers([]);
  };

  const handleCustomerPress = (customer: Customer) => {
    if (customer.Id) {
      router.push({
        pathname: "/clients/clientDetail",
        params: { id: customer.id, name: customer.Name },
      });
    }
  };

  const handlePhonePress = (phones: string[], event: any) => {
    if (phones.length === 1) {
      Linking.openURL(`tel:${phones[0]}`);
    } else {
      setSelectedPhones(phones);
      setMenuAnchor({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
      setMenuVisible(true);
    }
  };

  return (
    <Provider>
      <View className="h-full w-screen items-center">
        <View className="h-10 w-9.5/10 items-center bg-gray-200 mb-2">
          <TextInput
            className="h-10/10 w-full px-2 "
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search"
          />
        </View>
        {loading && offset === 0 ? (
          <View className="h-8/10 flex items-center justify-center w-full gap-2 flex-row">
            <Text>Loading...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : error ? (
          <Text className="text-red-500">Error: {error.message}</Text>
        ) : (
          <FlatList
            data={customers}
            className="max-h-8.5/10 w-full "
            keyExtractor={(item) =>
              item.Id ? item.Id.toString() : Math.random().toString()
            }
            renderItem={({ item }) => (
              <View className="p-4 border-b border-gray-200 flex flex-row justify-between">
                <TouchableOpacity onPress={() => handleCustomerPress(item)}>
                  <Text>{item.Name ?? "Unknown"}</Text>
                </TouchableOpacity>
                {(item.MainDeliveryContact_Phone ||
                  item.MainInvoicingContact_Phone ||
                  item.MainInvoicingContact_Cellphone ||
                  item.MainDeliveryContact_CellPhone) && (
                  <TouchableOpacity
                    onPress={(event) =>
                      handlePhonePress(
                        [
                          item.MainDeliveryContact_Phone,
                          item.MainInvoicingContact_Phone,
                          item.MainInvoicingContact_Cellphone,
                          item.MainDeliveryContact_CellPhone,
                        ].filter(Boolean) as string[],
                        event
                      )
                    }
                  >
                    <Icon name="phone" size={24} color="#3B82F6" />
                  </TouchableOpacity>
                )}
              </View>
            )}
            onEndReached={() => {
              if (offset < totalPages * limit) {
                fetchCustomers();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
          />
        )}
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={menuAnchor}
        >
          {selectedPhones.map((phone, index) => (
            <Menu.Item
              key={index}
              onPress={() => {
                setMenuVisible(false);
                Linking.openURL(`tel:${phone}`);
              }}
              title={phone}
            />
          ))}
        </Menu>
      </View>
    </Provider>
  );
};

export default ClientScreen;
