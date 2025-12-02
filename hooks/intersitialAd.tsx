import { getNumber, getString, setItem } from "@/lib/mmkv";
import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
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
    lastAdTime: "ads:lastAdTime",
};

const MAX_ADS_PER_DAY = 10;
const MIN_AD_INTERVAL_MS = 4 * 60 * 1000; // 4 minutes

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

function getLastAdTime(): number {
    return getNumber(STORAGE_KEYS.lastAdTime) ?? 0;
}

function setLastAdTime(time: number): void {
    setItem(STORAGE_KEYS.lastAdTime, time);
}

function canShowAd(): boolean {
    const daily = getDailyCounter();
    if (daily.count >= MAX_ADS_PER_DAY) {
        return false;
    }
    
    const lastAdTime = getLastAdTime();
    const now = Date.now();
    const timeSinceLastAd = now - lastAdTime;
    
    return timeSinceLastAd >= MIN_AD_INTERVAL_MS;
}

export function useLoadInterstitialAds() {
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    const firstLoad = useRef(false);
    const navigation = useNavigation();

    // Show ad on initial mount
    useEffect(() => {
        const daily = getDailyCounter();
        if (daily.count < MAX_ADS_PER_DAY) {
            const loadedListener = interstitial.addAdEventListener(
                AdEventType.LOADED,
                () => {
                    interstitial.show();
                    incrementDailyCounter();
                    setLastAdTime(Date.now());
                }
            );
            const errorListener = interstitial.addAdEventListener(
                AdEventType.ERROR,
                () => {
                    // swallow
                }
            );
            interstitial.load();

            return () => {
                loadedListener();
                errorListener();
            };
        }
    }, []);

    // Show ad on navigation change
    useEffect(() => {
        const unsubscribe = navigation.addListener("state", () => {
            if (firstLoad.current === false) {
                firstLoad.current = true;
                return;
            }

            if (!canShowAd()) {
                return;
            }

            const loadedListener = interstitial.addAdEventListener(
                AdEventType.LOADED,
                () => {
                    interstitial.show();
                    incrementDailyCounter();
                    setLastAdTime(Date.now());
                }
            );
            const errorListener = interstitial.addAdEventListener(
                AdEventType.ERROR,
                () => {
                    // swallow
                }
            );
            interstitial.load();

            return () => {
                loadedListener();
                errorListener();
            };
        });

        return unsubscribe;
    }, [navigation]);
}
