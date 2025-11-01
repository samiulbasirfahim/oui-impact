import { ReactNode } from "react";
import {
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator,
    ViewStyle,
} from "react-native";
import { COLORS } from "@/constants";
import { RNText } from "./text";

const sizes = {
    sm: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        minHeight: 32,
    },
    md: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        minHeight: 40,
    },
    lg: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        minHeight: 48,
    },
} as const;

const variants = {
    default: {
        backgroundColor: COLORS.primary,
        borderWidth: 0,
    },
    secondary: {
        backgroundColor: COLORS.secondary,
        borderWidth: 0,
    },
    accent: {
        backgroundColor: COLORS.accent,
        borderWidth: 0,
    },
    outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    ghost: {
        backgroundColor: "transparent",
        borderWidth: 0,
    },
} as const;

const textSizes = {
    sm: "sm",
    md: "md",
    lg: "lg",
} as const;

const textColors = {
    default: "#ffffff",
    secondary: "#ffffff",
    accent: "#ffffff",
    outline: COLORS.primary,
    ghost: COLORS.primary,
} as const;

type Props = TouchableOpacityProps & {
    size?: keyof typeof sizes;
    variant?: keyof typeof variants;
    children: ReactNode;
    loading?: boolean;
    disabled?: boolean;
};

export function RNButton({
    size = "md",
    variant = "default",
    children,
    loading = false,
    disabled = false,
    style,
    ...props
}: Props) {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.7}
            style={[
                {
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: isDisabled ? 0.5 : 1,
                },
                sizes[size],
                variants[variant],
                style as ViewStyle,
            ]}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={textColors[variant]}
                    size={size === "sm" ? "small" : "large"}
                />
            ) : (
                <RNText
                    size={textSizes[size]}
                    variant="base"
                    style={{ color: textColors[variant] }}
                >
                    {children}
                </RNText>
            )}
        </TouchableOpacity>
    );
}
