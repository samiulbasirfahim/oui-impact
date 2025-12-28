import { ApiError, fetcher } from "@/lib/fetcher";
import { refetchImage } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import type { User } from "@/type/user";

export function useUpdateProfile() {
    return useMutation({
        mutationFn: async (payload: Partial<User>) => {
            const formData = new FormData();

            if (payload.name) {
                formData.append("name", payload.name);
            }

            if (payload.gender) {
                formData.append("gender", payload.gender);
            }

            if (payload.country) {
                formData.append("country", payload.country);
            }

            if (payload.phone) {
                formData.append("phone", payload.phone);
            }

            if (payload.date_of_birth) {
                formData.append("date_of_birth", payload.date_of_birth);
            }

            if (typeof payload.is_buy === "boolean") {
                formData.append("is_buy", String(payload.is_buy));
            }

            if (payload.plan) {
                formData.append("plan", payload.plan);
            }

            if (typeof payload.my_points === "number") {
                formData.append("my_points", String(payload.my_points));
            }

            if (typeof payload.is_verified === "boolean") {
                formData.append("is_verified", String(payload.is_verified));
            }

            if (payload.social_auth_provider) {
                formData.append("social_auth_provider", payload.social_auth_provider);
            }

            if ((payload.img?.length ?? 0) > 5) {
                formData.append("img", {
                    uri: payload.img,
                    name: "avatar.jpg",
                    type: "image/jpeg",
                } as any);
            }

            const res = await fetcher<User>("/auth/me/", {
                method: "PATCH",
                body: formData,
                auth: true,
                dontParseJson: true,
            });

            return res;
        },

        onSuccess: (data) => {
            if (data.img) {
                refetchImage(data.img);
            }

            useAuthStore
                .getState()
                .updateUser({ ...data, imgKey: Math.random() } as any);
        },

        onError: (error) => {
            if (error instanceof ApiError) {
                console.error("API Error:", error.status, error.data);
                return;
            }
            console.error("Failed to update profile:", error);
        },
    });
}
