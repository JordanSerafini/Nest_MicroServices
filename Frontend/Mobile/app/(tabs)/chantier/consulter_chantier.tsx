import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConsulterChantier: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Consulter Chantier</Text>
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

export default ConsulterChantier;
