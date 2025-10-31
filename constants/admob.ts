import { Platform } from "react-native";

export const AD_UNIT_IDS = {
    APP_OPEN: Platform.select({
        ios: "ca-app-pub-4878447378564701/7700538411",
        android: "ca-app-pub-4878447378564701/8330738584",
    }),
    BANNER: Platform.select({
        ios: "ca-app-pub-4878447378564701/7017656910",
        android: "ca-app-pub-4878447378564701/5896146935",
    }),
    IN_READ_CHAT: Platform.select({
        ios: "ca-app-pub-4878447378564701/4290694877",
        android: "ca-app-pub-4878447378564701/5276473480",
    }),
    INTERSTITIAL: Platform.select({
        ios: "ca-app-pub-4878447378564701/1054883796",
        android: "ca-app-pub-4878447378564701/4994128802",
    }),
    REWARDED: Platform.select({
        ios: "ca-app-pub-4878447378564701/8274898269",
        android: "ca-app-pub-4878447378564701/4583065265",
    }),
};

export const keywords = [];
