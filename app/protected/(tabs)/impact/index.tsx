import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { TreeGoalProgress } from "@/components/common/tree-goal-progress";
import BOOK from "@/assets/svgs/book-2.svg";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { GradientBG } from "@/components/ui/gradient-bg";
import { IMPACT } from "@/type/recent-impact";
import { RNButton } from "@/components/ui/button";
import { Stack } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const MOCK_IMPACT_DATA: IMPACT[] = [
    {
        id: "1",
        description: "You helped plant a tree in the Amazon rainforest.",
        date: new Date("2024-06-15"),
        pointsEarned: 50,
        donatedOn: "tree",
    },
    {
        id: "2",
        description: "You contributed to clean water projects in Africa.",
        date: new Date("2024-06-14"),
        pointsEarned: 30,
        donatedOn: "water",
    },
    {
        id: "3",
        description: "You supported education initiatives in Asia.",
        date: new Date("2024-06-13"),
        pointsEarned: 40,
        donatedOn: "healthcare",
    },
    {
        id: "4",
        description: "You helped plant a tree in the Amazon rainforest.",
        date: new Date("2024-06-12"),
        pointsEarned: 50,
        donatedOn: "tree",
    },
    {
        id: "5",
        date: new Date("2024-06-11"),
        pointsEarned: 30,
        donatedOn: "education",
        description: "You contributed to teaching materials for children.",
    },
];

