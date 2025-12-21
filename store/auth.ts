import { create } from "zustand";
import { router } from "expo-router";
import type { User } from "@/type/user";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvZustand } from "./mmkv";

interface AuthStoreState {
    isLoggedIn: boolean;
    user: User | null;
    updateUser: (user: Partial<User>) => void;
    init: () => User | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    logOut: () => void;
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
    isLoggedIn: false,
    user: null,

    init() {
        const token = useTokenStore.getState().accessToken;

        return null;
    },

    setIsLoggedIn(isLoggedIn: boolean) {
        set({ isLoggedIn });
    },

    updateUser(user) {
        set({
            user: { ...get().user, ...user } as User | null,
        });
    },
    logOut() {
        useTokenStore.getState().setTokens(null, null);
        set({ isLoggedIn: false, user: null });
        router.replace("/public/auth/login");
    },
}));

export const useTokenStore = create<{
    accessToken: string | null;
    refreshToken: string | null;
    setTokens: (accessToken: string | null, refreshToken: string | null) => void;
}>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            setTokens: (accessToken, refreshToken) =>
                set({ accessToken, refreshToken }),
        }),
        {
            name: "auth-tokens",
            storage: createJSONStorage(() => mmkvZustand),
        },
    ),
);
