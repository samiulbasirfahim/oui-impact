import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, View } from "react-native";
import COINS from "@/assets/svgs/coins.svg";
import { COLORS } from "@/constants";
import { RNText } from "../ui/text";
import { router } from "expo-router";

export function PointsCard() {
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
                router.push("/protected/(tabs)/account/points-history");
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
                    Points History
                </RNText>
                <RNText
                    style={{ marginTop: 4, color: COLORS.muted }}
                    size="sm"
                    variant="base"
                >
                    View your points history and see how you've earned and redeemed
                </RNText>
            </View>
            <AntDesign name="right" size={24} color={COLORS.muted} />
        </Pressable>
    );
}
