import { fetcher } from "@/lib/fetcher";
import { FaqItem } from "@/type/faq";
import { useQuery } from "@tanstack/react-query";

export type TermsResponse = {
    data: FaqItem[];
    lastUpdated: string;
};

export function useTermsNConditions() {
    return useQuery<TermsResponse>({
        queryKey: ["terms-n-conditions"],
        queryFn: () =>
            fetcher<TermsResponse>("/terms-condisions/terms-conditions/", {
                method: "GET",
            }),
    });
}
