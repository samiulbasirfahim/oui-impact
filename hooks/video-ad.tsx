import { useEffect, useRef, useState, useCallback } from "react";
import {
    RewardedAd,
    RewardedAdEventType,
    AdEventType,
    TestIds,
} from "react-native-google-mobile-ads";
import { AD_UNIT_IDS } from "@/constants";

const adUnitId = __DEV__
    ? TestIds.REWARDED
    : AD_UNIT_IDS.REWARDED || TestIds.REWARDED;

function createRewardedAd(keywords: string[]) {
    return RewardedAd.createForAdRequest(adUnitId, {
        keywords,
    });
}

type VideoAdCategory = "technology" | "fashion" | "food" | "random";

const CATEGORY_KEYWORDS: Record<VideoAdCategory, string[]> = {
    technology: ["technology", "gadgets", "electronics"],
    fashion: ["fashion", "clothing", "style"],
    food: ["food", "cooking", "recipes"],
    random: ["entertainment", "shopping", "lifestyle"],
};

export function useVideoAd() {
    const [loaded, setLoaded] = useState<Record<VideoAdCategory, boolean>>({
        technology: false,
        fashion: false,
        food: false,
        random: false,
    });

    const ads = useRef<Record<VideoAdCategory, RewardedAd>>({
        technology: createRewardedAd(CATEGORY_KEYWORDS.technology),
        fashion: createRewardedAd(CATEGORY_KEYWORDS.fashion),
        food: createRewardedAd(CATEGORY_KEYWORDS.food),
        random: createRewardedAd(CATEGORY_KEYWORDS.random),
    });

    // Store callbacks for each category
    const rewardCallbacks = useRef<Record<VideoAdCategory, (() => void) | null>>({
        technology: null,
        fashion: null,
        food: null,
        random: null,
    });

    const setupAdListeners = useCallback(
        (category: VideoAdCategory, ad: RewardedAd) => {
            const unsubLoaded = ad.addAdEventListener(
                RewardedAdEventType.LOADED,
                () => {
                    console.log(`[RewardedAd] ${category} ad loaded`);
                    setLoaded((p) => ({ ...p, [category]: true }));
                },
            );

            const unsubReward = ad.addAdEventListener(
                RewardedAdEventType.EARNED_REWARD,
                (reward) => {
                    console.log(`[RewardedAd] ${category} reward earned`, reward);

                    // Execute the callback if it exists
                    const callback = rewardCallbacks.current[category];
                    if (callback) {
                        console.log(
                            `[RewardedAd] Executing reward callback for ${category}`,
                        );
                        callback();
                        // Clear the callback after execution
                        rewardCallbacks.current[category] = null;
                    }
                },
            );

            const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
                console.log(
                    `[RewardedAd] ${category} ad closed, creating new instance`,
                );
                setLoaded((p) => ({ ...p, [category]: false }));

                // Clear the callback if ad was closed without earning reward
                rewardCallbacks.current[category] = null;

                // Create a completely new ad instance
                setTimeout(() => {
                    const newAd = createRewardedAd(CATEGORY_KEYWORDS[category]);
                    ads.current[category] = newAd;
                    setupAdListeners(category, newAd);
                    console.log(`[RewardedAd] Loading new ${category} ad`);
                    newAd.load();
                }, 500);
            });

            return () => {
                unsubLoaded();
                unsubReward();
                unsubClosed();
            };
        },
        [],
    );

    useEffect(() => {
        const cleanups: Array<() => void> = [];

        (Object.keys(ads.current) as VideoAdCategory[]).forEach((key) => {
            const ad = ads.current[key];
            const cleanup = setupAdListeners(key, ad);
            cleanups.push(cleanup);

            // Initial load
            console.log(`[RewardedAd] Initial load for ${key}`);
            ad.load();
        });

        return () => {
            console.log("[RewardedAd] Cleaning up all ads");
            cleanups.forEach((fn) => fn());
        };
    }, [setupAdListeners]);

    const showAd = useCallback(
        (category: VideoAdCategory, onReward?: () => void) => {
            console.log(
                `[RewardedAd] showAd called for ${category}, loaded: ${loaded[category]}`,
            );
            const ad = ads.current[category];

            if (!ad) {
                console.error(`[RewardedAd] No ad instance found for ${category}`);
                return;
            }

            if (loaded[category]) {
                if (onReward) {
                    rewardCallbacks.current[category] = onReward;
                }
                console.log(`[RewardedAd] Showing ${category} ad`);
                ad.show();
            } else {
                console.warn(
                    `[RewardedAd] ${category} ad not loaded yet, current state:`,
                    {
                        adLoaded: ad.loaded,
                        stateLoaded: loaded[category],
                    },
                );
            }
        },
        [loaded],
    );

    return {
        showAd,
        isLoaded: loaded,
    };
}
