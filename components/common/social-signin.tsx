import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TouchableOpacity, View } from "react-native";
import GOOGLE from "../../assets/svgs/gogole.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RNText } from "../ui/text";
import { COLORS } from "@/constants";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAppleSignIn } from "@/hooks/social-signin-apple";
import { useGoogleSignIn } from "@/hooks/social-signin-google";
import { useFacebookSignIn } from "@/hooks/social-signin-facebook";

export function SocialSignIn() {
    const { t } = useTranslation();

    const [loadingStates, setLoadingStates] = useState({
        google: false,
        facebook: false,
        apple: false,
    });

    const disabled =
        loadingStates.google || loadingStates.facebook || loadingStates.apple;

    const { signInWithApple, appleAuthSupported } = useAppleSignIn();
    const { signInWithGoogle } = useGoogleSignIn();
    const { signInWithFacebook } = useFacebookSignIn();

    return (
        <View style={{ width: "100%", gap: 8 }}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                    borderWidth: 1,
                    borderColor: COLORS.muted,
                    paddingVertical: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    flexDirection: "row",
                    gap: 8,
                }}
                disabled={disabled}
                onPress={async () => {
                    setLoadingStates((prev) => ({ ...prev, google: true }));
                    await signInWithGoogle();
                    setLoadingStates((prev) => ({ ...prev, google: false }));
                }}
            >
                <GOOGLE width={30} height={31} />
                <RNText>{t("auth.createAccount.google")}</RNText>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                    paddingVertical: 11,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    gap: 8,
                    flexDirection: "row",
                    backgroundColor: "#3b5998",
                }}
                disabled={disabled}
                onPress={async () => {
                    setLoadingStates((prev) => ({ ...prev, facebook: true }));
                    await signInWithFacebook();
                    setLoadingStates((prev) => ({ ...prev, facebook: false }));
                }}
            >
                <FontAwesome5 name="facebook" size={24} color="white" />
                <RNText style={{ color: "white" }}>
                    {t("auth.createAccount.facebook")}
                </RNText>
            </TouchableOpacity>

            {/* Apple */}
            {appleAuthSupported() && (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                        paddingVertical: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 12,
                        gap: 8,
                        flexDirection: "row",
                        backgroundColor: "black",
                    }}
                    onPress={async () => {
                        setLoadingStates((prev) => ({ ...prev, apple: true }));
                        await signInWithApple();
                        setLoadingStates((prev) => ({ ...prev, apple: false }));
                    }}
                >
                    <AntDesign name="apple" size={24} color="white" />
                    <RNText style={{ color: "white" }}>
                        {t("auth.createAccount.apple")}
                    </RNText>
                </TouchableOpacity>
            )}
        </View>
    );
}
