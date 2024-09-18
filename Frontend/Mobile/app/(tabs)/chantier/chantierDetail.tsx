import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { getChantierById } from "../../utils/functions/chantier_functions";
import { ConstructionSite } from "../../@types/chantier.type";

function chaniterDetail() {
    const [chantier, setChantier] = useState<ConstructionSite>();
    const { id, name } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const navigation = useNavigation();


    useEffect(() => {
      if (name) {
        navigation.setOptions({ title: `${name}` });
      }

      const fetchChantiers = async (chantierId: number) => {
        setLoading(true);
        try {
          const data = await getChantierById(chantierId);
          setChantier(data);
          setLoading(false);
        } catch (fetchError) {
          console.error("Error fetching chantier:", fetchError);
          setError(fetchError);
          setLoading(false);
        }
      };
      fetchChantiers(Number(id));
    }, [id, name, navigation]);

  return (
    <View></View>
  )
}

export default chaniterDetail