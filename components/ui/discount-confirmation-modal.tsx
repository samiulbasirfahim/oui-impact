import { useTranslation } from "react-i18next";
import { ConfirmationModal } from "./confirmation-modal";

type Props = {
    onCancel: () => void;
    onConfirm: () => void;
    open: boolean;
    points?: number;
};

export function DiscountConfirmationModal({
    onCancel,
    onConfirm,
    open,
    points,
}: Props) {
    const { t } = useTranslation();
    return (
        <ConfirmationModal
            onConfirm={onConfirm}
            onCancel={onCancel}
            open={open}
            title={t("rewards.offers.confirmTitle")}
            description={t("rewards.offers.confirmDescription", {
                points,
                discount: 200 / 10,
            })}
        />
    );
}
