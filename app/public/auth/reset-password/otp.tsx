import { RNButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { OTPFields } from "@/components/ui/otp-input";
import { RNText } from "@/components/ui/text";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function OTPScreen() {
    const { t } = useTranslation();

    return (
        <Layout>
            {/* Title */}
            <RNText size="2xl" variant="title">
                {t("auth.reset.enterCode.title")}
            </RNText>

            {/* Subtitle */}
            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                {t("auth.verifyEmail.sent")} — {t("auth.verifyEmail.enterCode")}
            </RNText>

            {/* OTP Field */}
            <OTPFields
                label={t("auth.reset.enterCode.button")}
                numberOfDigits={6} // your translation says 6-digit
                onChange={(v) => {
                    console.log("OTP Code:", v);
                }}
            />

            {/* Verify / Submit */}
            <RNButton
                onPress={() => {
                    router.push("/public/auth/reset-password/new-password");
                }}
                style={{ marginTop: 12 }}
            >
                {t("auth.reset.enterCode.button")}
            </RNButton>

            {/* Resend */}
            <RNButton variant="ghost">{t("auth.reset.enterCode.resend")}</RNButton>
        </Layout>
    );
}
