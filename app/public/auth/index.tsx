import { RNButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { router } from "expo-router";
import { View } from "react-native";

export default function AuthRoot() {
    return (
        <Layout
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
            }}
        >
            <RNText variant="title" size="2xl">
                Welcome to OUI IMPACT
            </RNText>
            <RNText variant="secondary">
                Sign in or create your account to continue
            </RNText>

            <View
                style={{
                    alignItems: "stretch",
                    width: "100%",
                    gap: 12,
                    marginTop: 24,
                }}
            >
                <RNButton
                    onPress={() => {
                        router.push("/public/auth/login");
                    }}
                >
                    Log In
                </RNButton>
                <RNButton
                    onPress={() => {
                        router.push("/public/auth/register");
                    }}
                    variant="outline"
                >
                    Create Account
                </RNButton>
            </View>
        </Layout>
    );
}
