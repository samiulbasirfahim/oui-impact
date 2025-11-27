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

type FormState = {
    email?: string;
    password?: string;
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
                        Log In
                    </RNText>
                    <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                        Welcome back to OUI IMPACT
                    </RNText>
                </View>

                <RNInput
                    label="Email Address"
                    keyboardType="email-address"
                    onChangeText={(text) => handleChange("email", text)}
                />
                <RNInput
                    label="Password"
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
                        Forgot Password?
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
                    Don't have an account?{" "}
                    <Link href={"/public/auth/register"} asChild>
                        <RNText
                            style={{
                                color: COLORS.primary,
                            }}
                        >
                            Create account
                        </RNText>
                    </Link>
                </RNText>

                <Seperator color={COLORS.muted}>OR</Seperator>
                <SocialSignIn />
            </Layout>
        </>
    );
}
