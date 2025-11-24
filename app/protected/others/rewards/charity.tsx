import { RedeemptionHistory } from "@/components/common/redeemption-history";
import { RNButton } from "@/components/ui/button";
import { DiscountConfirmationModal } from "@/components/ui/discount-confirmation-modal";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

const redeemOptions = [
    {
        id: 1,
        title: "Donate to Local Charity",
        cost: 200,
    },
    {
        id: 2,
        title: "Support Education Fund",
        cost: 150,
    },
    {
        id: 3,
        title: "Contribute to Health Initiatives",
        cost: 300,
    },
    {
        id: 4,
        title: "Aid Environmental Projects",
        cost: 250,
    },
];

export default function CharityScreen() {
    const [showModal, setShowModal] = useState(false);

    const onCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: "Charity" }} />
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
                    Redeem Your Points
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
                                    Redeem
                                </RNButton>
                            </View>
                        </View>
                    ))}
                </View>

                <RedeemptionHistory />
            </Layout>
        </>
    );
}
