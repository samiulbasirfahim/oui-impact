import { sha256 } from "react-native-sha256";
import {
    FacebookAuthProvider,
    getAuth,
    signInWithCredential,
} from "@react-native-firebase/auth";
import { Platform } from "react-native";
import {
    LoginManager,
    AccessToken,
    AuthenticationToken,
} from "react-native-fbsdk-next";

export function useFacebookSignIn() {
    const signInWithFacebook = async () => {
        try {
            if (Platform.OS === "android") {
                const result = await LoginManager.logInWithPermissions(["email"]);

                if (result.isCancelled) {
                    throw "User cancelled the login process";
                }

                const data = await AccessToken.getCurrentAccessToken();
                if (!data) {
                    throw "Something went wrong obtaining access token";
                }

                const facebookCredential = FacebookAuthProvider.credential(
                    data.accessToken,
                );

                const res = signInWithCredential(getAuth(), facebookCredential);
                console.log("Facebook Sign-In successful:", res);
                return res;
            } else if (Platform.OS === "ios") {
                const nonce = "123456";
                const nonceSha256 = await sha256(nonce);

                const result = await LoginManager.logInWithPermissions(
                    ["email"],
                    "limited",
                    nonceSha256,
                );

                const data = await AuthenticationToken.getAuthenticationTokenIOS();

                if (!data) {
                    throw "Something went wrong obtaining authentication token";
                }

                const facebookCredential = FacebookAuthProvider.credential(
                    data.authenticationToken,
                    nonce,
                );

                const res = signInWithCredential(getAuth(), facebookCredential);
                console.log("Facebook Sign-In successful:", res);
                return res;
            }
        } catch (err) {
            console.log("Facebook Login Error:", err);
            return null;
        }
    };

    return { signInWithFacebook };
}
