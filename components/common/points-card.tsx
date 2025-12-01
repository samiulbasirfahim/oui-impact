import COINS from "@/assets/svgs/coins.svg";
import { COLORS } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { RNText } from "../ui/text";

export function PointsCard() {
    const { t } = useTranslation();
    return (
        <Pressable
            style={{
                flexDirection: "row",
                backgroundColor: COLORS.backgroundSecondary,
                padding: 10,
                borderRadius: 12,
                alignItems: "center",
                paddingVertical: 16,
            }}
            onPress={() => {
                router.push("/protected/others/accounts/points-history");
            }}
        >
            <COINS width={40} height={40} />
            <View
                style={{
                    marginLeft: 12,
                    justifyContent: "center",
                    flex: 1,
                }}
            >
                <RNText size="lg" variant="title">
                    {t("account.settings.pointsHistory")}
                </RNText>
                <RNText
                    style={{ marginTop: 4, color: COLORS.muted }}
                    size="sm"
                    variant="base"
                >
                    {t("account.pointsHistory.description")}
                </RNText>
            </View>
            <AntDesign name="right" size={24} color={COLORS.muted} />
        </Pressable>
    );
}
