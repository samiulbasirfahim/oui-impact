import { COLORS } from "@/constants";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { OtpInput, OtpInputProps } from "react-native-otp-entry";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { RNText } from "./text";

type Props = {
    numberOfDigits: number;
    label?: string;
    gap?: number;
    onChange: (otp: string) => void;
    style?: ViewProps["style"];
} & OtpInputProps;

export const OTPFields = ({
    numberOfDigits = 4,
    onChange,
    style,
    gap = 8,
    label,
    ...props
}: Props) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);

    return (
        <View
            onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width);
            }}
            style={[
                {
                    width: "100%",
                    gap: 8,
                },
                style,
            ]}
        >
            <RNText size="lg">{label}</RNText>

            <OtpInput
                numberOfDigits={numberOfDigits}
                onTextChange={onChange}
                theme={{
                    containerStyle: {
                        justifyContent: "center",
                        gap: gap,
                        flexDirection: "row",
                    },
                    pinCodeContainerStyle: {
                        borderRadius: 8,
                        borderWidth: 1,
                        backgroundColor: COLORS.background,
                        borderColor: COLORS.secondaryText,
                        width:
                            (containerWidth - (numberOfDigits - 1) * gap) / numberOfDigits,
                        height: 40,
                    },
                    pinCodeTextStyle: {
                        color: COLORS.text,
                        fontSize: 18,
                    },
                    focusedPinCodeContainerStyle: {
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                    },
                    focusStickStyle: {
                        backgroundColor: COLORS.primary,
                        width: 2,
                    },
                }}
                {...props}
            />
        </View>
    );
};
