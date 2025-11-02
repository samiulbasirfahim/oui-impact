import { RNButton } from "@/components/ui/button";
import { RNCheckbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/ui/layout";
import { RNPInput } from "@/components/ui/password-input";
import { RNText } from "@/components/ui/text";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

type FormData = {
    password: string;
    confirmPassword: string;
};

export default function EmailScreen() {
    const [formData, setFormData] = useState<FormData>({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Layout>
            <RNText size="2xl" variant="title">
                Create a new password
            </RNText>
            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                We just sent 5-digit to Set up your password to complete your account
                setup
            </RNText>

            <RNPInput
                onChangeText={(t) => handleChange("password", t)}
                label="Enter a new Password"
                placeholder="Enter password"
            />
            <RNPInput
                onChangeText={(t) => handleChange("password", t)}
                label="Confirm Password"
                placeholder="Enter password"
            />

            <View
                style={{
                    marginVertical: 16,
                    gap: 6,
                }}
            >
                <RNCheckbox label="8 charecters minimum" value={true} />
                <RNCheckbox label="use both uppercase and lowercase" />
                <RNCheckbox label="combination of numbers and symbols" />
            </View>

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
