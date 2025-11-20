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
    return (
        <ConfirmationModal
            onConfirm={onConfirm}
            onCancel={onCancel}
            open={open}
            title="Confirm Redeemption"
            description={`You are about to redeem ${points} points for ${200 / 10}% off Partner App`}
        />
    );
}
