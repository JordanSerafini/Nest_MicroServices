import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
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
  
  const [scrollableLines, setScrollableLines] = useState<{ [key: string]: boolean }>({}); // État pour savoir si chaque ligne est défilable

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
    <View className="h-10/10 w-screen">
      {loading ? (
        <Text>Loading...</Text>
      ) : sale ? (
        <View>
          <View className="pb-4 p-2">
            <Text>Notes: {sale.NotesClear}</Text>
            <Text>Document Number: {DocumentNumber}</Text>
          </View>
          <View className="p-2 h-10/10 w-10/10">
            {/* -------------------------------------------------------- Lines []  ------------------------------------------------------------------ */}
            <View className="flex-row">
              <Text className="text-xs font-bold w-8/10 text-center border p-1">
                Description
              </Text>
              <Text className="text-xs font-bold w-2/10 text-center border-b border-t border-r p-1">
                Quantité
              </Text>
            </View>
            {docLines.length > 0 ? (
              docLines.map((line, index) => (
                <View
                  key={line.Id}
                  className={`w-full flex-row items-center max-h-16`} // max-h-16 comme hauteur maximale
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: index !== 0 ? 1 : 0,
                      borderBottomWidth: index === docLines.length - 1 ? 1 : 0,
                      position: "relative",
                    }}
                  >
                    <ScrollView
                      style={{ flex: 1 }}
                      onContentSizeChange={(width, height) => {
                        // Si la hauteur dépasse 16, alors elle est défilable
                        if (height > 64) {
                          setScrollableLines((prev) => ({
                            ...prev,
                            [line.Id]: true,
                          }));
                        } else {
                          setScrollableLines((prev) => ({
                            ...prev,
                            [line.Id]: false,
                          }));
                        }
                      }}
                    >
                      <Text className="text-xs p-1">{line.DescriptionClear}</Text>
                    </ScrollView>

                    {/* Afficher l'icône si la ligne est défilable */}
                    {scrollableLines[line.Id] && (
                      <View style={{ position: "absolute", bottom: 2, right: 2 }}>
                        <Icon name="arrow-drop-down-circle" size={20} color="#1e40af" />
                      </View>
                    )}
                  </View>

                  <Text
                    className={`text-xs w-2/10 border-r ${
                      index !== 0 ? "border-t" : ""
                    } ${index !== docLines.length - 1 ? "" : "border-b"}`}
                    style={{
                      textAlign: "center",
                      height: "100%",
                      textAlignVertical: "center",
                    }}
                  >
                    {line.Quantity}
                  </Text>
                </View>
              ))
            ) : (
              <Text>No document lines found.</Text>
            )}
          </View>
        </View>
      ) : (
        <Text>Document not found.</Text>
      )}
    </View>
  );
}

export default SaleDetail;
