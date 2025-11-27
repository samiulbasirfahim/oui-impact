import { RNButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { OTPFields } from "@/components/ui/otp-input";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";

export default function OTPScreen() {
    const { email } = useLocalSearchParams<{ email: string }>();
    const { t } = useTranslation();

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
                numberOfDigits={6} // Your copy says 6-digit
                onChange={(v) => {
                    console.log("OTP Code:", v);
                }}
            />

            <RNButton
                onPress={() => {
                    router.push("/public/auth/register/create-password");
                }}
                style={{ marginTop: 12 }}
            >
                {t("auth.verifyEmail.button")}
            </RNButton>

            <View style={{ gap: 2, marginTop: 12 }}>
                {/* Wrong email */}
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

                {/* Redirect to Login */}
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
