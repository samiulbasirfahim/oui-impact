import { SocialSignIn } from "@/components/common/social-signin";
import { Image } from "expo-image";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { Seperator } from "@/components/ui/seperator";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Link, router, Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

type FormState = {
    email?: string;
    password?: string;
};

export default function LoginScreen() {
    const { t } = useTranslation();

    const [form, setForm] = useState<FormState>({});

    const [error, setError] = useState<string | null>(null);

    const handleChange = (name: keyof FormState, value: string) => {
        setError(null);
        setForm({
            ...form,
            [name]: value,
        });
    };

    return (
        <>
            <Layout edges={["top"]}>
                <View
                    style={{
                        alignItems: "center",
                        marginBottom: 24,
                    }}
                >
                    <Image
                        source={require("@/assets/images/logo.png")}
                        style={{
                            height: 120,
                            width: 120,
                        }}
                    />

                    <RNText size="3xl" variant="title">
                        {t("auth.login.title")}
                    </RNText>
                    <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                        {t("auth.login.subtitle")}
                    </RNText>
                </View>

                <RNInput
                    label={t("auth.login.email")}
                    keyboardType="email-address"
                    onChangeText={(text) => handleChange("email", text)}
                />
                <RNInput
                    label={t("auth.login.password")}
                    secureTextEntry
                    onChangeText={(text) => handleChange("password", text)}
                />

                {error && <RNText variant="accent">{error}</RNText>}

                <Link href={"/public/auth/reset-password"} asChild>
                    <RNText
                        style={{
                            alignSelf: "flex-end",
                        }}
                        variant="secondary"
                    >
                        {t("auth.login.forgot")}
                    </RNText>
                </Link>
                <RNButton
                    onPress={() => {
                        if (!form.email || !form.password) {
                            setError("Please fill all the fields");
                            return;
                        }
                        router.push("/public/auth/login");
                    }}
                    style={{ marginTop: 12 }}
                >
                    Continue
                </RNButton>
                <RNText
                    style={{
                        alignSelf: "center",
                    }}
                >
                    <Link href={"/public/auth/register"} asChild>
                        <RNText
                            style={{
                                color: COLORS.primary,
                            }}
                        >
                            {t("auth.login.registerRedirect")}
                        </RNText>
                    </Link>
                </RNText>

                <Seperator color={COLORS.muted}>OR</Seperator>
                <SocialSignIn />
            </Layout>
        </>
    );
}
