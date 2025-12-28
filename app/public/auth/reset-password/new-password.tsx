import { RNButton } from "@/components/ui/button";
import { RNCheckbox } from "@/components/ui/checkbox";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useAuthStore, useTokenStore } from "@/store/auth";
import { fetcher } from "@/lib/fetcher";

type FormData = {
    password: string;
    confirmPassword: string;
};

export default function NewPasswordScreen() {
    const { t } = useTranslation();

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
    const [isPending, setIsPending] = useState(false);

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

            if (router.canDismiss()) {
                router.dismissAll();
            }
            router.replace("/protected/chat");
        } catch (err) {
        } finally {
            setIsPending(false);
        }
    };

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
                onPress={handleSubmit}
                disabled={!isFormValid}
                loading={isPending}
                style={{ marginTop: 12 }}
            >
                {t("auth.reset.newPassword.button")}
            </RNButton>
        </Layout>
    );
}
