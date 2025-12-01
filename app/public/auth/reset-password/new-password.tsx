import { RNButton } from "@/components/ui/button";
import { RNCheckbox } from "@/components/ui/checkbox";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

type FormData = {
    password: string;
    confirmPassword: string;
};

export default function EmailScreen() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FormData>({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const passwordStatus = useMemo(() => {
        return {
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
    }, [formData.password, formData.confirmPassword]);

    return (
        <Layout>
            {/* Title */}
            <RNText size="2xl" variant="title">
                {t("auth.reset.newPassword.title")}
            </RNText>

            {/* Subtitle */}
            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                {t("auth.createPassword.subtitle")}
            </RNText>

            {/* New Password */}
            <RNInput
                label={t("auth.createPassword.password")}
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
            />

            {/* Confirm Password */}
            <RNInput
                label={t("auth.reset.newPassword.confirm")}
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
            />

            {/* Password Rules */}
            <View style={{ marginVertical: 16, gap: 6 }}>
                <RNCheckbox
                    label={t("auth.createPassword.rule1")}
                    value={passwordStatus.length}
                    disableExternalToggle
                />
                <RNCheckbox
                    label={t("auth.createPassword.rule2")}
                    value={passwordStatus.uppercaseLowercase}
                    disableExternalToggle
                />
                <RNCheckbox
                    label={t("auth.createPassword.rule3")}
                    value={passwordStatus.numbersSymbols}
                    disableExternalToggle
                />
                <RNCheckbox
                    label={t("auth.createPassword.rule4")}
                    value={passwordStatus.missMatch}
                    disableExternalToggle
                />
            </View>

            {/* Save Button */}
            <RNButton
                onPress={() => {
                    router.push("/public/auth/login");
                }}
                style={{ marginTop: 12 }}
            >
                {t("auth.reset.newPassword.button")}
            </RNButton>
        </Layout>
    );
}
