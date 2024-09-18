import { Stack } from "expo-router";

export default function ChantierLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Chantier" }}
      />
      <Stack.Screen
        name="consulter_chantier"
        options={{ headerShown: false, title: "Consulter Chantier" }}
      />
      <Stack.Screen
        name="Add_Chantier"
        options={{ title: "Ajouter un Chantier", headerShown: false }}
      />
      <Stack.Screen
        name="chantierDetail"
        options={{
          headerShown: true,
          title: "Chantier Details",
          headerStyle: {
            backgroundColor: "#1e3a8a",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
