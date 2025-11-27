import { RNButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { OTPFields } from "@/components/ui/otp-input";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, View } from "react-native";

export default function OTPScreen() {
    const { email } = useLocalSearchParams<{ email: string }>();
    return (
        <Layout>
            <RNText size="2xl" variant="title">
                Verify your email
            </RNText>

            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                We just sent a 5-digit code to {email}, enter it bellow
            </RNText>

            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                Secure your account to start earning points
            </RNText>

            <OTPFields
                label="Verify Code"
                numberOfDigits={5}
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
                Submit
            </RNButton>

            <View style={{ gap: 2, marginTop: 12 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <RNText
                        style={{
                            alignSelf: "center",
                        }}
                    >
                        Wrong email?{" "}
                    </RNText>
                    <Pressable
                        onPress={() =>
                            router.canGoBack()
                                ? router.back()
                                : router.push("/public/auth/register")
                        }
                    >
                        <RNText
                            style={{
                                color: COLORS.primary,
                            }}
                        >
                            Send to different email
                        </RNText>
                    </Pressable>
                </View>

                <RNText
                    style={{
                        alignSelf: "center",
                    }}
                    variant="secondary"
                >
                    OR
                </RNText>

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
            </View>
        </Layout>
    );
}
