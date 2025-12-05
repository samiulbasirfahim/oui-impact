import { useTranslation } from "react-i18next";
import { ConfirmationModal } from "./confirmation-modal";

type Props = {
    onCancel: () => void;
    onConfirm: () => void;
    open: boolean;
    points?: number;
    title?: string;
};

export function GiftCardConfirmationModal({
    onCancel,
    onConfirm,
    open,
    points,
    title,
}: Props) {
    const { t } = useTranslation();
    return (
        <ConfirmationModal
            onConfirm={onConfirm}
            onCancel={onCancel}
            open={open}
            title={t("rewards.offers.confirmTitle")}
            description={t("rewards.offers.confirmGiftCardDescription", {
                points,
                title,
            })}
        />
    );
}
