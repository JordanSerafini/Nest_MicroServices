import { Stack } from 'expo-router';

export default function ChantierLayout() {
  return (
    <Stack>
      <Stack.Screen name="creer_chantier" options={{ headerShown: false, title: 'Ajouter un Chantier' }} />
      <Stack.Screen name="creer_fiche_chantier" options={{ title: 'Ajouter une fiche chantier' }} />
    </Stack>
  );
}
