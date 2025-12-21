import { fetcher } from "@/lib/fetcher";
import { useAuthStore, useTokenStore } from "@/store/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

export function useLogin() {
    const { setTokens } = useTokenStore();
    const { updateUser, setIsLoggedIn } = useAuthStore();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            fetcher("/auth/login/", { method: "POST", body: { email, password } }),
        onSuccess: (data: any) => {
            setTokens(data.access, data.refresh);
            updateUser(data.user);
            setIsLoggedIn(true);
            router.replace("/protected/chat");
        },
        onError: () => {
            setIsLoggedIn(false);
            setTokens(null, null);
        }
    });
}

export function useInitAuth() {
    const { setIsLoggedIn, updateUser } = useAuthStore();
    const { accessToken, refreshToken } = useTokenStore();

    return useMutation({
        mutationFn: async () => {
            if (!accessToken || !refreshToken) {
                throw new Error("No tokens found");
            }
            return fetcher("/auth/me/", { method: "GET", auth: true });
        },
        onSuccess: (data: any) => {
            updateUser(data.user);
            const new_access_token = data.access || accessToken;
            const new_refresh_token = data.refresh || refreshToken;
            useTokenStore.getState().setTokens(new_access_token, new_refresh_token);
            setIsLoggedIn(true);
        },
        onError: () => {
            setIsLoggedIn(false);
            useTokenStore.getState().setTokens(null, null);
        },
    });
}
