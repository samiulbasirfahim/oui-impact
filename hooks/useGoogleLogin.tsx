import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/lib/firebase";

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
    scheme: "ouiimpact",
});

export function useGoogleAuth() {
    const [_, __, promptAsync] = Google.useAuthRequest({
        clientId:
            "133922668414-6qr8tbto2ek8mpk7dsn40boiqlbivdd5.apps.googleusercontent.com",
        redirectUri,
    });

    async function login() {
        const res = await promptAsync();
        if (res.type === "success") {
            const credential = GoogleAuthProvider.credential(res.params.id_token);
            await signInWithCredential(auth, credential);
        }
    }

    return { login };
}
