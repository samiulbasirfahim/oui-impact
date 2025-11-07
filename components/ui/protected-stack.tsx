import Ionicons from "@expo/vector-icons/Ionicons";
import NOTIFICATION from "@/assets/svgs/notification.svg";
import { COLORS } from "@/constants";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export function RNProtectedStack() {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: COLORS.background,
                },

                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontFamily: "SuezOne",
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
                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                        </TouchableOpacity>
                    );
                },

                headerRight(props) {
                    return (
                        <TouchableOpacity
                            {...(props as any)}
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => {
                                router.push("/protected/others/notification");
                            }}
                        >
                            <NOTIFICATION width={40} height={40} />
                        </TouchableOpacity>
                    );
                },
            }}
        />
    );
}
