import { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import { COLORS } from "@/constants";

const sizes = {
    sm: { fontSize: 14, lineHeight: 18 },
    md: { fontSize: 16, lineHeight: 22 },
    lg: { fontSize: 18, lineHeight: 26 },
    xl: { fontSize: 22, lineHeight: 28 },
    "2xl": { fontSize: 24, lineHeight: 32 },
};

const variants = {
    base: { color: COLORS.text },
    title: { fontWeight: "bold", color: COLORS.text },
    subtitle: { fontStyle: "italic", color: COLORS.secondary },
    primary: { fontWeight: "bold", color: COLORS.primary },
    accent: { fontWeight: "light", color: COLORS.accent },
    secondary: { color: COLORS.secondaryText },
};

type Props = TextProps & {
    size?: keyof typeof sizes;
    variant?: keyof typeof variants;
    children: ReactNode;
};

export function RNText({
    size = "md",
    variant = "base",
    children,
    style,
    ...props
}: Props) {
    return (
        <Text style={[sizes[size], variants[variant], style]} {...props}>
            {children}
        </Text>
    );
}
