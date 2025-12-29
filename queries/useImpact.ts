import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

export function useImpact() {
    return useQuery({
        queryKey: ["impact"],
        queryFn: () =>
            fetcher("/redeem/terget/", {
                method: "GET",
                auth: true,
            }),
    });
}
