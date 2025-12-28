import { RNButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { OTPFields } from "@/components/ui/otp-input";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { fetcher } from "@/lib/fetcher";

export default function OTPScreen() {
    const { email } = useLocalSearchParams<{ email: string }>();
    const { t } = useTranslation();

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [code, setCode] = useState("");

    const handleSubmit = () => {
        if (code.length !== 6) {
            return;
        }

        setIsPending(true);

        fetcher("/auth/verify-otp/", {
            method: "POST",
            body: {
                email,
                otp: code,
            },
        })
            .then((data: any) => {
                if (data.access) {
                    router.push({
                        pathname: "/public/auth/register/create-password",
                        params: { email, token: data.access },
                    });
                } else {
                    setError("Invalid code");
                }
            })

            .catch(() => {
                setError("Invalid code");
            })
            .finally(() => {
                setIsPending(false);
            });
    };

    const handleResend = () => { };

    return (
        <Layout>
            <RNText size="2xl" variant="title">
                {t("auth.verifyEmail.title")}
            </RNText>

            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                {t("auth.verifyEmail.sent")} {email}. {t("auth.verifyEmail.enterCode")}
            </RNText>

            <OTPFields
                label={t("auth.verifyEmail.button")}
                numberOfDigits={6}
                onChange={(v) => {
                    setCode(v);
                }}
            />

            <RNButton
                disabled={code.length !== 6 || isPending}
                loading={isPending}
                onPress={handleSubmit}
                style={{ marginTop: 12 }}
            >
                {t("auth.verifyEmail.button")}
            </RNButton>

            {error && (
                <RNText
                    variant="accent"
                    style={{ marginLeft: 8, width: "100%", textAlign: "center" }}
                >
                    {error}
                </RNText>
            )}

            <View style={{ gap: 2, marginTop: 12 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Pressable
                        onPress={() =>
                            router.canGoBack()
                                ? router.back()
                                : router.push("/public/auth/register")
                        }
                    >
                        <RNText style={{ color: COLORS.primary }}>
                            {t("auth.verifyEmail.wrongEmail")}
                        </RNText>
                    </Pressable>
                </View>

                {/* OR */}
                <RNText
                    style={{
                        alignSelf: "center",
                        marginTop: 6,
                    }}
                    variant="secondary"
                >
                    {t("auth.verifyEmail.or")}
                </RNText>

                <RNText
                    style={{
                        alignSelf: "center",
                        marginTop: 4,
                    }}
                >
                    <Link href={"/public/auth/login"} asChild>
                        <RNText style={{ color: COLORS.primary }}>
                            {t("auth.verifyEmail.loginRedirect")}
                        </RNText>
                    </Link>
                </RNText>
            </View>
        </Layout>
    );
}
