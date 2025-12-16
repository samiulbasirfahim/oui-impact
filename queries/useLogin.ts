import { fetcher } from "@/lib/fetcher";
import { useAuthStore, useTokenStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
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
    });
}
