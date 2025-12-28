import { fetcher } from "@/lib/fetcher";
import { usePointsConfigStore } from "@/store/points-config";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddPoints() {
    useMutation({
        mutationFn: ({
            points,
            title,
            description,
        }: {
            points: number;
            title: string;
            description: string;
        }) => {
            return fetcher("/history/update/points/", {
                method: "POST",
                body: {
                    points,
                    title,
                    description,
                },
                auth: true,
            });
        },
        onSuccess: (data) => {
            console.log("Points added successfully:", data);
        },
    });
}

export function usePointsValue() {
    const { setPointsConfig } = usePointsConfigStore();
    return useMutation({
        mutationFn: () => fetcher("/redeem/points-earn/"),
        onSuccess: (data) => {
            if (!data) return;
            if (typeof data !== "object") return;
            if (!("free" in data)) return;
            if (!("premium" in data)) return;
            if (!("pro" in data)) return;

            setPointsConfig(data as any);
        },
        onError: (error) => {
            console.log("Error fetching Points Config:", error);
        },
    });
}
