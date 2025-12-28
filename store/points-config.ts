// {
//         "id": 1,
//         "share_earn": 29,
//         "app_open_earn": 72,
//         "per_2_minite_earn": 76,
//         "impact_feed_scroll_earn": 67,
//         "daily_multiplier_earn": 34,
//         "tech_product_earn": 31,
//         "fashion_product_earn": 66,
//         "cooking_product_earn": 72,
//         "premium_video_earn": 28,
//         "app_open_max_earn": 23,
//         "max_intersihal_ads_earn": 14,
//         "per_intersihal_ads_earn": 17,
//         "intersitial_interval_earn": 99
// }

import { create } from "zustand";
import { useAuthStore } from "./auth";

type PointsConfig = {
    id: number;
    share_earn: number;
    app_open_earn: number;
    per_2_minite_earn: number;
    impact_feed_scroll_earn: number;
    daily_multiplier_earn: number;
    tech_product_earn: number;
    fashion_product_earn: number;
    cooking_product_earn: number;
    premium_video_earn: number;
    app_open_max_earn: number;
    max_intersihal_ads_earn: number;
    per_intersihal_ads_earn: number;
    intersitial_interval_earn: number;
};

type PointsConfigStoreState = {
    pointsConfig: {
        free: PointsConfig;
        premium: PointsConfig;
        pro: PointsConfig;
    } | null;
    setPointsConfig: (config: {
        free: PointsConfig;
        premium: PointsConfig;
        pro: PointsConfig;
    }) => void;

    getPointsConfig: () => PointsConfig | null;
};

export const usePointsConfigStore = create<PointsConfigStoreState>()(
    (set, get) => ({
        pointsConfig: null,
        setPointsConfig: (config) => {
            set({ pointsConfig: config });
        },
        getPointsConfig: () => {
            const user = useAuthStore.getState().user;

            const pointsConfig = get().pointsConfig;

            if (!pointsConfig) {
                return null;
            }

            if (user?.plan === "pro") {
                return pointsConfig.pro;
            } else if (user?.plan === "premium") {
                return pointsConfig.premium;
            } else {
                return pointsConfig.free;
            }
        },
    }),
);
