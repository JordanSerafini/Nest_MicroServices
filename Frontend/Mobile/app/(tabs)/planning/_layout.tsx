import { Stack } from 'expo-router';

export default function ClientLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'planning / calendrier' }} />
      
    </Stack>
  );
}
