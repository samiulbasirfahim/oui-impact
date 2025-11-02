import { RNButton } from "@/components/ui/button";
import { RNCheckbox } from "@/components/ui/checkbox";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { router } from "expo-router";
import { useMemo, useState } from "react";
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

    const passwordStatus = useMemo(() => {
        const status = {
            length: formData.password.length >= 8,
            uppercaseLowercase:
                /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
            numbersSymbols:
                /[0-9]/.test(formData.password) ||
                /[^A-Za-z0-9]/.test(formData.password),
            missMatch:
                formData.password === formData.confirmPassword &&
                formData.password.length > 0,
        };
        return status;
    }, [formData.password]);

    return (
        <Layout>
            <RNText size="2xl" variant="title">
                Create a new password
            </RNText>
            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                Your new password must be different from previous used passwords.
            </RNText>

            <RNInput
                label="Enter a new Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
            />
            <RNInput
                label="Confirm Password"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
            />

            <View
                style={{
                    marginVertical: 16,
                    gap: 6,
                }}
            >
                <RNCheckbox
                    label="8 charecters minimum"
                    value={passwordStatus.length}
                    disableExternalToggle
                />
                <RNCheckbox
                    label="use both uppercase and lowercase"
                    disableExternalToggle
                    value={passwordStatus.uppercaseLowercase}
                />
                <RNCheckbox
                    label="combination of numbers and symbols"
                    disableExternalToggle
                    value={passwordStatus.numbersSymbols}
                />
                <RNCheckbox
                    label="Passwords match"
                    disableExternalToggle
                    value={passwordStatus.missMatch}
                />
            </View>

            <RNButton
                onPress={() => {
                    router.push("/public/auth/login");
                }}
                style={{ marginTop: 12 }}
            >
                Save
            </RNButton>
        </Layout>
    );
}
