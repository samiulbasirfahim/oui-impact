import { Pressable, View } from "react-native";
import { Portal } from "react-native-portalize";
import { RNText } from "./text";
import { RNButton } from "./button";

type Props = {
    onCancel: () => void;
    onConfirm: () => void;
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
};

export function ConfirmationModal({
    open,
    onCancel,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
}: Props) {
    if (!open) {
        return null;
    }

    return (
        <Portal>
            <Pressable
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                }}
                onPress={onConfirm}
            >
                <Pressable
                    style={{
                        width: 300,
                        padding: 20,
                        backgroundColor: "white",
                        borderRadius: 10,
                        gap: 16,
                    }}
                >
                    <RNText size="lg" variant="title">
                        {title}
                    </RNText>
                    <RNText
                        style={{
                            fontWeight: "300",
                        }}
                    >
                        {description}
                    </RNText>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <RNButton variant="outline" onPress={onCancel}>
                            {cancelText}
                        </RNButton>
                        <RNButton onPress={onConfirm}>{confirmText}</RNButton>
                    </View>
                </Pressable>
            </Pressable>
        </Portal>
    );
}
