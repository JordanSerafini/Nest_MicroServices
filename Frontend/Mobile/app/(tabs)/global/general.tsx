import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Modal,
    ScrollView,
    Animated,
  } from "react-native";
  import React, { useEffect, useState, useRef } from "react";
  import { SaleDocument } from "../../@types/sales/SaleDocument.type";
  import { Deal } from "../../@types/deals/Deal.entity";
  import { getSalePaginated } from "../../utils/functions/sale_function";
  import { getChantiersPaginated } from "../../utils/functions/chantier_functions";
  import { getDealPaginated } from "../../utils/functions/deals_function";
  
  function General({ type }: { type: string }) {
    const [data, setData] = useState<(SaleDocument | Deal)[]>([]);
    const [currentModule, setCurrentModule] = useState<string | null>(null);
  
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [limit, setLimit] = useState<number>(10);
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<any>(null);
  
    //* ---------------------- Fonction générique pour fetch les données
    const fetchData = async (
      fetchFunction: Function, 
      query: string,
      limit: number,
      offset: number,
      newSearch = false
    ) => {
      if (loadingMore || loading) return;
      setLoadingMore(true);
  
      try {
        const result = await fetchFunction(query, limit, offset);
        setData((prevData) =>
          newSearch ? result.data : [...prevData, ...result.data]
        );
        setTotalPages(result.totalPages);
        setOffset(newSearch ? limit : offset + limit);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
  
    //* ---------------------- UseEffect setup currentModule + surveille changement page
    useEffect(() => {
      switch (type) {
        case "Affaires":
          setCurrentModule("Sales");
          break;
        case "Chantiers":
          setCurrentModule("Chantiers");
          break;
        case "Devis":
          setCurrentModule("Devis");
          break;
        default:
          setCurrentModule(null);
      }
    }, [type]);
  
    //* ---------------------- UseEffect fetch info en fonction du module
    useEffect(() => {
      if (!currentModule) return;
  
      switch (currentModule) {
        case "Sales":
          fetchData(getSalePaginated, searchQuery, limit, offset);
          break;
        case "Chantiers":
          fetchData(getChantiersPaginated, searchQuery, limit, offset);
          break;
        case "Affaires":
          fetchData(getDealPaginated, searchQuery, limit, offset);
          break;
        default:
          break;
      }
    }, [currentModule, searchQuery, limit, offset]);
  
    //* ---------------------- Fonction pour charger plus de données quand on arrive en bas
    const loadMoreData = () => {
      if (offset < totalPages * limit) {
        fetchData(getDealPaginated, searchQuery, limit, offset); // Charger plus de données
      }
    };
  
    return (
      <View style={{ flex: 1 }}>
        {/* Barre de recherche ou autres éléments ici */}
        
        {/* Liste des données */}
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{ padding: 20 }}>
              <Text></Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" /> : null}
        />
      </View>
    );
  }
  
  export default General;
  