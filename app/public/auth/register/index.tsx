import { SocialSignIn } from "@/components/common/social-signin";
import { RNButton } from "@/components/ui/button";
import { RNCheckbox } from "@/components/ui/checkbox";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { Seperator } from "@/components/ui/seperator";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { ApiError, fetcher } from "@/lib/fetcher";
import { useAuthStore } from "@/store/auth";
import { Image } from "expo-image";
import { Link, router, Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type FormState = {
    email?: string;
    checkBox?: boolean;
};

export default function RegisterScreen() {
    const { t } = useTranslation();
    const { updateUser } = useAuthStore();
    const [form, setForm] = useState<FormState>({});
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const handleChange = <K extends keyof FormState>(
        name: K,
        value: FormState[K],
    ) => {
        setError(null);
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = () => {
        if (!form.email) {
            setError("Please fill all the fields");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!form.checkBox) {
            setError("Please accept the terms and conditions");
            return;
        }

        setIsPending(true);
        setError(null);

        fetcher("/auth/register/", {
            method: "POST",
            body: {
                email: form.email,
            },
        })
            .then((res: any) => {
                console.log(res);
                updateUser({
                    email: form.email,
                });
                router.push({
                    pathname: "/public/auth/register/otp",
                    params: { email: form.email },
                });
            })
            .catch((err) => {
                if (err instanceof ApiError) {
                    setError(err.data.message || "Something went wrong");
                } else {
                    setError("Something went wrong");
                }
            })
            .finally(() => {
                setIsPending(false);
            });
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "transparent" },
                    headerTransparent: true,
                }}
            />

            <Layout edges={["top"]}>
                <View style={{ alignItems: "center", marginBottom: 24 }}>
                    <Image
                        source={require("@/assets/images/logo.png")}
                        style={{
                            height: 120,
                            width: 120,
                        }}
                    />

                    <RNText size="3xl" variant="title">
                        {t("auth.createAccount.title")}
                    </RNText>

                    <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                        {t("auth.createAccount.subtitle")}
                    </RNText>
                </View>

                <RNInput
                    label={t("auth.createAccount.email")}
                    keyboardType="email-address"
                    onChangeText={(text) => handleChange("email", text)}
                />

                {error && <RNText variant="accent">{error}</RNText>}

                <RNCheckbox
                    style={{ marginTop: 12 }}
                    label={t("onboarding.screen1.terms")}
                    value={form.checkBox}
                    onChange={(checked) =>
                        handleChange("checkBox", checked ? true : false)
                    }
                    onPressLabel={() => {
                        router.push("/public/terms-conditions");
                    }}
                />

                <RNButton
                    onPress={handleSubmit}
                    style={{ marginTop: 12 }}
                    loading={isPending}
                >
                    {t("auth.createAccount.button")}
                </RNButton>

                <RNText style={{ alignSelf: "center" }}>
                    <Link href={"/public/auth/login"} asChild>
                        <RNText style={{ color: COLORS.primary }}>
                            {t("auth.createAccount.loginRedirect")}
                        </RNText>
                    </Link>
                </RNText>

                <Seperator color={COLORS.muted}>OR</Seperator>

                <SocialSignIn />
            </Layout>
        </>
    );
}
