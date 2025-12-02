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
        title: "Special Offer(220) ",
        cost: 200,
    },
    {
        id: 2,
        title: "Holiday Discount(180)",
        cost: 150,
    },
    {
        id: 3,
        title: "Limited Time Deal(300)",
        cost: 300,
    },
    {
        id: 4,
        title: "Exclusive Coupon(250)",
        cost: 250,
    },
    {
        id: 5,
        title: "Member's Special(180)",
        cost: 180,
    },
];

export default function OfferScreen() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);

    const onCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: t("rewards.offers.offers") }} />
            <DiscountConfirmationModal
                open={showModal}
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
                                    {t("rewards.offers.costPoints", { count: 200 })}
                                </RNText>
                            </View>

                            <View style={{ alignItems: "flex-end", width: "30%" }}>
                                <RNButton
                                    size="sm"
                                    onPress={() => {
                                        setShowModal(true);
                                    }}
                                >
                                    {t("rewards.offers.redeemAction")}
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
