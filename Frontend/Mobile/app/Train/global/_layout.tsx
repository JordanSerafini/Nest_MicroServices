import { Stack } from "expo-router";

export default function GlobalLayout() {
    return (
        <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: "Global" }} />
        </Stack>
    );
    }