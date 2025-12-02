import "dotenv/config";

export default {
    expo: {
        name: "oui-impact",
        slug: "oui-impact",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "ouiimpact",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.ouidogood.ouiimpact",
            infoPlist: {
                ITSAppUsesNonExemptEncryption: false,
            },
        },
        android: {
            adaptiveIcon: {
                backgroundColor: "#E6F4FE",
                foregroundImage: "./assets/images/android-icon-foreground.png",
                backgroundImage: "./assets/images/android-icon-background.png",
                monochromeImage: "./assets/images/android-icon-monochrome.png",
            },
            edgeToEdgeEnabled: true,
            predictiveBackGestureEnabled: false,
            package: "com.ouidogood.ouiimpact",
        },
        web: {
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        plugins: [
            "expo-router",
            "react-native-localize",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff",
                    dark: {
                        backgroundColor: "#ffffff",
                    },
                },
            ],
            [
                "react-native-google-mobile-ads",
                {
                    androidAppId: process.env.ADMOB_ANDROID_APP_ID,
                    iosAppId: process.env.ADMOB_IOS_APP_ID,
                },
            ],
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#FFFFFF",
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
            reactCompiler: true,
        },

        extra: {
            eas: {
                projectId: "4b97af7a-0aa2-433e-a9f8-f391bf177f38",
            },
        },
        "react-native-google-mobile-ads": {
            android_app_id: process.env.ADMOB_ANDROID_APP_ID,
            ios_app_id: process.env.ADMOB_IOS_APP_ID,
        },
    },
};
