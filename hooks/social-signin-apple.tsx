import * as Crypto from "expo-crypto";

import {
    appleAuth,
    appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import { Platform } from "react-native";

export function useAppleSignIn() {
    const appleAuthSupported = () => {
        if (Platform.OS === "ios") {
            return appleAuth.isSupported;
        } else if (Platform.OS === "android") {
            console.log(
                "Apple Auth Android Supported: ",
                appleAuthAndroid.isSupported,
            );
            return appleAuthAndroid.isSupported;
        } else {
            return false;
        }
    };

    const signInWithApple = async () => {
        try {
            if (Platform.OS === "ios") {
                const response = await appleAuth.performRequest({
                    requestedOperation: appleAuth.Operation.LOGIN,
                    requestedScopes: [appleAuth.Scope.EMAIL],
                });

                const credentialState = await appleAuth.getCredentialStateForUser(
                    response.user,
                );

                if (credentialState === appleAuth.State.AUTHORIZED) {
                    console.log("Apple Sign-In Success: ", response);
                }
            } else if (Platform.OS === "android") {
                const rawNonce = Crypto.randomUUID();
                const state = Crypto.randomUUID();

                appleAuthAndroid.configure({
                    clientId: "com.ouidogood.ouiimpact",
                    scope: appleAuthAndroid.Scope.EMAIL,
                    redirectUri: "",
                    state,
                    nonce: rawNonce,
                });

                const response = await appleAuthAndroid.signIn();
                if (response) {
                    console.log("Apple Sign-In Success: ", response);
                }
            }
        } catch (error) {
            console.log("Apple Sign-In Error: ", error);
        }
    };

    return { signInWithApple, appleAuthSupported };
}
