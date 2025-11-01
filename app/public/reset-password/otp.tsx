import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { OTPFields } from "@/components/ui/otp-input";
import { RNText } from "@/components/ui/text";
import { router } from "expo-router";

export default function OTPScreen() {
    return (
        <Layout>
            <RNText size="2xl" variant="title">
                Enter The Code
            </RNText>

            <OTPFields
                label="Verify Code"
                style={{
                    marginTop: 36,
                }}
                numberOfDigits={5}
                onChange={(v) => {
                    console.log("OTP Code:", v);
                }}
            />
            <RNButton
                onPress={() => {
                    router.push("/public/reset-password/otp");
                }}
                style={{ marginTop: 12 }}
            >
                Continue
            </RNButton>

            <RNButton variant="ghost">Send Code Again</RNButton>
        </Layout>
    );
}
