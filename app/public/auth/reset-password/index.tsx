import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { router } from "expo-router";

export default function EmailScreen() {
    return (
        <Layout>
            <RNText size="2xl" variant="title">
                Reset your password
            </RNText>
            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                Please enter your email and we will send an OTP code in the next step to
                reset your password.
            </RNText>

            <RNInput label="Email Address" keyboardType="email-address" />
            <RNButton
                onPress={() => {
                    router.push("/public/reset-password/otp");
                }}
                style={{ marginTop: 12 }}
            >
                Continue
            </RNButton>
        </Layout>
    );
}
