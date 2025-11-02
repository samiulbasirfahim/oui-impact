import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/constants";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export function RNPublicStack() {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerTitle: "",
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
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
                            <AntDesign name="arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                    );
                },
            }}
        />
    );
}
