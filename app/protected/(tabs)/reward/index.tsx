import BOOK from "@/assets/svgs/book.svg";
import TREE from "@/assets/svgs/tree.svg";
import { RNButton } from "@/components/ui/button";
import { GradientBG } from "@/components/ui/gradient-bg";
import { GradientButton } from "@/components/ui/gradient-button";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Link, router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Screen() {
    const { t } = useTranslation();
    return (
        <>
            <Stack.Screen
                options={{
                    title: t("rewards.home.redeem"),
                }}
            />
            <Layout>
                <GradientBG style={styles.pointCardContainer}>
                    <RNText
                        style={{
                            color: COLORS.background,
                        }}
                    >
                        {t("home.header.points")}
                    </RNText>
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
                                    fontWeight: "bold",
                                }}
                                size="4xl"
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
                                    {t("impact.dashboard.nextGoal")} {/* placeholder label */}
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
                                    {t("impact.dashboard.share")} {/* placeholder label */}
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
                            {t("home.header.points")}
                        </RNText>
                    </View>
                </GradientBG>

                <Link href="/protected/others/rewards/watch-earn" asChild>
                    <RNButton
                        nowrap
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 16,
                        }}
                    >
                        <FontAwesome5 name="play" size={20} color={COLORS.background} />
                        <RNText
                            style={{
                                marginLeft: 8,
                                color: COLORS.background,
                                paddingVertical: 6,
                            }}
                            variant="title"
                        >
                            {t("rewards.watch.title")}
                        </RNText>
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
                            {t("rewards.offers.redeem")}
                        </RNText>
                        <Link href="/protected/others/rewards/leaderboard" asChild>
                            <RNText
                                style={{
                                    color: COLORS.primary,
                                    textDecorationLine: "underline",
                                    fontWeight: "500",
                                }}
                                size="sm"
                            >
                                {t("rewards.offers.history")}
                            </RNText>
                        </Link>
                    </View>

                    <View style={styles.redeedmChildContainer}>
                        <Link href={"/protected/others/rewards/discount"} asChild>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.redeemChildItem}
                            >
                                <AntDesign
                                    name="percentage"
                                    size={28}
                                    color={COLORS.secondary}
                                    style={{
                                        backgroundColor: COLORS.secondary + "20",
                                        padding: 12,
                                        borderRadius: 50,
                                    }}
                                />
                                <RNText
                                    variant="title"
                                    style={{
                                        marginTop: 8,
                                        textAlign: "center",
                                    }}
                                    size="sm"
                                >
                                    {t("rewards.offers.discounts")}
                                </RNText>
                            </TouchableOpacity>
                        </Link>
                        <Link href={"/protected/others/rewards/offer"} asChild>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.redeemChildItem}
                            >
                                <FontAwesome5
                                    name="gift"
                                    size={28}
                                    color={COLORS.primary}
                                    style={{
                                        backgroundColor: COLORS.primary + "20",
                                        padding: 12,
                                        borderRadius: 50,
                                    }}
                                />
                                <RNText
                                    variant="title"
                                    style={{
                                        marginTop: 8,
                                        textAlign: "center",
                                    }}
                                    size="sm"
                                >
                                    {t("rewards.offers.offers")}
                                </RNText>
                            </TouchableOpacity>
                        </Link>
                        <Link href={"/protected/others/rewards/charity"} asChild>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.redeemChildItem}
                            >
                                <Fontisto
                                    name="heart"
                                    size={28}
                                    color={COLORS.accent}
                                    style={{
                                        backgroundColor: COLORS.accent + "20",
                                        padding: 12,
                                        borderRadius: 50,
                                    }}
                                />

                                <RNText
                                    variant="title"
                                    style={{
                                        marginTop: 8,
                                        textAlign: "center",
                                    }}
                                    size="sm"
                                >
                                    {t("impact.dashboard.share")}
                                </RNText>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>

                <View style={styles.shareCardContainer}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        <View
                            style={{
                                paddingVertical: 15,
                                paddingHorizontal: 10,
                                backgroundColor: COLORS.primary + "20",
                                borderRadius: 10,
                                alignSelf: "center",
                            }}
                        >
                            <FontAwesome name="share" size={24} color={COLORS.secondary} />
                        </View>

                        <View
                            style={{
                                marginLeft: 12,
                            }}
                        >
                            <RNText variant="title" size="lg">
                                {t("account.settings.help")}
                            </RNText>
                            <RNText variant="secondary" size="md">
                                {t("rewards.home.upgrade")}
                            </RNText>
                        </View>
                    </View>

                    <View>
                        <RNText
                            style={{
                                backgroundColor: COLORS.text + "10",
                                paddingVertical: 4,
                                paddingHorizontal: 8,
                                borderRadius: 30,
                                alignSelf: "flex-start",
                                marginBottom: 8,
                                fontWeight: "800",
                                color: COLORS.secondaryText,
                            }}
                            variant="title"
                            size="sm"
                        >
                            +30 PTS
                        </RNText>

                        <Link href="/protected/others/share-earn" asChild>
                            <RNButton
                                nowrap
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                }}
                                variant="secondary"
                            >
                                <RNText
                                    style={{
                                        color: COLORS.background,
                                        fontWeight: "500",
                                    }}
                                    size="sm"
                                    variant="title"
                                >
                                    {t("impact.dashboard.share")}
                                </RNText>
                            </RNButton>
                        </Link>
                    </View>
                </View>

                <GradientButton
                    title={t("impact.dashboard.premium")}
                    subtitle={t("rewards.home.upgrade")}
                    buttonText={t("rewards.home.upgrade")}
                    onPress={() => {
                        router.push("/protected/others/subscription");
                    }}
                />

                <GradientButton
                    title={t("account.settings.help")}
                    subtitle={t("rewards.home.upgrade")}
                    buttonText={t("rewards.home.upgrade")}
                    onPress={() => {
                        router.push("/protected/others/share-earn");
                    }}
                />
                <View style={{ height: 32 }} />
            </Layout>
        </>
    );
}

const styles = StyleSheet.create({
    pointCardContainer: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    shareCardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        backgroundColor: COLORS.primary + "10",
    },
    redeedmChildContainer: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },

    redeemChildItem: {
        width: "32%",
        borderRadius: 12,
        padding: 12,
        backgroundColor: COLORS.backgroundSecondary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: COLORS.muted + "20",
    },
});
