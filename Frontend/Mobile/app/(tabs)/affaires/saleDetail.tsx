import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native"
import { getSaleById, getLineByDocumentId } from "../../utils/functions/sale_function";

function saleDetail() {
    const { Id, name, DocumentNumber } = useLocalSearchParams();
    const navigation = useNavigation();

    const [sale, setSale] = useState(null);
    const [docLines, setDocLines] = useState(null);

    //* --------- fetch Doc and Lines --------- *//
    const fetchDocAndLines  = async (DocumentId: string) => {
        try {
        const responseDoc = await getSaleById(DocumentId);
        const responselines = await getLineByDocumentId(DocumentId);

        setSale(responseDoc);
        setDocLines(responselines);

        } catch (error: any) {
            console.error("Error fetching sale and lines:", error);
        }

    }

    useEffect(() => {
        if (Id) {
            fetchDocAndLines(Id as string);
        }
    }, [Id])

console.log(sale, docLines)
    useEffect(() => {
        if (name) {
          navigation.setOptions({ title: `${DocumentNumber}` });
        }})

  return (
    <View>
        <Text>saleDetail</Text>
    </View>
  )
}

export default saleDetail