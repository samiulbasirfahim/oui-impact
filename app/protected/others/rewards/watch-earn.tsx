import { RNButton } from "@/components/ui/button";
import { GradientBG } from "@/components/ui/gradient-bg";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { ClaimButton, WatchButton } from "@/components/ui/watch-earn-buttons";
import { COLORS } from "@/constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Screen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Watch & Earn",
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
                            Featured
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
                        Premium Brand Video
                    </RNText>
                    <RNText
                        style={{
                            marginTop: 8,
                            color: COLORS.backgroundSecondary,
                        }}
                    >
                        Watch this 30-second video and earn bonus points!
                    </RNText>

                    <RNButton
                        nowrap
                        variant="outline"
                        style={{
                            marginTop: 20,
                            backgroundColor: COLORS.background,
                            flexDirection: "row",
                            gap: 6,
                            borderColor: COLORS.primary,
                            borderWidth: 2,
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
                            Watch & Earn
                        </RNText>
                    </RNButton>
                </GradientBG>

                <WatchButton
                    onPress={() => { }}
                    points={20}
                    isAvailable={true}
                    duration={15}
                    category="Technology"
                    title="Tech Product Review"
                />

                <WatchButton
                    onPress={() => { }}
                    points={20}
                    isAvailable={false}
                    duration={20}
                    category="Lifestyle"
                    title="Fashion Trends 2024"
                />

                <WatchButton
                    onPress={() => { }}
                    points={20}
                    isAvailable={true}
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
                    Bonus Opportunities
                </RNText>

                <ClaimButton
                    onPress={() => { }}
                    points={10}
                    title="Daily Check-In Reward"
                    description="Complete daily tasks"
                    icon={
                        <FontAwesome5
                            name="calendar-check"
                            size={24}
                            color={COLORS.primary}
                        />
                    }
                    buttonTitle="Claim"
                />

                <ClaimButton
                    onPress={() => { }}
                    points={50}
                    title="Share with friends"
                    description="Invite friends to join"
                    icon={<FontAwesome5 name="share" size={24} color={COLORS.primary} />}
                    buttonTitle="Claim"
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
