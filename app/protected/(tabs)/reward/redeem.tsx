import { RNText } from "@/components/ui/text";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function Screen() {
    return (
        <>
            <Stack.Screen options={{ title: "Redeem Points" }} />
            <View>
                <RNText>Redeem your points here!</RNText>
            </View>
        </>
    );
}
