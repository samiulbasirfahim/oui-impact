import { PointsCard } from "@/components/common/points-card";
import INFO from "@/assets/svgs/info.svg";
import LOGOUT from "@/assets/svgs/logout.svg";
import { ProfileCard } from "@/components/common/profile-card";
import { RNButton, RNSettingButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { RNSwitch } from "@/components/ui/switch";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

type States = {
    pushNotifications: boolean;
    rewardNotifications: boolean;
    emailUpdates: boolean;
    marketingEmails: boolean;
};

export default function Screen() {
    const [form, setForm] = useState<States>({
        pushNotifications: false,
        rewardNotifications: true,
        emailUpdates: false,
        marketingEmails: false,
    });

    return (
        <>
            <Stack.Screen options={{ headerTitle: "Settings" }} />
            <Layout
                style={{
                    gap: 12,
                }}
            >
                <ProfileCard />
                <PointsCard />

                <RNText
                    size="xl"
                    variant="primary"
                    style={{
                        marginTop: 16,
                    }}
                >
                    Notification Settings
                </RNText>

                <RNSwitch
                    label="Push Notifications"
                    subLabel="Receive app notifications"
                    onToggle={(toggled) => {
                        setForm({ ...form, pushNotifications: toggled });
                    }}
                    value={form.pushNotifications}
                />

                <RNSwitch
                    label="Reward Notifications"
                    subLabel="Recieve app notification"
                    onToggle={(toggled) => {
                        setForm({ ...form, rewardNotifications: toggled });
                    }}
                    value={form.rewardNotifications}
                />

                <RNSwitch
                    label="Email Updates"
                    subLabel="Receive email updates"
                    onToggle={(toggled) => {
                        setForm({ ...form, emailUpdates: toggled });
                    }}
                    value={form.emailUpdates}
                />

                <RNSwitch
                    label="Marketing Emails"
                    subLabel="Promotional offers"
                    onToggle={(toggled) => {
                        setForm({ ...form, marketingEmails: toggled });
                    }}
                    value={form.marketingEmails}
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
                    <RNSwitch label="DARK MODE" onToggle={(toggled) => { }} />
                </View>

                {
                    //     <RNText
                    //     style={{
                    //         marginTop: 24,
                    //         color: COLORS.secondary,
                    //         textAlign: "center",
                    //     }}
                    //     size="lg"
                    //     variant="title"
                    // >
                    //     Account Control & GDPR Compliance
                    // </RNText>
                    // <RNText
                    //     size="sm"
                    //     variant="base"
                    //     style={{ color: COLORS.muted, textAlign: "center" }}
                    // >
                    //     Easily manage your account with options to delete or deactivate,
                    //     ensuring full GDPR compliance.
                    // </RNText>
                    //
                    // <View
                    //     style={{
                    //         flexDirection: "row",
                    //         justifyContent: "space-between",
                    //         gap: 6,
                    //         marginTop: 12,
                    //     }}
                    // >
                    //     <RNButton variant="outline" style={{ flex: 1 }}>
                    //         Cancel
                    //     </RNButton>
                    //     <RNButton style={{ flex: 1 }}>Confirm</RNButton>
                    // </View>
                }

                <RNSettingButton
                    icon={<INFO width={24} height={24} />}
                    title="Help & Support"
                    onPress={() => {
                        router.push("/protected/others/accounts/help-support");
                    }}
                />

                <RNSettingButton
                    icon={<LOGOUT width={24} height={24} />}
                    title="Log Out"
                />
            </Layout>
        </>
    );
}
