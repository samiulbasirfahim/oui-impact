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
import { useSettings } from "@/store/settings";
import { UserSettings } from "@/type/settings";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function Screen() {
    const { t } = useTranslation();
    const { setSettings, getSettings, setLanguage } = useSettings();

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
                    onToggle={(v) => setSettings("pushNotifications", v)}
                    value={getSettings("pushNotifications") ?? false}
                />

                <RNSwitch
                    label={t("account.settings.newReward")}
                    subLabel={t("account.settings.rewardDescription")}
                    onToggle={(v) => setSettings("rewardNotifications", v)}
                    value={getSettings("rewardNotifications") ?? false}
                />

                <RNSwitch
                    label={t("account.settings.emailUpdates")}
                    subLabel={t("account.settings.emailUpdatesDescription")}
                    onToggle={(v) => setSettings("emailUpdates", v)}
                    value={getSettings("emailUpdates") ?? false}
                />

                <RNSwitch
                    label={t("account.settings.marketing")}
                    subLabel={t("account.settings.marketingDescription")}
                    onToggle={(v) => setSettings("marketingEmails", v)}
                    value={getSettings("marketingEmails") ?? false}
                />

                <RNSwitch
                    label={getSettings("language") === "fr" ? "Langue" : "Language"}
                    subLabel={
                        getSettings("language") === "fr"
                            ? "Changer la langue en anglais"
                            : "Switch language to French"
                    }
                    onToggle={(v) => {
                        const nextLanguage = v === true ? "fr" : "en";
                        setSettings("language", nextLanguage);
                        setLanguage(nextLanguage);
                    }}
                    value={getSettings("language") === "fr"}
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
