import { AD_UNIT_IDS } from "@/constants";
import { useRef } from "react";
import { Platform } from "react-native";
import {
    BannerAd,
    BannerAdSize,
    TestIds,
    useForeground,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
    ? TestIds.BANNER
    : AD_UNIT_IDS.BANNER || TestIds.BANNER;

export function RNBannerAd() {
    const bannerRef = useRef<BannerAd>(null);

    useForeground(() => {
        if (Platform.OS === "ios") {
            bannerRef.current?.load();
        }
    });

    return (
        <BannerAd
            ref={bannerRef}
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
    );
}
