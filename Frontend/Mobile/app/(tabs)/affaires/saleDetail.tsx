import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  getSaleById,
  getLineByDocumentId,
} from "../../utils/functions/sale_function";
import { SaleDocumentWithLines } from "../../@types/sales/SaleDocument.type";
import { SaleDocumentLine } from "../../@types/sales/SaleDocumentLine.type";

function SaleDetail() {
  const { Id, name, DocumentNumber } = useLocalSearchParams();
  const navigation = useNavigation();

  const [sale, setSale] = useState<SaleDocumentWithLines | null>(null);
  const [docLines, setDocLines] = useState<SaleDocumentLine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //* --------- fetch Doc and Lines --------- *//
  const fetchDocAndLines = async (DocumentId: string) => {
    try {
      const responseDoc = await getSaleById(DocumentId);
      const responselines = await getLineByDocumentId(DocumentId);

      setSale(responseDoc);
      setDocLines(responselines);
    } catch (error: any) {
      console.error("Error fetching sale and lines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Id) {
      fetchDocAndLines(Id as string);
    }
  }, [Id]);

  useEffect(() => {
    if (name) {
      navigation.setOptions({ title: `${DocumentNumber}` });
    }
  }, [name, DocumentNumber, navigation]);

  //* ------------------- Return ------------------- *//
  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : sale ? (
        <View>
          <View className="pb-4 p-2">
            <Text>Notes: {sale.NotesClear}</Text>
            <Text>Document Number: {DocumentNumber}</Text>
          </View>
          <View className="p-2">
            {/* -------------------------------------------------------- Lines []  ------------------------------------------------------------------ */}
            {docLines.length > 0 ? (
              docLines.map((line) => (
                <View key={line.Id}>
                  <Text>{line.DescriptionClear} </Text>
                  <Text>Quantity: {line.Quantity}</Text>
                </View>
              ))
            ) : (
              <Text>No document lines found.</Text>
            )}
          </View>
        </View>
      ) : (
        <Text>No sale found</Text>
      )}
    </View>
  );
}

export default SaleDetail;
