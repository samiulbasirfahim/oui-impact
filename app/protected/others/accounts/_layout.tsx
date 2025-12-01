import { RNProtectedStack } from "@/components/ui/protected-stack";
import { Stack } from "expo-router";

export default function AccountLayout() {
    return <>
        <Stack.Screen options={{ headerShown: false }} />
        <RNProtectedStack />
    </>;
}
