import "dotenv/config";

export default {
    owner: "samiulbasirfahim",
    expo: {
        name: "oui-impact",
        slug: "ouiimpact",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/logo-big.png",
        scheme: "ouiimpact",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            googleServicesFile: "./GoogleService-Info.plist",
            supportsTablet: true,
            bundleIdentifier: "com.ouidogood.ouiimpact",
            entitlements: {
                "com.apple.developer.applesignin": ["Default"],
            },
            infoPlist: {
                ITSAppUsesNonExemptEncryption: false,
            },
        },
        android: {
            googleServicesFile: "./google-services.json",
            adaptiveIcon: {
                backgroundColor: "#E6F4FE",
                foregroundImage: "./assets/images/logo-big.png",
                backgroundImage: "./assets/images/logo-big.png",
                monochromeImage: "./assets/images/logo-big.png",
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
            "expo-web-browser",
            "react-native-localize",
            "@react-native-firebase/app",
            "@react-native-firebase/auth",
            [
                "react-native-fbsdk-next",
                {
                    appID: "3853793298089513",
                    displayName: "Oui Impact",
                    clientToken: "3992cad7a23309299be32f185badfa67",
                    clientToken: "3992cad7a23309299be32f185badfa67",
                    scheme: "fb3853793298089513",
                    advertiserIDCollectionEnabled: false,
                    autoLogAppEventsEnabled: false,
                    isAutoInitEnabled: true,
                    iosUserTrackingPermission:
                        "This identfier will be used to sign you in",
                },
            ],

            [
                "expo-build-properties",
                {
                    android: {
                        compileSdkVersion: 35,
                        targetSdkVersion: 35,
                        buildToolsVersion: "35.0.0",
                    },
                    ios: {
                        deploymentTarget: "15.1",
                        useFrameworks: "static",
                    },
                },
            ],
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
        ],
        experiments: {
            typedRoutes: true,
            reactCompiler: true,
        },

        extra: {
            eas: {
                projectId: "36440337-07af-4220-a8cf-9b44c9e98aa5",
            },
        },
        "react-native-google-mobile-ads": {
            android_app_id: process.env.ADMOB_ANDROID_APP_ID,
            ios_app_id: process.env.ADMOB_IOS_APP_ID,
        },
    },
};
