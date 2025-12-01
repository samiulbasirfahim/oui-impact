import { getString, setItem } from "@/lib/mmkv";
import { minutesToMillis } from "@/lib/utils";
import { useEffect } from "react";
import {
    AdEventType,
    InterstitialAd,
    TestIds,
} from "react-native-google-mobile-ads";

// const adUnitId = __DEV__
//     ? TestIds.INTERSTITIAL
//     : AD_UNIT_IDS.INTERSTITIAL || TestIds.INTERSTITIAL;

const adUnitId = TestIds.INTERSTITIAL;

type DailyCounter = {
    date: string; // YYYY-MM-DD
    count: number;
};

const STORAGE_KEYS = {
    dailyCounter: "ads:dailyCounter",
};

function todayStr() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
}

function getDailyCounter(): DailyCounter {
    const raw = getString(STORAGE_KEYS.dailyCounter);
    const today = todayStr();
    if (!raw) return { date: today, count: 0 };
    try {
        const parsed = JSON.parse(raw) as DailyCounter;
        if (parsed.date !== today) {
            return { date: today, count: 0 };
        }
        return parsed;
    } catch {
        return { date: today, count: 0 };
    }
}

function incrementDailyCounter() {
    const c = getDailyCounter();
    const next = { date: todayStr(), count: c.count + 1 };
    setItem(STORAGE_KEYS.dailyCounter, JSON.stringify(next));
}

export function useLoadInterstitialAds() {
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    useEffect(() => {
        const fiveMinutesMs = minutesToMillis(5);
        const interval = setInterval(() => {
            const daily = getDailyCounter();
            if (daily.count >= 10) return;

            const loadedListener = interstitial.addAdEventListener(
                AdEventType.LOADED,
                () => {
                    interstitial.show();
                    incrementDailyCounter();
                },
            );
            const errorListener = interstitial.addAdEventListener(
                AdEventType.ERROR,
                () => {
                    // swallow
                },
            );
            interstitial.load();

            // Clean listeners after each attempt to avoid leaks
            setTimeout(() => {
                loadedListener();
                errorListener();
            }, 0);
        }, fiveMinutesMs);

        return () => clearInterval(interval);
    }, []);
}
