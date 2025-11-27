import { SocialSignIn } from "@/components/common/social-signin";
import { RNButton } from "@/components/ui/button";
import { RNCheckbox } from "@/components/ui/checkbox";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { Seperator } from "@/components/ui/seperator";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Image } from "expo-image";
import { Link, router, Stack } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

type FormState = {
    email?: string;
    checkBox?: boolean;
};

export default function LoginScreen() {
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
                        Create your account
                    </RNText>
                    <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                        Just enter your email to get started
                    </RNText>
                </View>

                <RNInput
                    label="Email Address"
                    keyboardType="email-address"
                    onChangeText={(text) => handleChange("email", text)}
                />

                {error && <RNText variant="accent">{error}</RNText>}

                <RNCheckbox
                    style={{
                        marginTop: 12,
                    }}
                    label="By continuing, you agree to our Terms of Service and Privacy Policy."
                    value={form.checkBox}
                    onChange={(checked) =>
                        handleChange("checkBox", checked ? "true" : "false")
                    }
                    onPressLabel={() => {
                        router.push("/public/terms-conditions");
                    }}
                />
                <RNButton
                    onPress={() => {
                        if (!form.email) {
                            setError("Please fill all the fields");
                            return;
                        }

                        if (!form.checkBox) {
                            setError("Please agree to the terms");
                            return;
                        }

                        router.push({
                            pathname: "/public/auth/register/otp",
                            params: { email: form.email },
                        });
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
                    Already have an account?{" "}
                    <Link href={"/public/auth/login"} asChild>
                        <RNText
                            style={{
                                color: COLORS.primary,
                            }}
                        >
                            Log In
                        </RNText>
                    </Link>
                </RNText>

                <Seperator color={COLORS.muted}>OR</Seperator>
                <SocialSignIn />
            </Layout>
        </>
    );
}
