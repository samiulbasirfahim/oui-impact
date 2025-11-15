import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import TREE from "@/assets/svgs/tree.svg";
import BOOK from "@/assets/svgs/book.svg";
import { RNButton } from "@/components/ui/button";
import { LinearGradient } from "expo-linear-gradient";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Screen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Rewards",
                }}
            />
            <Layout>
                <LinearGradient
                    colors={["#A5D3B4", "#5A92B1"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.pointCardContainer}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 12,
                        }}
                    >
                        <View>
                            <RNText
                                style={{
                                    color: COLORS.background,
                                }}
                            >
                                Your Points
                            </RNText>
                            <RNText
                                style={{
                                    color: COLORS.background,
                                    fontSize: 32,
                                    paddingVertical: 10,
                                    fontWeight: "bold",
                                    marginTop: 8,
                                }}
                            >
                                1,250
                            </RNText>
                        </View>
                        <View
                            style={{
                                flexDirection: "column",
                                gap: 8,
                            }}
                        >
                            <View
                                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                            >
                                <TREE width={30} height={30} />
                                <RNText
                                    style={{
                                        color: COLORS.background,
                                    }}
                                >
                                    5 Trees
                                </RNText>
                            </View>

                            <View
                                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                            >
                                <BOOK width={30} height={30} />
                                <RNText
                                    style={{
                                        color: COLORS.background,
                                    }}
                                >
                                    3 Books
                                </RNText>
                            </View>
                        </View>
                        <View
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.3)",
                                padding: 15,
                                borderRadius: "50%",
                            }}
                        >
                            <FontAwesome5 name="coins" size={40} color={COLORS.background} />
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <AntDesign name="arrow-up" size={21} color={COLORS.background} />
                        <RNText
                            style={{
                                color: COLORS.background,
                            }}
                        >
                            +125 points this week
                        </RNText>
                    </View>
                </LinearGradient>

                <Link href="/protected/(tabs)/reward/watch-earn" asChild>
                    <RNButton
                        nowrap
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 16,
                        }}
                    >
                        <FontAwesome5 name="play" size={20} color="black" />
                        <RNText style={{ marginLeft: 8 }}>Watch & Earn</RNText>
                    </RNButton>
                </Link>

                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <RNText variant="title" size="lg">
                            Redeem your points
                        </RNText>
                        <Link href="/protected/(tabs)/reward/redeem">
                            <RNText
                                style={{
                                    color: COLORS.primary,
                                    textDecorationLine: "underline",
                                }}
                                size="sm"
                            >
                                View Point History
                            </RNText>
                        </Link>
                    </View>

                </View>

                <View style={styles.shareCardContainer}>
                    
                    <RNText>Share your progress with friends and earn extra points!</RNText>
                    <Link href="/protected/others/share-earn" asChild>
                        <RNButton
                            nowrap
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 12,
                            }}
                        >
                            <FontAwesome5 name="share-alt" size={20} color="black" />
                            <RNText style={{ marginLeft: 8 }}>Share & Earn</RNText>
                        </RNButton>
                    </Link>
                </View>
            </Layout>
        </>
    );
}

const styles = StyleSheet.create({
    pointCardContainer: {
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        gap: 18,
    },
    shareCardContainer: {
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        backgroundColor: COLORS.backgroundSecondary,
    },
});
