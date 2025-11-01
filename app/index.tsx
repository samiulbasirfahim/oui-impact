import { RNText } from "@/components/ui/text";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
            }}
        >
            <RNText size="xl" variant="title">
                Welcome to OUI IMPACT
            </RNText>
            <Link href={"/status"}>
                <RNText variant="accent" size="md">
                    Go to Status Screens
                </RNText>
            </Link>

            <Link href={"/onboarding/first"}>
                <RNText variant="accent" size="md">
                    Go to Onboarding Screens
                </RNText>
            </Link>

            <Link href={"/onboarding/first"}>
                <RNText variant="accent" size="md">
                    Go to Onboarding Screens
                </RNText>
            </Link>

            <Link href={"/public/reset-password"}>
                <RNText variant="accent" size="md">
                    Go to Reset Password Screen
                </RNText>
            </Link>
        </View>
    );
}
