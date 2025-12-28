import { COLORS } from "@/constants";
import Entypo from "@expo/vector-icons/Entypo";
import { ReactNode } from "react";
import {
    ActivityIndicator,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from "react-native";
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
        borderColor: COLORS.secondaryText + "33",
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
    outline: COLORS.text,
    ghost: COLORS.primary,
} as const;

type Props = TouchableOpacityProps & {
    size?: keyof typeof sizes;
    variant?: keyof typeof variants;
    children: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    nowrap?: boolean;
};

export function RNButton({
    size = "md",
    variant = "default",
    children,
    loading = false,
    disabled = false,
    nowrap = false,
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
                    borderRadius: 12,
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
                    size={size === "sm" ? "small" : "small"}
                />
            ) : nowrap ? (
                <>{children}</>
            ) : (
                <RNText
                    size={textSizes[size]}
                    variant="base"
                    style={{ color: textColors[variant], fontWeight: "500" }}
                >
                    {children}
                </RNText>
            )}
        </TouchableOpacity>
    );
}

type RNSettingButtonProps = TouchableOpacityProps & {
    title: string;
    description?: string;
    icon?: ReactNode;
};

export function RNSettingButton({
    title,
    description,
    icon,
    ...props
}: RNSettingButtonProps) {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
            }}
            onPress={() => {
                console.log("Pressed");
            }}
            activeOpacity={0.7}
            {...props}
        >
            {icon && (
                <View
                    style={{
                        padding: 10,
                        backgroundColor: COLORS.backgroundSecondary,
                        borderRadius: "50%",
                        marginRight: 12,
                    }}
                >
                    {icon}
                </View>
            )}
            <View style={{ flex: 1 }}>
                <RNText size="md" variant="title">
                    {title}
                </RNText>
                {description && (
                    <RNText
                        size="sm"
                        variant="base"
                        style={{ marginTop: 4, color: COLORS.muted }}
                    >
                        {description}
                    </RNText>
                )}
            </View>
            <Entypo name="chevron-thin-right" size={24} color={COLORS.muted} />
        </TouchableOpacity>
    );
}
