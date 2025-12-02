import { COLORS } from "@/constants";
import { Redeem } from "@/type/redeem";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { RNText } from "../ui/text";

const dummy_data: Redeem[] = [
    {
        datetime: "2024-06-01T10:00:00Z",
        title: "Redeemed for 5 trees",
        description: "Charity Donate",
        points: 50,
    },
    {
        datetime: "2024-05-15T14:30:00Z",
        title: "Redeemed for 10% Discount Coupon",
        description: "Offer Redeem",
        points: 100,
    },
    {
        datetime: "2024-04-20T09:15:00Z",
        title: "Redeemed for 3 trees",
        description: "Charity Donate",
        points: 30,
    },
    {
        datetime: "2024-03-10T16:45:00Z",
        title: "Redeemed for 15% Discount Coupon",
        description: "Offer Redeem",
        points: 150,
    },
];

export function RedeemptionHistory() {
    const { t } = useTranslation();
    return (
        <View>
            <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="history" size={24} color={COLORS.text} />
                <RNText variant="subtitle" size="lg">
                    {t("rewards.offers.history")}
                </RNText>
            </View>

            {dummy_data.map((item, index) => (
                <View
                    key={index}
                    style={{
                        marginTop: 12,
                        padding: 12,
                        paddingVertical: 16,
                        borderRadius: 8,
                        backgroundColor: COLORS.background,
                        borderWidth: 1,
                        borderColor: COLORS.muted + "33",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ width: "70%" }}>
                        <RNText
                            variant="title"
                            size="lg"
                            style={{
                                color: COLORS.text + "DD",
                            }}
                        >
                            {item.title}
                        </RNText>
                        <RNText variant="base" style={{ color: COLORS.secondaryText }}>
                            {item.description}
                        </RNText>
                    </View>
                    <View
                        style={{
                            alignItems: "flex-end",
                            width: "30%",
                        }}
                    >
                        <RNText
                            size="lg"
                            style={{
                                color: COLORS.accent,
                                fontWeight: "500",
                            }}
                        >
                            -{item.points}
                        </RNText>

                        <RNText
                            variant="caption"
                            size="sm"
                            style={{
                                color: COLORS.secondaryText,
                                textAlign: "right",
                                width: "100%",
                            }}
                        >
                            {new Date(item.datetime).toLocaleString("en-US", {
                                month: "long",
                                day: "numeric",
                            })}
                        </RNText>
                        <RNText
                            variant="caption"
                            size="sm"
                            style={{
                                color: COLORS.secondaryText,
                                textAlign: "right",
                                width: "100%",
                            }}
                        >
                            {new Date(item.datetime).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                            })}
                        </RNText>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    labelContainer: {
        marginTop: 12,
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
    },
});
