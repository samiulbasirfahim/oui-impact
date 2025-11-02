import { SocialSignIn } from "@/components/common/social-signin";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { Seperator } from "@/components/ui/seperator";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Link, router } from "expo-router";
import { useState } from "react";

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
        <Layout>
            <RNText size="2xl" variant="title">
                Log In
            </RNText>
            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                Welcome back to OUI IMPACT
            </RNText>

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
    );
}
