import INFO from "@/assets/svgs/info.svg";
import LOGOUT from "@/assets/svgs/logout.svg";
import { PointsCard } from "@/components/common/points-card";
import { ProfileCard } from "@/components/common/profile-card";
import { RNSettingButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { RNSwitch } from "@/components/ui/switch";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { useLanguage } from "@/hooks/useLanguages";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type States = {
    pushNotifications: boolean;
    rewardNotifications: boolean;
    emailUpdates: boolean;
    marketingEmails: boolean;
};

export default function Screen() {
    const { t } = useTranslation();

    const { toggleLanguage, currentLanguage } = useLanguage();

    const [form, setForm] = useState<States>({
        pushNotifications: false,
        rewardNotifications: true,
        emailUpdates: false,
        marketingEmails: false,
    });

    return (
        <>
            <Stack.Screen options={{ headerTitle: t("account.settings.title") }} />

            <Layout style={{ gap: 12 }}>
                <ProfileCard />
                <PointsCard />

                <RNText size="xl" variant="primary" style={{ marginTop: 16 }}>
                    {t("account.settings.notifications")}
                </RNText>

                <RNSwitch
                    label={t("account.settings.push")}
                    subLabel={t("account.settings.pushDescription")}
                    onToggle={(v) => setForm({ ...form, pushNotifications: v })}
                    value={form.pushNotifications}
                />

                <RNSwitch
                    label={t("account.settings.newReward")}
                    subLabel={t("account.settings.rewardDescription")}
                    onToggle={(v) => setForm({ ...form, rewardNotifications: v })}
                    value={form.rewardNotifications}
                />

                <RNSwitch
                    label={t("account.settings.emailUpdates")}
                    subLabel={t("account.settings.emailUpdatesDescription")}
                    onToggle={(v) => setForm({ ...form, emailUpdates: v })}
                    value={form.emailUpdates}
                />

                <RNSwitch
                    label={t("account.settings.marketing")}
                    subLabel={t("account.settings.marketingDescription")}
                    onToggle={(v) => setForm({ ...form, marketingEmails: v })}
                    value={form.marketingEmails}
                />

                <RNSwitch
                    label={currentLanguage === "fr" ? "Langue" : "Language"}
                    subLabel={
                        currentLanguage === "fr"
                            ? "Changer la langue en anglais"
                            : "Switch language to French"
                    }
                    value={currentLanguage === "fr"}
                    onToggle={toggleLanguage}
                />

                <View
                    style={{
                        marginTop: 24,
                        borderRadius: 8,
                        padding: 16,
                        borderColor: COLORS.muted,
                        backgroundColor: COLORS.backgroundSecondary,
                    }}
                >
                    <RNSwitch
                        label={t("account.settings.darkMode")}
                        onToggle={() => { }}
                    />
                </View>

                <RNSettingButton
                    icon={<INFO width={24} height={24} />}
                    title={t("account.settings.help")}
                    onPress={() => {
                        router.push("/protected/others/accounts/help-support");
                    }}
                />

                <RNSettingButton
                    icon={<LOGOUT width={24} height={24} />}
                    title={t("account.settings.logout")}
                />
            </Layout>
        </>
    );
}
