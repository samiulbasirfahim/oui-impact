import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export function RNPublicStack({
    title,
    transparent,
}: {
    title?: string;
    transparent?: boolean;
}) {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerTitle: title ? title : "",
                headerStyle: {
                    backgroundColor: transparent ? "transparent" : COLORS.background,
                },
                headerTransparent: transparent ? true : false,
                headerLeft(props) {
                    return (
                        <TouchableOpacity
                            {...(props as any)}
                            style={{
                                height: 40,
                                width: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 8,
                            }}
                            onPress={() => {
                                if (router.canGoBack()) {
                                    router.back();
                                }
                            }}
                        >
                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                        </TouchableOpacity>
                    );
                },
            }}
        />
    );
}
