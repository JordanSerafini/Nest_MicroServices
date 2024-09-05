import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const ChantierScreen: React.FC = () => {
  const router = useRouter();

  const navigateToConsulterChantier = () => {
    router.push('/chantier/consulter_chantier');
  };

  const navigateToCreerChantier = () => {
    router.push('/chantier/Add_Chantier/creer_chantier');
  };

  return (
    <View style={styles.container}>
      <Text>Chantier Page</Text>
      <Button title="Consulter Chantier" onPress={navigateToConsulterChantier} />
      <Button title="Créer Chantier" onPress={navigateToCreerChantier} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChantierScreen;
