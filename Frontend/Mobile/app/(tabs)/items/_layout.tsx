import { Stack } from "expo-router";

export default function ItemLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Stock Documents" }}
      />
      <Stack.Screen
        name="StockDocumentList"
        options={{
          headerShown: false,
          title: "Liste article",
          headerStyle: {
            backgroundColor: "#1e3a8a",
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="stockDocumentDetail"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1e3a8a",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
