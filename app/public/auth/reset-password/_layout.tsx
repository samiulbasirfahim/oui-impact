import { COLORS } from "@/constants";
import { Stack } from "expo-router";

export default function ResetPasswordLayout() {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerTitle: "",
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
            }}
        />
    );
}
