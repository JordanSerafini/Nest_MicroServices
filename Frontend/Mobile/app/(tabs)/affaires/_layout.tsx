import { Stack } from 'expo-router';

export default function AffaireLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'affaire' }} />
      <Stack.Screen 
        name="saleDetail" 
        options={{ 
          headerShown: true, 
          title: 'Sale Details',
          headerStyle: {
            backgroundColor: '#1e3a8a',
          },
          headerTintColor: '#fff', 
        }}
      />
    </Stack>
  );
}
