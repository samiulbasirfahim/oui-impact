import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { fetcher } from "@/lib/fetcher";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function EmailScreen() {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [err, setErr] = useState("");

    const handleSubmit = () => {
        if (!email) return;
        setIsLoading(true);

        fetcher("/auth/resend-otp/", {
            method: "POST",
            body: {
                email,
            },
            auth: false,
        })
            .then(() => {
                router.push({
                    pathname: "/public/auth/reset-password/otp",
                    params: { email },
                });
            })
            .catch((error) => {
                console.log("Error resending OTP:", error);
                setErr("Failed to resend OTP. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

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
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ marginTop: 24 }}
            />

            {/* Continue button */}
            <RNButton
                loading={isLoading}
                onPress={handleSubmit}
                style={{ marginTop: 12 }}
            >
                {t("auth.reset.request.button")}
            </RNButton>

            {err ? (
                <RNText
                    size="sm"
                    style={{ marginTop: 8, color: COLORS.accent, textAlign: "center" }}
                >
                    {err}
                </RNText>
            ) : null}
        </Layout>
    );
}
