import { RNButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { OTPFields } from "@/components/ui/otp-input";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { fetcher } from "@/lib/fetcher";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function OTPScreen() {
    const { t } = useTranslation();
    const { email } = useLocalSearchParams<{ email: string }>();

    const [isLoading, setIsLoading] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = () => {
        if (otpCode.length !== 6) {
            return;
        }

        setIsLoading(true);

        fetcher("/auth/verify-otp/", {
            method: "POST",
            body: {
                otp: otpCode,
                email,
            },
            auth: false,
        })
            .then((data: any) => {
                if (data.access) {
                    router.push({
                        pathname: "/public/auth/reset-password/new-password",
                        params: { email, token: data.access },
                    });
                }
            })
            .catch((error) => {
                setError("Invalid OTP code");
                console.log("Error verifying OTP:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Layout>
            <RNText size="2xl" variant="title">
                {t("auth.reset.enterCode.title")}
            </RNText>

            {/* Subtitle */}
            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                {t("auth.verifyEmail.sent")} — {t("auth.verifyEmail.enterCode")}
            </RNText>

            <OTPFields
                label={t("auth.reset.enterCode.button")}
                numberOfDigits={6} // your translation says 6-digit
                onChange={(v) => {
                    setOtpCode(v);
                }}
            />

            <RNButton
                disabled={otpCode.length !== 6 || isLoading}
                loading={isLoading}
                onPress={handleSubmit}
                style={{ marginTop: 12 }}
            >
                {t("auth.reset.enterCode.button")}
            </RNButton>

            {error && (
                <RNText
                    size="sm"
                    style={{
                        textAlign: "center",
                        marginTop: 8,
                        color: COLORS.accent,
                    }}
                >
                    {error}
                </RNText>
            )}

            <RNButton
                onPress={() => {
                    setError(null);
                    setIsLoading(true);
                    fetcher("/auth/resend-otp/", {
                        method: "POST",
                        body: {
                            email,
                        },
                        auth: false,
                    }).finally(() => {
                        setIsLoading(false);
                    });
                }}
                variant="ghost"
            >
                {t("auth.reset.enterCode.resend")}
            </RNButton>
        </Layout>
    );
}
