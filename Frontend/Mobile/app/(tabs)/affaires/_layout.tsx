import { Stack } from 'expo-router';

export default function AffaireLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'affaire' }} />
    </Stack>
  );
}
