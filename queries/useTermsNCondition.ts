import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

export type TermCondition = {
    id: number;
    question: string;
    answer: string;
};

export type TermsResponse = {
    data: TermCondition[];
    lastUpdated: string;
};

export function useTermsNConditions() {
    return useQuery<TermsResponse>({
        queryKey: ["terms-n-conditions"],
        queryFn: () =>
            fetcher<TermsResponse>("/terms-n-conditions/", {
                method: "GET",
            }),
    });
}
