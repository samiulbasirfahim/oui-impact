import { LeaderboardHeader } from "@/components/common/leaderboard-header";
import { LeaderBoardList } from "@/components/common/leaderboard-list";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";

const renderSchene = SceneMap({
    today: todayTab,
    week: weekTab,
    month: monthTab,
});
const routes = [
    { key: "today", title: "today" },
    { key: "week", title: "week" },
    { key: "month", title: "month" },
];

export default function LeaderBoardScreen() {
    const { t } = useTranslation();
    const [index, setIndex] = useState(1);

    const layout = useWindowDimensions();

    const [tabWidth, setTabWidth] = useState(0);

    return (
        <>
            <Stack.Screen options={{ title: t("rewards.leaderboard.title") }} />
            <SafeAreaView
                edges={[]}
                style={{
                    flex: 1,
                    backgroundColor: COLORS.background,
                    padding: 16,
                }}
            >
                <TabView
                    renderScene={renderSchene}
                    navigationState={{ index, routes }}
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
                                                size="md"
                                                style={{
                                                    fontWeight: isFocused ? "500" : "400",
                                                    color: isFocused
                                                        ? COLORS.backgroundSecondary
                                                        : COLORS.muted,
                                                }}
                                            >
                                                {t(`rewards.leaderboard.tabs.${route.title}`)}
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

function todayTab() {
    return (
        <ScrollView>
            <LeaderboardHeader
                first={{
                    name: "Alice",
                    avatar: require("@/assets/images/placeholder-image.jpg"),
                }}
                second={{
                    name: "Bob",
                    avatar: require("@/assets/images/placeholder-image.jpg"),
                }}
                third={{
                    name: "Charlie",
                    avatar: require("@/assets/images/placeholder-image.jpg"),
                }}
            />

            <LeaderBoardList
                list={[
                    {
                        id: "1",
                        name: "David",
                        points: 1200,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: true,
                    },
                    {
                        id: "2",
                        name: "Eve",
                        points: 1150,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: false,
                    },
                    {
                        id: "3",
                        name: "Frank",
                        points: 1100,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: true,
                    },
                    {
                        id: "4",
                        name: "Grace",
                        points: 1050,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: false,
                    },
                    {
                        id: "5",
                        name: "Heidi",
                        points: 1000,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: true,
                    },
                    {
                        id: "6",
                        name: "Ivan",
                        points: 950,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: true,
                    },
                    {
                        id: "7",
                        name: "Judy",
                        points: 900,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: false,
                    },
                ]}
            />
        </ScrollView>
    );
}

function weekTab() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <LeaderboardHeader
                first={{
                    name: "Alice",
                    avatar: require("@/assets/images/placeholder-image.jpg"),
                }}
                second={{
                    name: "Bob",
                    avatar: require("@/assets/images/placeholder-image.jpg"),
                }}
                third={{
                    name: "Charlie",
                    avatar: require("@/assets/images/placeholder-image.jpg"),
                }}
            />

            <LeaderBoardList
                list={[
                    {
                        id: "1",
                        name: "David",
                        points: 1200,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: true,
                    },
                    {
                        id: "2",
                        name: "Eve",
                        points: 1150,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: false,
                    },
                    {
                        id: "3",
                        name: "Frank",
                        points: 1100,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: true,
                    },
                    {
                        id: "4",
                        name: "Grace",
                        points: 1050,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: false,
                    },
                    {
                        id: "5",
                        name: "Heidi",
                        points: 1000,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: true,
                    },
                ]}
            />
        </ScrollView>
    );
}

function monthTab() {
    return (
        <ScrollView>
            <LeaderboardHeader
                first={{
                    name: "Alice",
                    avatar: require("@/assets/images/placeholder-image.jpg"),
                }}
                second={{
                    name: "Bob",
                    avatar: require("@/assets/images/placeholder-image.jpg"),
                }}
                third={{
                    name: "Charlie",
                    avatar: require("@/assets/images/placeholder-image.jpg"),
                }}
            />

            <LeaderBoardList
                list={[
                    {
                        id: "1",
                        name: "David",
                        points: 1200,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: true,
                    },
                    {
                        id: "2",
                        name: "Eve",
                        points: 1150,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: false,
                    },
                    {
                        id: "3",
                        name: "Frank",
                        points: 1100,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: true,
                    },
                    {
                        id: "4",
                        name: "Grace",
                        points: 1050,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: false,
                    },
                    {
                        id: "5",
                        name: "Heidi",
                        points: 1000,
                        avatar: require("@/assets/images/placeholder-image.jpg"),
                        wentUp: true,
                    },
                ]}
            />
        </ScrollView>
    );
}
