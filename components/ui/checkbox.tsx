import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { RNText } from "./text";
import { COLORS } from "@/constants";

type Props = {
    label?: string;
    onChange?: (checked: boolean) => void;
    value?: boolean;
    disableExternalToggle?: boolean;
} & ViewProps;

export function RNCheckbox({
    value,
    onChange,
    label,
    style,
    disableExternalToggle,
}: Props) {
    const [isChecked, setIsChecked] = useState<boolean>(value || false);

    const toggleCheckbox = () => {
        if (disableExternalToggle) {
            return;
        }
        const newValue = !isChecked;
        setIsChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <View
            style={[{ flexDirection: "row", alignItems: "center", gap: 6 }, style]}
            onTouchEnd={toggleCheckbox}
        >
            <View
                style={{
                    width: 18,
                    height: 18,
                    borderWidth: 1,
                    borderColor: COLORS.muted,
                    borderRadius: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isChecked ? COLORS.primary : "transparent",
                }}
            >
                {isChecked && (
                    <Entypo name="check" size={14} color={COLORS.background} />
                )}
            </View>
            <RNText variant="secondary">{label}</RNText>
        </View>
    );
}
