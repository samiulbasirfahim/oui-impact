import { RNButton } from "@/components/ui/button";
import { RNCheckbox } from "@/components/ui/checkbox";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { View, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { fetcher } from "@/lib/fetcher";
import { useAuthStore, useTokenStore } from "@/store/auth";

type FormData = {
    password: string;
    confirmPassword: string;
};

export default function CreatePasswordScreen() {
    const { t } = useTranslation();
    const [isPending, setIsPending] = useState(false);

    const { email, token } = useLocalSearchParams<{
        email: string;
        token: string;
    }>();

    const [formData, setFormData] = useState<FormData>({
        password: "",
        confirmPassword: "",
    });

    const { setTokens } = useTokenStore();
    const { updateUser, setIsLoggedIn } = useAuthStore();

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const passwordStatus = useMemo(
        () => ({
            length: formData.password.length >= 8,
            uppercaseLowercase:
                /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
            numbersSymbols:
                /[0-9]/.test(formData.password) ||
                /[^A-Za-z0-9]/.test(formData.password),
            match:
                formData.password === formData.confirmPassword &&
                formData.password.length > 0,
        }),
        [formData],
    );

    const isFormValid = useMemo(() => {
        return Object.values(passwordStatus).every(Boolean);
    }, [passwordStatus]);

    const handleSubmit = async () => {
        if (!isFormValid || isPending) return;

        setIsPending(true);

        try {
            const data: any = await fetcher("/auth/change-password/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: {
                    email,
                    new_password: formData.password,
                },
            });

            setTokens(data.access, data.refresh);
            updateUser(data.user);
            setIsLoggedIn(true);

            router.replace("/public/auth/register/user-info");
        } catch (err) {
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Layout>
            {/* Title */}
            <RNText size="2xl" variant="title">
                {t("auth.createPassword.title")}
            </RNText>

            {/* Subtitle */}
            <RNText size="md" style={{ marginTop: 12 }} variant="secondary">
                {t("auth.createPassword.subtitle")}
            </RNText>

            {/* Password */}
            <RNInput
                label={t("auth.createPassword.password")}
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
            />

            {/* Confirm Password */}
            <RNInput
                label={t("auth.createPassword.password")}
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
                    value={passwordStatus.match}
                    disableExternalToggle
                />
            </View>

            {/* Submit */}
            <RNButton
                onPress={handleSubmit}
                disabled={!isFormValid}
                loading={isPending}
                style={{ marginTop: 12 }}
            >
                {t("auth.createPassword.button")}
            </RNButton>
        </Layout>
    );
}
