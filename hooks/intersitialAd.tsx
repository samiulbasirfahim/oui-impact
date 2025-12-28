import { AD_UNIT_IDS } from "@/constants";
import { fetcher } from "@/lib/fetcher";
import { getNumber, getString, setItem } from "@/lib/mmkv";
import { useAuthStore } from "@/store/auth";
import { usePointsConfigStore } from "@/store/points-config";
import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import {
    AdEventType,
    InterstitialAd,
    TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
    ? TestIds.INTERSTITIAL
    : AD_UNIT_IDS.INTERSTITIAL || TestIds.INTERSTITIAL;

type DailyCounter = {
    date: string;
    count: number;
};

const STORAGE_KEYS = {
    dailyCounter: "ads:dailyCounter",
    lastAdTime: "ads:lastAdTime",
};

function todayStr() {
    return new Date().toISOString().slice(0, 10);
}

function getDailyCounter(): DailyCounter {
    const raw = getString(STORAGE_KEYS.dailyCounter);
    const today = todayStr();

    if (!raw) return { date: today, count: 0 };

    try {
        const parsed = JSON.parse(raw) as DailyCounter;
        return parsed.date === today ? parsed : { date: today, count: 0 };
    } catch {
        return { date: today, count: 0 };
    }
}

function updateDailyCounter() {
    const current = getDailyCounter();
    setItem(
        STORAGE_KEYS.dailyCounter,
        JSON.stringify({ date: todayStr(), count: current.count + 1 }),
    );
}

function getLastAdTime() {
    return getNumber(STORAGE_KEYS.lastAdTime) ?? 0;
}

function setLastAdTime(time: number) {
    setItem(STORAGE_KEYS.lastAdTime, time);
}

export function useLoadInterstitialAds() {
    const { getPointsConfig } = usePointsConfigStore();
    const { addPoints } = useAuthStore();
    const navigation = useNavigation();
    const firstLoad = useRef(true);

    const interstitial = useRef(
        InterstitialAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
        }),
    ).current;

    function canShowAd() {
        const config = getPointsConfig();
        const daily = getDailyCounter();

        if (daily.count >= (config?.max_intersihal_ads_earn ?? 5)) return false;

        const intervalMs = (config?.intersitial_interval_earn ?? 5) * 60 * 1000;

        return Date.now() - getLastAdTime() >= intervalMs;
    }

    function rewardUser() {
        const ptn = getPointsConfig()?.per_intersihal_ads_earn ?? 5;
        fetcher("/history/update/points/", {
            method: "POST",
            auth: true,
            body: {
                points: getPointsConfig()?.per_intersihal_ads_earn ?? 5,
                title: "Watched an interstitial ad",
                description: "-",
            },
        }).then(() => {
            addPoints(ptn);
        });
    }

    function loadAndShowAd() {
        if (!canShowAd()) return;
        interstitial.load();
    }

    useEffect(() => {
        const onLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () =>
            interstitial.show(),
        );

        const onOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
            updateDailyCounter();
            setLastAdTime(Date.now());
            rewardUser();
        });

        const onError = interstitial.addAdEventListener(
            AdEventType.ERROR,
            () => { },
        );

        return () => {
            onLoaded();
            onOpened();
            onError();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener("state", () => {
            if (firstLoad.current) {
                firstLoad.current = false;
                return;
            }
            loadAndShowAd();
        });

        console.log("Points Config", getPointsConfig());

        return unsubscribe;
    }, [navigation]);
}
