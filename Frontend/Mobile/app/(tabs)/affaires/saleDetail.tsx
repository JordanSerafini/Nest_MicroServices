import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, LayoutChangeEvent } from "react-native";
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

  const [expandedLines, setExpandedLines] = useState<{ [key: string]: boolean }>({});
  const [scrollableLines, setScrollableLines] = useState<{ [key: string]: boolean }>({});

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

  //* Fonction pour basculer l'état d'expansion d'une ligne
  const toggleLineExpansion = (lineId: string) => {
    setExpandedLines((prev) => ({
      ...prev,
      [lineId]: !prev[lineId], 
    }));
  };

  //* Fonction pour déterminer si une ligne doit être défilable (si la hauteur dépasse 64px)
  const handleLayout = (lineId: string, event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 64 && !expandedLines[lineId]) {
      setScrollableLines((prev) => ({
        ...prev,
        [lineId]: true,
      }));
    } else {
      setScrollableLines((prev) => ({
        ...prev,
        [lineId]: false,
      }));
    }
  };

  //* ------------------- Return ------------------- *//
  return (
    <ScrollView className="h-10/10 w-screen">
      {loading ? (
        <Text>Loading...</Text>
      ) : sale ? (
        <View>
          <View className="pb-4 p-2">
            <Text>Notes: {sale.NotesClear}</Text>
            <Text>Document Number: {DocumentNumber}</Text>
          </View>
          <View className="p-2 w-10/10">
            {/* -------------------------------------------------------- Header des lignes -------------------------------------------------------- */}
            <View className="flex-row">
              <Text className="text-xs font-bold w-8/10 text-center border p-1">
                Description
              </Text>
              <Text className="text-xs font-bold w-2/10 text-center border-b border-t border-r p-1">
                Quantité
              </Text>
            </View>

            {/* -------------------------------------------------------- Liste des lignes -------------------------------------------------------- */}
            {docLines.length > 0 ? (
              docLines.map((line, index) => (
                <View
                  key={line.Id}
                  className={`w-full flex-row items-center`}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: index !== 0 ? 1 : 0,
                      borderBottomWidth: index === docLines.length - 1 ? 1 : 0,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => toggleLineExpansion(line.Id)}
                      activeOpacity={0.6}
                      style={{ flex: 1 }}
                    >
                      <View
                        onLayout={(event) => handleLayout(line.Id, event)}
                        style={{
                          padding: 8,
                          maxHeight: expandedLines[line.Id] ? undefined : 64,
                          overflow: expandedLines[line.Id] ? "visible" : "hidden",
                          position: "relative"
                        }}
                      >
                        <Text style={{ fontSize: 12 }}>{line.DescriptionClear}</Text>

                        {!expandedLines[line.Id] && scrollableLines[line.Id] && (
                          <View style={{ position: "absolute", bottom: 2, right: 2 }}>
                            <Icon name="arrow-drop-down-circle" size={14} color="#1e40af" />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
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
    </ScrollView>
  );
}

export default SaleDetail;
