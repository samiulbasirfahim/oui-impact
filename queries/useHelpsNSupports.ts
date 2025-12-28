import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

export type HelpSupportItem = {
    id: number;
    question: string;
    answer: string;
};

export type HelpSupportResponse = {
    data: HelpSupportItem[];
    lastUpdated: string;
};

export function useHelpsNSupports() {
    return useQuery<HelpSupportResponse>({
        queryKey: ["helps_n_supports"],
        queryFn: () =>
            fetcher<HelpSupportResponse>("/helps-n-supports/", {
                method: "GET",
            }),
    });
}
