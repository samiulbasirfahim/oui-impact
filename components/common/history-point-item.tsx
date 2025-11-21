import { View } from "react-native";
import { RNText } from "../ui/text";
import { PointHistoryItem } from "@/type/point-history";

export function PointItem({ item }: { item: PointHistoryItem }) {
    const isPositive = item.points > 0;

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
                    {item.title}
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
