import { View } from "react-native";
import { RNButton } from "../ui/button";
import { RNModal } from "../ui/modal";
import { RNText } from "../ui/text";
import { useAuthStore } from "@/store/auth";

type Props = {
    onClose: () => void;
    isOpen: boolean;
};

export function LogOutModal({ onClose, isOpen }: Props) {
    const { logOut } = useAuthStore();

    const onConfirm = () => {
        logOut();

        onClose();
    };

    return (
        <RNModal onClose={onClose} isOpen={isOpen}>
            <RNText
                variant="title"
                size="lg"
                style={{
                    textAlign: "center",
                    marginBottom: 12,
                }}
            >
                Log Out
            </RNText>
            <RNText>Are you sure you want to log out of your account?</RNText>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 24,
                    gap: 12,
                }}
            >
                <RNButton
                    style={{
                        flex: 1,
                    }}
                    variant="outline"
                    onPress={onClose}
                >
                    Cancel
                </RNButton>
                <RNButton
                    style={{
                        flex: 1,
                    }}
                    onPress={onConfirm}
                >
                    Confirm
                </RNButton>
            </View>
        </RNModal>
    );
}
