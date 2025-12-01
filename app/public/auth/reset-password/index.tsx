import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function EmailScreen() {
    const { t } = useTranslation();

    return (
        <Layout>
            {/* Title */}
            <RNText size="2xl" variant="title">
                {t("auth.reset.request.title")}
            </RNText>

            {/* Subtitle */}
            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                {t("auth.reset.request.subtitle")}
            </RNText>

            {/* Email input */}
            <RNInput
                label={t("auth.createAccount.email")}
                keyboardType="email-address"
            />

            {/* Continue button */}
            <RNButton
                onPress={() => {
                    router.push("/public/auth/reset-password/otp");
                }}
                style={{ marginTop: 12 }}
            >
                {t("auth.reset.request.button")}
            </RNButton>
        </Layout>
    );
}
