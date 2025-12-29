import { fetcher } from "@/lib/fetcher";
import { FaqItem } from "@/type/faq";
import { useQuery } from "@tanstack/react-query";

export type HelpSupportResponse = {
    data: FaqItem[];
    lastUpdated: string;
};

export function useHelpsNSupports() {
    return useQuery<HelpSupportResponse>({
        queryKey: ["helps_n_supports"],
        queryFn: () =>
            fetcher<HelpSupportResponse>("/terms-condisions/help-support/", {
                method: "GET",
            }),
    });
}
