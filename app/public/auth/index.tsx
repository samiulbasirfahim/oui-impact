import { RNButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function AuthRoot() {
    const { t } = useTranslation();

    return (
        <Layout
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
            }}
        >
            {/* TITLE */}
            <RNText variant="title" size="2xl">
                {t("auth.root.title")}
            </RNText>

            {/* SUBTITLE */}
            <RNText variant="secondary">{t("auth.root.subtitle")}</RNText>

            <View
                style={{
                    alignItems: "stretch",
                    width: "100%",
                    gap: 12,
                    marginTop: 24,
                }}
            >
                {/* LOGIN BUTTON */}
                <RNButton
                    onPress={() => {
                        router.push("/public/auth/login");
                    }}
                >
                    {t("auth.root.button1")}
                </RNButton>

                {/* CREATE ACCOUNT BUTTON */}
                <RNButton
                    onPress={() => {
                        router.push("/public/auth/register");
                    }}
                    variant="outline"
                >
                    {t("auth.root.button2")}
                </RNButton>
            </View>
        </Layout>
    );
}
