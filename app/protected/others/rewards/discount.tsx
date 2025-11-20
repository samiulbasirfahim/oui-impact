import { RedeemptionHistory } from "@/components/common/redeemption-history";
import { RNButton } from "@/components/ui/button";
import { DiscountConfirmationModal } from "@/components/ui/discount-confirmation-modal";
import { Layout } from "@/components/ui/layout";
import { Stack } from "expo-router";
import { useState } from "react";

export default function DiscountScreen() {
    const [shoeModal, setShowModal] = useState(false);

    const onCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: "Discounts" }} />
            <Layout>
                <DiscountConfirmationModal
                    open={shoeModal}
                    onConfirm={onCloseModal}
                    onCancel={onCloseModal}
                    points={200}
                />
                <RNButton
                    onPress={() => {
                        setShowModal(true);
                    }}
                >
                    Show Discounts
                </RNButton>

                <RedeemptionHistory />
            </Layout>
        </>
    );
}
