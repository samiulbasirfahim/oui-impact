import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { RNText } from "../ui/text";
import { COLORS } from "@/constants";
import { useState } from "react";
import { GiftCardConfirmationModal } from "../ui/giftcard-confirmation-modal";
import Carousel from "react-native-reanimated-carousel";
import { useTranslation } from "react-i18next";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

export type CharityCardItem = {
    icon: keyof typeof FontAwesome6.glyphMap;
    titleKey: string;
    subTitleKey: string;
    points: number;
    color: string;
    conversion: {
        amount: number;
        unit: string;
    };
};

const charityCards: CharityCardItem[] = [
    {
        icon: "tree",
        titleKey: "donate.oneTree.title",
        subTitleKey: "donate.oneTree.subtitle",
        points: 500,
        color: "#21C463",
        conversion: { amount: 5, unit: "trees" },
    },
    {
        icon: "readme",
        titleKey: "donate.roomToRead.title",
        subTitleKey: "donate.roomToRead.subtitle",
        points: 600,
        color: "#2F7BFF",
        conversion: { amount: 3, unit: "books" },
    },
    {
        icon: "baby",
        titleKey: "donate.baby2Baby.title",
        subTitleKey: "donate.baby2Baby.subtitle",
        points: 400,
        color: "#FF4F8B",
        conversion: { amount: 1, unit: "care kit" },
    },
    {
        icon: "hand-holding-heart",
        titleKey: "donate.feedingAmerica.title",
        subTitleKey: "donate.feedingAmerica.subtitle",
        points: 300,
        color: "#A34CFF",
        conversion: { amount: 10, unit: "meals" },
    },
];

function getConversionLabel(item: CharityCardItem) {
    return `${item.points} points = ${item.conversion.amount} ${item.conversion.unit}`;
}

export function DonateCards() {
    const { t } = useTranslation();
    const { width } = useWindowDimensions();
    const [selectedCard, setSelectedCard] = useState<CharityCardItem | null>(
        null,
    );

    const progress = useSharedValue(0);
    const CARD_WIDTH = width * 0.78;

    const renderItem = ({ item }: { item: CharityCardItem; index: number }) => {
        return (
            <Pressable
                onPress={() => setSelectedCard(item)}
                style={[
                    styles.card,
                    { width: CARD_WIDTH, backgroundColor: item.color, height: 240 },
                ]}
            >
                <View>
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name={item.icon} size={28} color={item.color} />
                    </View>

                    <View style={styles.textContainer}>
                        <RNText size="lg" style={styles.title}>
                            {t(item.titleKey)}
                        </RNText>
                        <RNText size="sm" style={styles.subtitle}>
                            {t(item.subTitleKey)}
                        </RNText>
                    </View>
                </View>

                <View style={styles.bottomContainer}>
                    <RNText size="sm" style={styles.conversionLabel}>
                        {getConversionLabel(item)}
                    </RNText>

                    <Pressable
                        onPress={() => setSelectedCard(item)}
                        style={styles.redeemButton}
                    >
                        <RNText
                            size="sm"
                            style={{ color: COLORS.background }}
                            variant="title"
                        >
                            {t("rewards.home.redeem", "Redeem")}
                        </RNText>
                        <FontAwesome6
                            name="arrow-right"
                            size={16}
                            color={COLORS.background}
                        />
                    </Pressable>
                </View>
            </Pressable>
        );
    };

    return (
        <>
            <RNText
                size="xl"
                style={{ marginBottom: 8, marginTop: 16 }}
                variant="title"
            >
                {t("donateCards.title", "Donate Cards")}
            </RNText>

            <GiftCardConfirmationModal
                points={selectedCard?.points}
                title={selectedCard?.titleKey ? t(selectedCard.titleKey) : ""}
                open={selectedCard !== null}
                onCancel={() => setSelectedCard(null)}
                onConfirm={() => setSelectedCard(null)}
            />

            <Carousel
                width={width}
                height={240}
                data={charityCards}
                renderItem={renderItem}
                loop={false}
                pagingEnabled
                snapEnabled
                scrollAnimationDuration={500}
                mode="parallax"
                modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: 70 }}
                onConfigurePanGesture={(panGesture) =>
                    panGesture.activeOffsetX([-5, 5]).failOffsetY([-5, 5])
                }
                onProgressChange={(_, absoluteProgress) => {
                    progress.value = absoluteProgress;
                }}
            />

            <View style={styles.paginationContainer}>
                {charityCards.map((_, index) => (
                    <AnimatedDot key={index} index={index} progress={progress} />
                ))}
            </View>
        </>
    );
}

function AnimatedDot({
    index,
    progress,
}: {
    index: number;
    progress: Animated.SharedValue<number>;
}) {
    const animatedStyle = useAnimatedStyle(() => {
        const width = interpolate(
            progress.value,
            [index - 1, index, index + 1],
            [8, 24, 8],
            Extrapolation.CLAMP,
        );
        const opacity = interpolate(
            progress.value,
            [index - 1, index, index + 1],
            [0.3, 1, 0.3],
            Extrapolation.CLAMP,
        );
        return { width, opacity };
    });

    return (
        <Animated.View
            style={[
                {
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: COLORS.primary,
                    marginHorizontal: 4,
                },
                animatedStyle,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        justifyContent: "space-between",
    },
    iconContainer: {
        backgroundColor: "white",
        alignSelf: "flex-start",
        padding: 12,
        borderRadius: 36,
        marginBottom: 10,
    },
    textContainer: {
        marginBottom: 6,
    },
    title: {
        color: "white",
        fontWeight: "600",
        marginBottom: 2,
    },
    subtitle: {
        color: "white",
        opacity: 0.9,
        lineHeight: 18,
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    conversionLabel: {
        color: "white",
        marginTop: 6,
        opacity: 0.95,
    },
    redeemButton: {
        backgroundColor: COLORS.text,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 14,
        gap: 4,
    },
});
