import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Stack } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    SectionList,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

const renderSchene = SceneMap({
    all: AllTab,
    earned: EarnedTab,
    redeemed: RedeemedTab,
});
const routes = [
    { key: "all", title: "All" },
    { key: "earned", title: "Earned" },
    { key: "redeemed", title: "Redeemed" },
];

export default function Screen() {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [tabWidth, setTabWidth] = useState(0);
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Point History" }} />
            <Layout>
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
                                    padding: 8,
                                }}
                            >
                                {props.navigationState.routes.map((route, i) => {
                                    const isFocused = index === i;
                                    return (
                                        <Pressable
                                            key={route.key}
                                            onPress={() => setIndex(i)}
                                            style={{
                                                paddingVertical: 10,
                                                width: tabWidth / routes.length - 16,
                                                alignItems: "center",
                                                borderRadius: 12,
                                                backgroundColor: isFocused
                                                    ? COLORS.primary
                                                    : "transparent",
                                            }}
                                        >
                                            <RNText
                                                variant="primary"
                                                size="lg"
                                                style={{
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
            </Layout>
        </>
    );
}

const data = [
    {
        title: "2025-11-09",
        data: ["Component A", "Component B", "Component C"],
    },
    {
        title: "2025-11-08",
        data: ["Component D", "Component E"],
    },
    {
        title: "2025-11-07",
        data: ["Component F"],
    },
];

function AllTab() {
    return (
        <View>
            <RNText>All Points History</RNText>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <RNText style={styles.itemText}>{item}</RNText>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <RNText style={styles.header}>{title}</RNText>
                )}
                contentContainerStyle={styles.container}
            />
        </View>
    );
}

function EarnedTab() {
    return (
        <View>
            <RNText>Earned Points History</RNText>
        </View>
    );
}

function RedeemedTab() {
    return (
        <View>
            <RNText>Redeemed Points History</RNText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
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
});
