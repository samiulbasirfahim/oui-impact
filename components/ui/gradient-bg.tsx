import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

type Props = {
    children: React.ReactNode;
    colors?: string[];
} & Partial<LinearGradientProps>;

export function GradientBG({
    children,
    style,
    colors = ["#A5D3B4", "#5A92B1"],
}: Props) {
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[, style]}
        >
            {children}
        </LinearGradient>
    );
}
