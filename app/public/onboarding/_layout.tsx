import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function OnboardingLayout() {
    return (
        <Stack
            screenOptions={{
                headerTransparent: true,
                headerTitle: "",

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

                // headerShown: false,
            }}
        />
    );
}
