import { create } from "zustand";
import type { Notification } from "@/type/notification";

type NotificationStoreState = {
    notifications: Notification[];
    addNotification: (notification: Notification) => void;
    setNotifications: (notifications: Notification[]) => void;
    readNotification: (id: string) => void;
    readAllNotifications: () => void;
    clearNotifications: () => void;
};

const useNotificationsStore = create<NotificationStoreState>((set, get) => ({
    notifications: [],
    setNotifications(notifications: Notification[]) {
        set({ notifications: notifications.slice(0, 30) });
    },
    addNotification(notification: Notification) {
        set((state) => {
            const updatedNotifications = [notification, ...state.notifications];
            if (updatedNotifications.length > 30) {
                return {
                    notifications: updatedNotifications.slice(0, 30),
                };
            }
            return {
                notifications: updatedNotifications,
            };
        });
    },
    readNotification(id: string) {
        set((state) => ({
            notifications: state.notifications.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification,
            ),
        }));
    },
    readAllNotifications() {
        set((state) => ({
            notifications: state.notifications.map((notification) => ({
                ...notification,
                read: true,
            })),
        }));
    },
    clearNotifications() {
        set({ notifications: [] });
    },
}));
