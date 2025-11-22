import Entypo from "@expo/vector-icons/Entypo";
import { LeaderBoardData } from "@/type/leaderboard-data";
import { StyleSheet, Text, View } from "react-native";
import { RNText } from "../ui/text";
import { COLORS } from "@/constants";

type Props = {
    list: LeaderBoardData;
};

export function LeaderBoardList({ list }: Props) {
    return (
        <View style={styles.container}>
            {list.map((item, index) => (
                <View key={item.id} style={styles.itemContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <RNText size="lg" variant="title" style={styles.rightBorder}>
                            {index + 4}
                        </RNText>
                        <RNText variant="title" size="lg">
                            {item.name}
                        </RNText>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                        <Text
                            style={{
                                color: COLORS.primary,
                                fontFamily: "SuezOne",
                                fontSize: 20,
                                fontWeight: "600",
                            }}
                        >
                            {item.points}
                        </Text>
                        {item.wentUp ? (
                            <Entypo name="chevron-up" size={24} color={COLORS.blue} />
                        ) : (
                            <Entypo name="chevron-down" size={24} color={COLORS.accent} />
                        )}
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingBottom: 32,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        backgroundColor: COLORS.primary + "33",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    rightBorder: {
        borderRightWidth: 2,
        borderRightColor: "#00000033",
        paddingRight: 10,
        paddingVertical: 6,
        marginRight: 10,
    },
});
