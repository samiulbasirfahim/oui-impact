import { RNButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Notification } from "@/type/notification";
import { Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

export default function NotificationScreen() {
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            title: "Welcome to the App!",
            message: "Thank you for signing up. We are excited to have you on board.",
            createdAt: new Date("2024-06-01T10:00:00Z"),
            read: false,
        },
        {
            id: "2",
            title: "New Feature Released",
            message: "Check out the new features we have added in the latest update.",
            createdAt: new Date("2024-06-05T15:30:00Z"),
            read: true,
        },
        {
            id: "3",
            title: "Weekly Summary",
            message: "Here is your activity summary for the week.",
            createdAt: new Date("2024-06-07T08:45:00Z"),
            read: false,
        },
        {
            id: "4",
            title: "Security Alert",
            message:
                "We noticed a new login to your account from an unrecognized device.",
            createdAt: new Date("2024-06-10T12:20:00Z"),
            read: true,
        },
        {
            id: "5",
            title: "Subscription Renewal",
            message:
                "Your subscription will renew in 3 days. No action is needed if you wish to continue.",
            createdAt: new Date("2024-06-12T09:10:00Z"),
            read: false,
        },
        {
            id: "6",
            title: "Feedback Request",
            message:
                "We value your feedback! Please take a moment to complete our survey.",
            createdAt: new Date("2024-06-15T14:55:00Z"),
            read: true,
        },
        {
            id: "7",
            title: "Account Update",
            message: "Your account information has been successfully updated.",
            createdAt: new Date("2024-06-18T11:05:00Z"),
            read: false,
        },
        {
            id: "8",
            title: "Promotion Alert",
            message:
                "Congratulations! You've been promoted to a premium member. Enjoy exclusive benefits.",
            createdAt: new Date("2024-06-20T16:40:00Z"),
            read: true,
        },
    ]);

    const markAllAsRead = () => {
        const updatedNotifications = notifications.map((notification) => ({
            ...notification,
            read: true,
        }));
        setNotifications(updatedNotifications);
    };

    const markAsRead = (id: string) => {
        const updatedNotifications = notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
        );
        setNotifications(updatedNotifications);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: t("account.settings.notifications"),
                    headerRight: () => null,
                }}
            />
            <Layout>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                    }}
                >
                    <RNButton onPress={markAllAsRead} size="sm">
                        {t("account.settings.confirm")}
                    </RNButton>
                </View>

                {notifications.map((notification) => (
                    <Pressable
                        onPress={() => markAsRead(notification.id)}
                        key={notification.id}
                        style={{
                            padding: 12,
                            backgroundColor: notification.read
                                ? COLORS.background
                                : COLORS.backgroundSecondary,
                            borderRadius: 8,
                            borderColor: notification.read ? COLORS.muted : COLORS.primary,
                            borderWidth: 1,
                            marginTop: 12,
                        }}
                    >
                        <RNText
                            variant="title"
                            size="md"
                            style={{ fontWeight: notification.read ? "400" : "700" }}
                        >
                            {notification.title}
                        </RNText>
                        <RNText
                            variant="base"
                            size="sm"
                            style={{ marginTop: 4, color: "#555555" }}
                        >
                            {notification.message}
                        </RNText>
                        <RNText
                            variant="caption"
                            size="xs"
                            style={{ marginTop: 6, color: "#888888" }}
                        >
                            {notification.createdAt.toLocaleString()}
                        </RNText>
                    </Pressable>
                ))}
            </Layout>
        </>
    );
}
