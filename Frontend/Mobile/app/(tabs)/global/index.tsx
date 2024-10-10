import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SaleDocument } from "../../@types/sales/SaleDocument.type";
import { Deal } from "../../@types/deals/Deal.entity";
import { getSalePaginated } from "../../utils/functions/sale_function";
import { getChantiersPaginated } from "../../utils/functions/chantier_functions";
import { getDealPaginated } from "../../utils/functions/deals_function";
import { ConstructionSite } from "../../@types/chantier.type";

function Index({ typess }: { typess: string }) {
  const [data, setData] = useState<(SaleDocument | Deal)[]>([]); // Les données affichées
  const [currentModule, setCurrentModule] = useState<string | null>(null); // Module courant

  const [totalPages, setTotalPages] = useState(0); // Nombre total de pages pour la pagination
  const [searchQuery, setSearchQuery] = useState<string>(""); // Query de recherche
  const [limit, setLimit] = useState<number>(10); // Limite d'éléments par page
  const [offset, setOffset] = useState<number>(0); // Offset pour la pagination
  const [loading, setLoading] = useState(true); // État de chargement initial
  const [loadingMore, setLoadingMore] = useState(false); // État de chargement supplémentaire (infinite scroll)
  const [error, setError] = useState<any>(null); // Pour gérer les erreurs

  let type = "Ventes"; // Variable pour définir le type de données affichées

  //* ---------------------- Fonction générique pour fetch les données
  const fetchData = async (
    fetchFunction: Function,
    query: string,
    limit: number,
    offset: number,
    newSearch = false
  ) => {
    if (loadingMore || loading) return; // Empêche les appels multiples
    setLoadingMore(true); // Active le chargement supplémentaire
    
    console.log("Fetching data...");
    try {
      const result = await fetchFunction(query, limit, offset);
      console.log("Fetch result: ", result);
      
      let fetchedData = [];
      let totalPages = 0;

      // Adapter en fonction du module
      if (currentModule === "Sales") {
        fetchedData = result.saleDocuments || [];
        totalPages = result.totalPages || 0;
      } else if (currentModule === "Chantiers") {
        fetchedData = result.chantiers || [];
        totalPages = result.totalPages || 0;
      } else if (currentModule === "Affaires") {
        fetchedData = result.deals || [];
        totalPages = result.totalPages || 0;
      }

      console.log("Fetched Data: ", fetchedData);

      if (fetchedData.length > 0) {
        // Si c'est une nouvelle recherche, on remplace les données, sinon on ajoute
        setData((prevData) =>
          newSearch ? fetchedData : [...prevData, ...fetchedData]
        );
        setTotalPages(totalPages); // Met à jour le nombre total de pages
        setOffset(newSearch ? limit : offset + limit); // Met à jour l'offset
      } else {
        console.log("No data found for the module.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err); // Gère l'erreur
    } finally {
      setLoading(false); // Désactive le chargement initial
      setLoadingMore(false); // Désactive le chargement supplémentaire
    }
  };

  //* ---------------------- UseEffect setup currentModule + surveille changement de page
  useEffect(() => {
    switch (type) {
      case "Ventes":
        setCurrentModule("Sales");
        break;
      case "Chantiers":
        setCurrentModule("Chantiers");
        break;
      case "Devis":
        setCurrentModule("Affaires");
        break;
      default:
        setCurrentModule(null);
    }
  }, [type]);

  //* ---------------------- UseEffect fetch info en fonction du module
  useEffect(() => {
    if (!currentModule) return;

    console.log("Current Module: ", currentModule); // Log le module actuel

    switch (currentModule) {
      case "Sales":
        fetchData(getSalePaginated, searchQuery, limit, offset, true);
        break;
      case "Chantiers":
        fetchData(getChantiersPaginated, searchQuery, limit, offset, true);
        break;
      case "Affaires":
        fetchData(getDealPaginated, searchQuery, limit, offset, true);
        break;
      default:
        break;
    }
  }, [currentModule, searchQuery, limit, offset]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  //* ---------------------- Fonction pour charger plus de données quand on arrive en bas
  const loadMoreData = () => {
    if (offset < totalPages * limit) {
      console.log("Loading more data..."); // Debugging
      fetchData(
        currentModule === "Sales" ? getSalePaginated : currentModule === "Chantiers" ? getChantiersPaginated : getDealPaginated,
        searchQuery,
        limit,
        offset
      );
    }
  };

  console.log("Data: ", data); 

  //* ---------------------- Fonction de rendu conditionnel en fonction du module
  const renderItem = ({ item }: { item: SaleDocument | Deal }) => {
    if (currentModule === "Sales") {
      const sale = item as SaleDocument;
      return (
        <View style={{ padding: 20 }}>
          <Text>Document Number: {sale.DocumentNumber}</Text>
          <Text>Customer: {sale.CustomerName}</Text>
        </View>
      );
    } else if (currentModule === "Affaires") {
      const deal = item as Deal;
      return (
        <View style={{ padding: 20 }}>
        <Text className="italic text-sm">{deal.Id}</Text>
            <Text className="text-xs w-5/10 max-h-8">{deal.Caption}</Text>
            <Text className="text-xs w-5/10 max-h-8">{formatDate(deal.DealDate)}</Text>
        </View>
      );
    } else if (currentModule === "Chantiers") {
      const chantier = item as ConstructionSite;
      return (
        <View style={{ padding: 20 }}>
          <Text>Chantier Caption: {chantier.Caption}</Text>
          <Text>Customer: {chantier.customer?.Name}</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>{type}</Text>
      
      {/* Liste des données */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" /> : null}
      />
    </View>
  );
}

export default Index;
