import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";
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

  const [expandedLines, setExpandedLines] = useState<{
    [key: string]: boolean;
  }>({});
  const [scrollableLines, setScrollableLines] = useState<{
    [key: string]: boolean;
  }>({});

  //* --------- fetch Doc and Lines --------- *//
  const fetchDocAndLines = async (DocumentId: string) => {
    try {
      const responseDoc = await getSaleById(DocumentId);
      let responselines = await getLineByDocumentId(DocumentId);

      // Filtrer les lignes ayant quantité 0 et sans description
      responselines = filterLines(responselines);

      setSale(responseDoc);
      setDocLines(responselines);
    } catch (error: any) {
      console.error("Error fetching sale and lines:", error);
    } finally {
      setLoading(false);
    }
  };

  //* Fonction de filtrage pour supprimer les lignes avec quantité 0 ou sans description
  const filterLines = (lines: SaleDocumentLine[]) => {
    return lines.filter(
      (line) =>
        line.Quantity !== 0 &&
        line.DescriptionClear &&
        line.DescriptionClear.trim() !== ""
    );
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

  //* Fonction pour calculer le total
  const calculateTotal = () => {
    return docLines.reduce((total, line) => {
      return total + line.Quantity * line.NetPriceVatExcluded;
    }, 0);
  };

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
        [lineId]: true, // La ligne est défilable car elle dépasse 64px
      }));
    } else {
      setScrollableLines((prev) => ({
        ...prev,
        [lineId]: false, // La ligne n'est pas défilable
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
            {docLines.length > 0 && (
              <View className="flex-row">
                <Text
                  className="text-xs font-bold w-7/10 text-center border p-1"
                  style={{
                    justifyContent: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Description
                </Text>
                <Text
                  className="text-xs font-bold w-1.5/10 text-center border-b border-t border-r p-1"
                  style={{
                    justifyContent: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Qtité
                </Text>
                <Text
                  className="text-xs font-bold w-1.5/10 text-center border-b border-t border-r p-1"
                  style={{
                    justifyContent: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Prix
                </Text>
              </View>
            )}

            {/* -------------------------------------------------------- Liste des lignes -------------------------------------------------------- */}
            {docLines.length > 0 ? (
              docLines.map((line, index) => (
                <View key={line.Id} className={`w-full flex-row items-center`}>
                  <View
                    style={{
                      flexDirection: "row",
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderTopWidth: index !== 0 ? 1 : 0,
                      borderBottomWidth: index === docLines.length - 1 ? 1 : 0,
                      width: "100%",
                    }}
                  >
                    {/* Colonne Description */}
                    <TouchableOpacity
                      onPress={() => toggleLineExpansion(line.Id)}
                      activeOpacity={0.6}
                      style={{ width: "70%" }}
                    >
                      <View
                        onLayout={(event) => handleLayout(line.Id, event)}
                        style={{
                          padding: 8,
                          maxHeight: expandedLines[line.Id] ? undefined : 64,
                          overflow: expandedLines[line.Id]
                            ? "visible"
                            : "hidden",
                          position: "relative",
                          borderRightWidth: 1,
                        }}
                      >
                        <Text style={{ fontSize: 12 }}>
                          {line.DescriptionClear}
                        </Text>

                        {!expandedLines[line.Id] &&
                          scrollableLines[line.Id] && (
                            <View
                              style={{
                                position: "absolute",
                                bottom: 2,
                                right: 2,
                              }}
                            >
                              <Icon
                                name="arrow-drop-down-circle"
                                size={14}
                                color="#1e40af"
                              />
                            </View>
                          )}
                      </View>
                    </TouchableOpacity>

                    {/* Colonne Quantité */}
                    <View
                      style={{
                        width: "15%",
                        justifyContent: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 12 }}>
                        {line.Quantity}
                      </Text>
                    </View>

                    {/* Colonne Prix */}
                    <View
                      style={{
                        width: "15%",
                        justifyContent: "center",
                        borderRightWidth: 1,
                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 12 }}>
                        {line.NetPriceVatExcluded}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text>No document lines found.</Text>
            )}

            {/* -------------------------------------------------------- Total -------------------------------------------------------- */}
            {docLines  && (

            <View className="flex-row mt-2">
              <Text
                className="text-xs font-bold w-7/10 text-center border p-1"
                style={{
                  justifyContent: "center",
                  textAlignVertical: "center",
                  letterSpacing:4,
                }}
              >
                Total
              </Text>
              <Text
                className="text-xs font-bold w-3/10 text-center border-b border-t border-r p-1"
                style={{
                  justifyContent: "center",
                  textAlignVertical: "center",
                }}
              >
                {calculateTotal().toFixed(2)} €
              </Text>
            </View>
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
