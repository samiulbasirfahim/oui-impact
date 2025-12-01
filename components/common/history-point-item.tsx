import { View } from "react-native";
import { RNText } from "../ui/text";
import { PointHistoryItem } from "@/type/point-history";
import { useTranslation } from "react-i18next";

const titleKeyMap: Record<string, string> = {
    "Purchase Reward": "account.pointsHistory.items.purchaseReward",
    "Review Reward": "account.pointsHistory.items.reviewReward",
    "Daily Check-in Bonus": "account.pointsHistory.items.dailyCheckinBonus",
    "Redeemed Coupon": "account.pointsHistory.items.redeemedCoupon",
    "Referral Reward": "account.pointsHistory.items.referralReward",
    "Redeemed Gift Card": "account.pointsHistory.items.redeemedGiftCard",
    "App Event Participation": "account.pointsHistory.items.appEventParticipation",
    "Daily Login Bonus": "account.pointsHistory.items.dailyLoginBonus",
    "Redeemed Points": "account.pointsHistory.items.redeemedPoints",
    "Survey Reward": "account.pointsHistory.items.surveyReward",
    "11.11 Sale Bonus": "account.pointsHistory.items.sale1111Bonus",
};

export function PointItem({ item }: { item: PointHistoryItem }) {
    const { t } = useTranslation();
    const isPositive = item.points > 0;
    const titleKey = titleKeyMap[item.title];
    const translatedTitle = titleKey ? t(titleKey) : item.title;

    return (
        <View
            style={{
                backgroundColor: "#fff",
                padding: 16,
                borderRadius: 12,
                marginTop: 10,
                borderWidth: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "#E7E7E7",
            }}
        >
            <View
                style={{
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                }}
            >
                <RNText size="lg" style={{ fontWeight: "600" }}>
                    {translatedTitle}
                </RNText>

                <RNText style={{ color: "#777", marginTop: 4 }}>{item.subtitle}</RNText>
            </View>

            <View
                style={{
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                }}
            >
                <RNText
                    style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: isPositive ? "#0BA34D" : "#D7373F",
                    }}
                >
                    {isPositive ? "+" : ""}
                    {item.points}
                </RNText>
                <RNText style={{ color: "#999" }}>{item.time}</RNText>
            </View>
        </View>
    );
}
