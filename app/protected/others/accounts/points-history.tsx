import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { PointItem } from "@/components/common/history-point-item";
import { GradientBG } from "@/components/ui/gradient-bg";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { rawData } from "@/lib/point-history-fake-data";
import { Stack } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    SectionList,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";

const renderSchene = SceneMap({
    all: AllTab,
    earned: EarnedTab,
    pending: PendingTab,
    redeemed: RedeemedTab,
});
const routes = [
    { key: "all", title: "All" },
    { key: "earned", title: "Earned" },
    { key: "pending", title: "Pending" },
    { key: "redeemed", title: "Redeemed" },
];

export default function Screen() {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [tabWidth, setTabWidth] = useState(0);
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Point History" }} />
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: COLORS.background,
                    padding: 16,
                }}
                edges={[]}
            >
                <GradientBG
                    style={{
                        padding: 20,
                        borderRadius: 16,
                        marginBottom: 16,
                    }}
                >
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <RNText
                                style={{
                                    color: COLORS.background,
                                }}
                            >
                                Total Points
                            </RNText>
                            <RNText
                                size="4xl"
                                style={{
                                    color: COLORS.background,
                                    fontWeight: "bold",
                                }}
                            >
                                2,879
                            </RNText>
                        </View>
                        <View
                            style={{
                                padding: 14,
                                backgroundColor: COLORS.backgroundSecondary + "33",
                                alignSelf: "flex-start",
                                borderRadius: "50%",
                                borderWidth: 1,
                                borderColor: COLORS.backgroundSecondary + "33",
                            }}
                        >
                            <FontAwesome6 name="coins" size={28} color={COLORS.background} />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 20,
                        }}
                    >
                        <View style={styles.cardChildren}>
                            <RNText style={styles.cardItemText}>This Month</RNText>
                            <RNText size="xl" variant="title" style={styles.cardItemText}>
                                +450
                            </RNText>
                        </View>
                        <View style={styles.cardChildren}>
                            <RNText style={styles.cardItemText}>Redeemed</RNText>
                            <RNText size="xl" variant="title" style={styles.cardItemText}>
                                1,200
                            </RNText>
                        </View>
                    </View>
                </GradientBG>

                <TabView
                    renderScene={renderSchene}
                    navigationState={{ index, routes }}
                    initialLayout={{ width: layout.width }}
                    onIndexChange={setIndex}
                    renderTabBar={(props) => {
                        return (
                            <View
                                onLayout={(e) => {
                                    setTabWidth(e.nativeEvent.layout.width);
                                }}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    backgroundColor: COLORS.primary + "1A",
                                    borderRadius: 12,
                                    paddingVertical: 6,
                                }}
                            >
                                {props.navigationState.routes.map((route, i) => {
                                    const isFocused = index === i;
                                    return (
                                        <Pressable
                                            key={route.key}
                                            onPress={() => setIndex(i)}
                                            style={{
                                                paddingVertical: 6,
                                                width: tabWidth / routes.length,
                                                alignItems: "center",
                                                borderRadius: 12,
                                                backgroundColor: isFocused
                                                    ? COLORS.primary
                                                    : "transparent",
                                            }}
                                        >
                                            <RNText
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: isFocused ? "500" : "400",
                                                    color: isFocused
                                                        ? COLORS.backgroundSecondary
                                                        : COLORS.muted,
                                                }}
                                            >
                                                {route.title}
                                            </RNText>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        );
                    }}
                />
            </SafeAreaView>
        </>
    );
}

function AllTab() {
    const allData = rawData;

    return (
        <SectionList
            sections={allData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PointItem item={item} />}
            renderSectionHeader={({ section }) => (
                <RNText style={styles.header}>{section.date}</RNText>
            )}
            contentContainerStyle={styles.container}
        />
    );
}

function EarnedTab() {
    const earnedData = rawData.map((section) =>
        section.data.filter((item) => item.points > 0),
    );

    const finalEarnedData = rawData
        .map((s, index) => ({
            date: s.date,
            data: earnedData[index],
        }))
        .filter((s) => s.data.length > 0);

    return (
        <SectionList
            sections={finalEarnedData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PointItem item={item} />}
            renderSectionHeader={({ section }) => (
                <RNText style={styles.header}>{section.date}</RNText>
            )}
            contentContainerStyle={styles.container}
        />
    );
}

function PendingTab() {
    const pendingData = rawData.map((section) =>
        section.data.filter((item) => item.points < 0),
    );

    const finalPandingData = rawData
        .map((s, index) => ({
            date: s.date,
            data: pendingData[index],
        }))
        .filter((s) => s.data.length > 0);

    return (
        <SectionList
            sections={finalPandingData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PointItem item={item} />}
            renderSectionHeader={({ section }) => (
                <RNText style={styles.header}>{section.date}</RNText>
            )}
            contentContainerStyle={styles.container}
        />
    );
}

function RedeemedTab() {
    const redeemedData = rawData.map((section) =>
        section.data.filter((item) => item.points < 0),
    );

    const finalRedeemedData = rawData
        .map((s, index) => ({
            date: s.date,
            data: redeemedData[index],
        }))
        .filter((s) => s.data.length > 0);

    return (
        <SectionList
            sections={finalRedeemedData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PointItem item={item} />}
            renderSectionHeader={({ section }) => (
                <RNText style={styles.header}>{section.date}</RNText>
            )}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        color: "#444",
    },
    item: {
        backgroundColor: "#f3f3f3",
        padding: 12,
        borderRadius: 10,
        marginTop: 8,
    },
    itemText: {
        fontSize: 16,
        color: "#222",
    },

    cardChildren: {
        alignItems: "center",
        justifyContent: "center",
        width: "48%",
        gap: 4,
        backgroundColor: COLORS.backgroundSecondary + "33",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.backgroundSecondary + "33",
        padding: 12,
    },

    cardItemText: {
        color: COLORS.backgroundSecondary,
    },
});
