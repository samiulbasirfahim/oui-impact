import {
    statusCodes,
    isErrorWithCode,
    isSuccessResponse,
    GoogleSignin,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
    webClientId:
        "14864997724-fkqiblgkinbikhnn5eo0v209dogcmars.apps.googleusercontent.com",
    scopes: ["email"],
});

export function useGoogleSignIn() {
    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn({});

            if (isSuccessResponse(userInfo)) {
                const idToken = userInfo.data.idToken;

                console.log("Google ID Token:", idToken);

                console.log("Google Sign-In successful:", userInfo);
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        console.log("User cancelled the login flow");
                        break;
                    case statusCodes.IN_PROGRESS:
                        console.log("Operation is in progress already");
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        console.log("Play services not available or outdated");
                        break;
                    default:
                        console.log("An unknown error occurred:", error);
                        break;
                }
            } else {
                console.log("An unexpected error occurred:", error);
            }
        }
    };

    return { signInWithGoogle };
}
