import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FlashList } from "@shopify/flash-list";
import {
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { RNText } from "../ui/text";
import { Image } from "expo-image";
import { COLORS } from "@/constants";
import { useState } from "react";
import { GiftCardConfirmationModal } from "../ui/giftcard-confirmation-modal";
import Carousel from "react-native-reanimated-carousel";

export type GiftCardItem = {
    image: ImageSourcePropType;
    title: string;
    subTitle: string;
    points: number;
    isPremium: boolean;
};

const dummyDatas: GiftCardItem[] = [
    {
        image: require("@/assets/images/gift-card.png"),
        title: "Amazon Gift Card",
        subTitle: "Use this gift card on Amazon purchases",
        points: 5000,
        isPremium: false,
    },
    {
        image: require("@/assets/images/gift-card.png"),
        title: "iTunes Gift Card",
        subTitle: "Use this gift card on iTunes purchases",
        points: 7000,
        isPremium: true,
    },
    {
        image: require("@/assets/images/gift-card.png"),
        title: "Google Play Gift Card",
        subTitle: "Use this gift card on Google Play purchases",
        points: 6000,
        isPremium: false,
    },
];

export function DonateCards() {
    const { width } = useWindowDimensions();

    const [selectedGiftCard, setSelectedGiftCard] = useState<GiftCardItem | null>(
        null,
    );

    const renderItem = ({
        item,
        index,
    }: {
        item: GiftCardItem;
        index: number;
    }) => {
        const itemWidth = width * 0.6;
        return (
            <Pressable
                onPress={() => {
                    setSelectedGiftCard(item);
                }}
                style={[styles.giftCard, { width: itemWidth }]}
            >
                <Image
                    source={item.image}
                    style={[styles.giftCardImage, { width: itemWidth - 2, height: 150 }]}
                />
                <View style={styles.coinBadge}>
                    <FontAwesome6 name="coins" size={15} color={COLORS.orange} />
                    <RNText size="sm" style={{ color: COLORS.text }} variant="title">
                        {item.points}
                    </RNText>
                </View>
                <View style={styles.giftCardBottom}>
                    <RNText size="lg">{item.title}</RNText>
                    <RNText
                        size="sm"
                        numberOfLines={1}
                        style={{
                            color: COLORS.secondaryText,
                        }}
                    >
                        {item.subTitle}
                    </RNText>
                </View>
            </Pressable>
        );
    };

    return (
        <>
            <GiftCardConfirmationModal
                points={selectedGiftCard?.points}
                title={selectedGiftCard?.title}
                open={selectedGiftCard !== null}
                onCancel={() => setSelectedGiftCard(null)}
                onConfirm={() => setSelectedGiftCard(null)}
            />
            <Carousel
                data={dummyDatas}
                renderItem={renderItem}
                width={width}
                height={250}
                loop={false}
            />
        </>
    );
}

const styles = StyleSheet.create({
    giftCardContainer: {},

    giftCard: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        borderWidth: 1,
        borderRadius: 8,
        overflow: "hidden",
        borderColor: COLORS.muted + "33",
    },

    giftCardImage: {
        resizeMode: "cover",
    },
    giftCardBottom: {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 8,
    },
    coinBadge: {
        flexDirection: "row",
        position: "absolute",
        top: 4,
        right: 4,
        backgroundColor: COLORS.background,
        borderRadius: 8,
        padding: 8,
        paddingVertical: 4,
        gap: 4,
    },
});
