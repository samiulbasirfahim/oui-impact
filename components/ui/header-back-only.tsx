import { router } from "expo-router";
import { View } from "react-native";
import { RNButton } from "./button";

export function HeaderBackOnly() {
    if (router.canGoBack()) {
        return (
            <View
                style={{
                    height: 40,
                    width: "100%",
                    justifyContent: "center",
                    marginBottom: 24,
                    alignItems: "flex-start",
                }}
            >
                <RNButton variant="ghost" onPress={() => router.back()}>
                </RNButton>
            </View>
        );
    }
}
