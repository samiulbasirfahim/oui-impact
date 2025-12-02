import { RedeemptionHistory } from "@/components/common/redeemption-history";
import { RNButton } from "@/components/ui/button";
import { DiscountConfirmationModal } from "@/components/ui/discount-confirmation-modal";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const redeemOptions = [
    {
        id: 1,
        title: "20% off Partner App",
        cost: 200,
    },
    {
        id: 2,
        title: "Free Shipping Voucher",
        cost: 150,
    },
    {
        id: 3,
        title: "$10 Gift Card",
        cost: 300,
    },
    {
        id: 4,
        title: "Buy 1 Get 1 Free Coupon",
        cost: 250,
    },
    {
        id: 5,
        title: "15% off Next Purchase",
        cost: 180,
    },
    {
        id: 6,
        title: "Exclusive Access to New Products",
        cost: 400,
    },
    {
        id: 7,
        title: "25% off on Electronics",
        cost: 350,
    },
    {
        id: 8,
        title: "30% off on Apparel",
        cost: 320,
    },
    {
        id: 9,
        title: "50% off on Home Goods",
        cost: 500,
    },
    {
        id: 10,
        title: "Free Membership Upgrade",
        cost: 600,
    },
];

export default function DiscountScreen() {
    const { t } = useTranslation();
    const [shoeModal, setShowModal] = useState(false);

    const onCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: t("rewards.offers.discounts") }} />
            <DiscountConfirmationModal
                open={shoeModal}
                onConfirm={onCloseModal}
                onCancel={onCloseModal}
                points={200}
            />

            <Layout>
                <RNText
                    variant="subtitle"
                    size="lg"
                    style={{
                        width: "100%",
                        marginTop: 10,
                        backgroundColor: COLORS.background,
                    }}
                >
                    {t("rewards.offers.redeem")}
                </RNText>

                <View
                    style={{
                        flexDirection: "column",
                        gap: 12,
                    }}
                >
                    {redeemOptions.map((option) => (
                        <View
                            key={option.id}
                            style={{
                                padding: 12,
                                paddingVertical: 16,
                                borderRadius: 8,
                                backgroundColor: COLORS.background,
                                borderWidth: 1,
                                borderColor: COLORS.muted + "33",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{ width: "70%" }}>
                                <RNText
                                    variant="title"
                                    size="lg"
                                    style={{
                                        color: COLORS.text + "DD",
                                    }}
                                >
                                    20% off Partner App
                                </RNText>
                                <RNText variant="base" style={{ color: COLORS.secondaryText }}>
                                    Cost 200 points
                                </RNText>
                            </View>

                            <View style={{ alignItems: "flex-end", width: "30%" }}>
                                <RNButton
                                    size="sm"
                                    onPress={() => {
                                        setShowModal(true);
                                    }}
                                >
                                    {t("rewards.offers.redeem")}
                                </RNButton>
                            </View>
                        </View>
                    ))}
                </View>

                <RedeemptionHistory />

                {
                    //     <RNButton
                    //     onPress={() => {
                    //         setShowModal(true);
                    //     }}
                    // >
                    //     Show Discounts
                    // </RNButton>
                    //
                }
            </Layout>
        </>
    );
}
