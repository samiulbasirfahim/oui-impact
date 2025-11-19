import { Pressable } from "react-native";
import { Portal } from "react-native-portalize";

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

export function RNModal({ children, isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <Portal>
            <Pressable
                onPress={onClose}
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Pressable
                    onPress={(e) => e.stopPropagation()}
                    style={{
                        width: "80%",
                        backgroundColor: "white",
                        borderRadius: 8,
                        padding: 16,
                    }}
                >
                    {children}
                </Pressable>
            </Pressable>
        </Portal>
    );
}
