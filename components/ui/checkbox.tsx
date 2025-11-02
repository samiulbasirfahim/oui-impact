import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { RNText, RNTextProps } from "./text";
import { COLORS } from "@/constants";

type Props = {
    label?: string;
    onChange?: (checked: boolean) => void;
    value?: boolean;
    disableExternalToggle?: boolean;
    size?: RNTextProps["size"];
} & ViewProps;

export function RNCheckbox({
    value,
    onChange,
    label,
    style,
    size = "md",
    disableExternalToggle,
}: Props) {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        if (typeof value === "boolean") {
            setIsChecked(value);
        }
    }, [value]);
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

    const checkBoxSize = size === "sm" ? 14 : size === "lg" ? 22 : 18;

    return (
        <View
            style={[{ flexDirection: "row", alignItems: "center", gap: 6 }, style]}
            onTouchEnd={toggleCheckbox}
        >
            <View
                style={{
                    width: checkBoxSize,
                    height: checkBoxSize,
                    borderWidth: 1,
                    borderColor: COLORS.muted,
                    borderRadius: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isChecked ? COLORS.primary : "transparent",
                }}
            >
                {isChecked && (
                    <Entypo
                        name="check"
                        size={checkBoxSize - 4}
                        color={COLORS.background}
                    />
                )}
            </View>
            <RNText variant="secondary" size={size}>
                {label}
            </RNText>
        </View>
    );
}
