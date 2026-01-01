import { RNButton } from "@/components/ui/button";
import { GradientBG } from "@/components/ui/gradient-bg";
import { GradientButton } from "@/components/ui/gradient-button";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { ClaimButton, WatchButton } from "@/components/ui/watch-earn-buttons";
import { COLORS } from "@/constants";
import { useVideoAd } from "@/hooks/video-ad";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function Screen() {
    const { t } = useTranslation();
    const { showAd, isLoaded } = useVideoAd();

    const rewardUser = (
        points: number,
        title: string = "",
        description: string = "",
    ) => {
        console.log(`User rewarded with ${points} points for ${title}`);
        console.log(description);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: t("rewards.watch.title"),
                }}
            />
            <Layout>
                <GradientBG style={styles.cardContainer}>
                    <View style={styles.topSection}>
                        <RNButton
                            style={{
                                backgroundColor: COLORS.background + 33,
                                borderRadius: 20,
                            }}
                            size="sm"
                        >
                            {t("rewards.watch.featured")}
                        </RNButton>
                        <RNButton
                            size="sm"
                            style={{
                                backgroundColor: COLORS.orange,
                                borderRadius: 20,
                            }}
                        >
                            +50 PTS
                        </RNButton>
                    </View>

                    <RNText
                        style={{
                            marginTop: 16,
                            color: COLORS.background,
                        }}
                        size="xl"
                        variant="title"
                    >
                        {t("rewards.watch.premiumTitle")}
                    </RNText>
                    <RNText
                        style={{
                            marginTop: 8,
                            color: COLORS.backgroundSecondary,
                        }}
                    >
                        {t("rewards.watch.premiumSubtitle")}
                    </RNText>

                    <RNButton
                        nowrap
                        variant="outline"
                        onPress={() => {
                            showAd("random", () => {
                                rewardUser(
                                    50,
                                    t("rewards.watch.premiumTitle"),
                                    t("rewards.watch.premiumSubtitle"),
                                );
                            });
                        }}
                        disabled={!isLoaded.random}
                        style={{
                            marginTop: 20,
                            backgroundColor: COLORS.background,
                            flexDirection: "row",
                            gap: 6,
                            borderColor: COLORS.primary + "44",
                            borderWidth: 1,
                            paddingVertical: 16,
                        }}
                    >
                        <FontAwesome5 name="play" size={20} color={COLORS.primary} />
                        <RNText
                            style={{
                                color: COLORS.primary,
                                fontSize: 20,
                                fontWeight: "500",
                            }}
                        >
                            {t("rewards.watch.title")}
                        </RNText>
                    </RNButton>
                </GradientBG>

                <WatchButton
                    points={20}
                    isAvailable={isLoaded.technology}
                    onPress={() => {
                        showAd("technology", () => {
                            rewardUser(
                                20,
                                "Tech Product Review",
                                "Watched a review of the latest tech products.",
                            );
                        });
                    }}
                    duration={15}
                    category="Technology"
                    title="Tech Product Review"
                />

                <WatchButton
                    isAvailable={isLoaded.fashion}
                    onPress={() => {
                        showAd("fashion", () => {
                            rewardUser(
                                20,
                                "Fashion Trends 2024",
                                "Watched the latest fashion trends for 2024.",
                            );
                        });
                    }}
                    points={20}
                    duration={20}
                    category="Lifestyle"
                    title="Fashion Trends 2024"
                />

                <WatchButton
                    isAvailable={isLoaded.food}
                    onPress={() => {
                        showAd("food", () => {
                            rewardUser(
                                20,
                                "Cooking Tutorial",
                                "Watched a step-by-step cooking tutorial.",
                            );
                        });
                    }}
                    points={20}
                    duration={25}
                    category="Food"
                    title="Cooking Tutorial"
                />

                <RNText
                    variant="title"
                    size="xl"
                    style={{
                        marginTop: 24,
                    }}
                >
                    {t("rewards.watch.bonus")}
                </RNText>

                <ClaimButton
                    onPress={() => { }}
                    points={10}
                    title={t("rewards.watch.dailyCheckIn")}
                    description={t("rewards.watch.dailyTasks")}
                    icon={
                        <FontAwesome5
                            name="calendar-check"
                            size={24}
                            color={COLORS.primary}
                        />
                    }
                    buttonTitle={t("rewards.offers.confirm")}
                />

                <ClaimButton
                    onPress={() => { }}
                    points={50}
                    title={t("rewards.watch.shareWithFriends")}
                    description={t("rewards.watch.inviteFriends")}
                    icon={<FontAwesome5 name="share" size={24} color={COLORS.primary} />}
                    buttonTitle={t("rewards.offers.confirm")}
                />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 16,
                        borderRadius: 8,
                        marginTop: 8,
                        backgroundColor: COLORS.orange + "22",
                    }}
                >
                    <View
                        style={{
                            maxWidth: "70%",
                        }}
                    >
                        <RNText variant="title" size="lg">
                            {t("rewards.home.redeemNow")}
                        </RNText>
                        <RNText variant="secondary" size="md">
                            {t("rewards.offers.redeem")}
                        </RNText>
                    </View>

                    <RNButton
                        style={{
                            backgroundColor: COLORS.orange,
                        }}
                    >
                        {t("rewards.offers.redeem")}
                    </RNButton>
                </View>

                <GradientButton
                    title={t("impact.dashboard.premium")}
                    subtitle={t("rewards.home.upgrade")}
                    buttonText={t("rewards.home.upgrade")}
                    onPress={() => {
                        router.push("/protected/others/subscription");
                    }}
                />
            </Layout>
        </>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 20,
        borderRadius: 16,
    },
    topSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