export default function ImpactIndex() {
    return (
        <>
            <Stack.Screen options={{ title: "Impact" }} />
            <Layout>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <RNText variant="title" size="xl">
                        Your Impact
                    </RNText>
                    <RNText
                        size="sm"
                        style={{
                            padding: 8,
                            backgroundColor: COLORS.primary + "20",
                            borderRadius: 8,
                        }}
                    >
                        ⭐ Regular Member
                    </RNText>
                </View>
                <RNText>Every ad you watch funds real-world change.</RNText>

                <RNText
                    style={{
                        marginTop: 24,
                        textAlign: "center",
                        marginHorizontal: 16,
                        padding: 14,
                        backgroundColor: COLORS.impactCardsBG,
                        borderRadius: 20,
                        fontWeight: "500",
                        color: COLORS.secondary,
                    }}
                    size="lg"
                >
                    Together, Rewardly users have funded 12,482 trees.
                </RNText>
                <View style={styles.statCard}>
                    <View style={styles.statChild}>
                        <RNText
                            size="2xl"
                            variant="title"
                            style={{ color: COLORS.secondary }}
                        >
                            12L
                        </RNText>
                        <RNText style={{ color: COLORS.muted, fontStyle: "italic" }}>
                            💧Water Donated
                        </RNText>
                    </View>

                    <View style={styles.statChild}>
                        <RNText
                            size="2xl"
                            variant="title"
                            style={{ color: COLORS.primary }}
                        >
                            4
                        </RNText>
                        <RNText style={{ color: COLORS.muted, fontStyle: "italic" }}>
                            🌲 Water Donated
                        </RNText>
                    </View>
                </View>

                <View style={styles.progressContainer}>
                    <TreeGoalProgress percent={20} />
                    <RNText size="xl" style={{ fontWeight: "500" }}>
                        Next Tree Goal
                    </RNText>
                    <RNText
                        style={{
                            textAlign: "center",
                            color: COLORS.muted,
                        }}
                    >
                        Keep engaging to reach your next milestone.
                    </RNText>
                </View>
                <View
                    style={{
                        ...styles.statCard,
                        flexDirection: "column",
                        gap: 16,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View style={{ ...styles.statChild, flexDirection: "row", gap: 12 }}>
                        <View
                            style={{
                                padding: 10,
                                borderRadius: 24,
                                backgroundColor: COLORS.background + "40",
                            }}
                        >
                            <BOOK width={22} height={22} />
                        </View>
                        <RNText variant="title" size="lg">
                            Room to Read
                        </RNText>
                    </View>

                    <RNText
                        style={{
                            textAlign: "center",
                            color: COLORS.muted,
                        }}
                    >
                        You're supporting Room to Read — helping children get access to
                        books.
                    </RNText>

                    <TouchableOpacity
                        style={{
                            width: "100%",
                            borderRadius: 12,
                        }}
                    >
                        <GradientBG
                            colors={["#A5D3B4", "#5A92B1"]}
                            style={{
                                paddingVertical: 10,
                                width: "100%",
                                borderRadius: 12,
                            }}
                        >
                            <RNText
                                style={{
                                    textAlign: "center",
                                    color: COLORS.background,
                                }}
                                size="lg"
                            >
                                Learn More
                            </RNText>
                        </GradientBG>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 24, marginBottom: 12 }}>
                    <RNText
                        style={{
                            fontWeight: "600",
                            fontSize: 20,
                        }}
                    >
                        Recent Impact
                    </RNText>

                    {MOCK_IMPACT_DATA.map((impact, i) => (
                        <View
                            key={impact.id}
                            style={{
                                padding: 14,
                                borderRadius: 12,
                                borderBottomWidth: i === MOCK_IMPACT_DATA.length - 1 ? 0 : 1,
                                borderBottomColor: COLORS.muted + "20",
                                gap: 4,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {impact.donatedOn === "tree" ? (
                                <Ionicons
                                    name="leaf-sharp"
                                    size={24}
                                    color={COLORS.primary}
                                    style={{
                                        marginRight: 8,
                                        padding: 12,
                                        backgroundColor: COLORS.primary + "40",
                                        borderRadius: 24,
                                        flexShrink: 0,
                                    }}
                                />
                            ) : impact.donatedOn === "water" ? (
                                <Ionicons
                                    name="water"
                                    size={24}
                                    color={COLORS.blue}
                                    style={{
                                        marginRight: 8,
                                        padding: 12,
                                        backgroundColor: COLORS.blue + "40",
                                        borderRadius: 24,
                                        flexShrink: 0,
                                    }}
                                />
                            ) : impact.donatedOn === "education" ? (
                                <MaterialCommunityIcons
                                    name="book-open-page-variant"
                                    size={24}
                                    color={COLORS.secondary}
                                    style={{
                                        marginRight: 8,
                                        padding: 12,
                                        backgroundColor: COLORS.secondary + "40",
                                        borderRadius: 24,
                                        flexShrink: 0,
                                    }}
                                />
                            ) : impact.donatedOn === "healthcare" ? (
                                <MaterialCommunityIcons
                                    name="heart"
                                    size={24}
                                    color={COLORS.purple}
                                    style={{
                                        marginRight: 8,
                                        padding: 12,
                                        backgroundColor: COLORS.purple + "40",
                                        borderRadius: 24,
                                        flexShrink: 0,
                                    }}
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="gift"
                                    size={24}
                                    color={COLORS.primary}
                                    style={{
                                        marginRight: 8,
                                        padding: 12,
                                        backgroundColor: COLORS.primary + "40",
                                        borderRadius: 24,
                                        flexShrink: 0,
                                    }}
                                />
                            )}
                            <View style={{ flex: 1, minWidth: 0 }}>
                                <RNText
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "500",
                                        color: "black",
                                    }}
                                >
                                    You earned {impact.pointsEarned} points
                                    <MaterialCommunityIcons
                                        name="arrow-right"
                                        size={16}
                                        color="black"
                                        style={{ marginHorizontal: 4 }}
                                    />
                                    {impact.description}
                                </RNText>
                                <RNText
                                    style={{
                                        color: COLORS.muted,
                                        fontSize: 14,
                                        marginTop: 4,
                                    }}
                                >
                                    {impact.date.toDateString()}
                                </RNText>
                            </View>
                        </View>
                    ))}
                </View>

                <GradientBG
                    colors={["#FFD700", "#FFD700", "#FFf2B2"]}
                    style={{
                        padding: 16,
                        borderRadius: 12,
                        marginTop: 16,
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <RNText
                        variant="title"
                        size="lg"
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Amplify Your Impact
                    </RNText>

                    <RNText
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Upgrade to Premium and earn 2× points on every ad you watch.
                    </RNText>

                    <RNText
                        style={{
                            textAlign: "center",
                            color: COLORS.muted,
                        }}
                        size="sm"
                    >
                        Ad-free, double rewards, exclusive badges.
                    </RNText>
                    <RNButton
                        style={{
                            marginTop: 12,
                            width: "100%",
                            backgroundColor: COLORS.text,
                        }}
                    >
                        Upgrade to Premium
                    </RNButton>
                </GradientBG>

                <RNText
                    variant="title"
                    size="lg"
                    style={{
                        marginTop: 24,
                        textAlign: "center",
                    }}
                >
                    Share Your Impact
                </RNText>

                <View
                    style={{
                        backgroundColor: COLORS.backgroundSecondary,
                        padding: 16,
                        borderRadius: 12,
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <Image
                        source={require("@/assets/images/placeholder-image.jpg")}
                        style={{
                            borderRadius: 50,
                            width: 80,
                            height: 80,
                        }}
                    />
                    <RNText variant="title" size="lg">
                        Ichigo Kurosaki
                    </RNText>

                    <RNText
                        style={{
                            color: COLORS.muted,
                        }}
                        size="md"
                    >
                        47 Points Earned • Silver Badge
                    </RNText>
                    <FontAwesome5 name="medal" size={24} color={"#9CA3AF"} />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 16,
                        gap: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: COLORS.muted + "20",
                        paddingBottom: 16,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            console.log("CLICKED SHARE BUTTON");
                        }}
                    >
                        <FontAwesome
                            name="instagram"
                            size={22}
                            color={COLORS.background}
                            style={{
                                padding: 14,
                                backgroundColor: "#EC4899",
                                borderRadius: "100%",
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("CLICKED SHARE BUTTON");
                        }}
                    >
                        <FontAwesome6
                            name="tiktok"
                            size={22}
                            color={COLORS.background}
                            style={{
                                padding: 14,
                                backgroundColor: "#111827",
                                borderRadius: "100%",
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("CLICKED SHARE BUTTON");
                        }}
                    >
                        <FontAwesome
                            name="whatsapp"
                            size={22}
                            color={COLORS.background}
                            style={{
                                padding: 14,
                                backgroundColor: "#10B981",
                                borderRadius: "100%",
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <RNText
                    style={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "400",
                        marginVertical: 8,
                        color: COLORS.muted,
                    }}
                >
                    Keep earning points!
                </RNText>
                <GradientBG
                    style={{
                        padding: 16,
                        borderRadius: 12,
                        gap: 12,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Entypo name="leaf" size={24} color={COLORS.background} />
                        <RNText style={{ color: COLORS.background }} size="lg">
                            Watch more ads to grow your impact!
                        </RNText>
                    </View>
                </GradientBG>
            </Layout>
        </>
    );
}

const styles = StyleSheet.create({
    statCard: {
        flexDirection: "row",
        justifyContent: "space-around",
        textAlign: "center",
        padding: 14,
        backgroundColor: COLORS.impactCardsBG,
        borderRadius: 20,
        fontWeight: "500",
        color: COLORS.secondary,
    },
    statChild: {
        alignItems: "center",
    },
    progressContainer: {
        alignItems: "center",
        gap: 8,
        backgroundColor: COLORS.impactCardsBG,
        borderRadius: 20,
        padding: 16,
    },
});
