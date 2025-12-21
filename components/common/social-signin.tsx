import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TouchableOpacity, View } from "react-native";
import GOOGLE from "../../assets/svgs/gogole.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RNText } from "../ui/text";
import { COLORS } from "@/constants";
import { useTranslation } from "react-i18next";
import { useGoogleAuth } from "@/hooks/useGoogleLogin";

export function SocialSignIn() {
    const { t } = useTranslation();

    const { login: googleSignIn } = useGoogleAuth();

    return (
        <View style={{ width: "100%", gap: 8 }}>
            {/* Google */}
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
                onPress={googleSignIn}
            >
                <GOOGLE width={30} height={31} />
                <RNText>{t("auth.createAccount.google")}</RNText>
            </TouchableOpacity>

            {/* Facebook */}
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
            >
                <FontAwesome5 name="facebook" size={24} color="white" />
                <RNText style={{ color: "white" }}>
                    {t("auth.createAccount.facebook")}
                </RNText>
            </TouchableOpacity>

            {/* Apple */}
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
            >
                <AntDesign name="apple" size={24} color="white" />
                <RNText style={{ color: "white" }}>
                    {t("auth.createAccount.apple")}
                </RNText>
            </TouchableOpacity>
        </View>
    );
}
