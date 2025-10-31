import { AD_UNIT_IDS } from "@/constants";
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

function randomChance(percent: number): boolean {
    return Math.random() * 100 < percent;
}

export function useLoadInterstitialAds() {
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    const firstLoad = useRef(false);

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener("state", (e) => {
            if (firstLoad.current === false) {
                firstLoad.current = true;
                return;
            }

            if (!randomChance(50)) {
                return;
            }

            const listener = interstitial.addAdEventListener(
                AdEventType.LOADED,
                () => {
                    interstitial.show();
                },
            );
            interstitial.load();

            return () => {
                listener();
            };
        });

        return unsubscribe;
    }, [navigation]);
}
