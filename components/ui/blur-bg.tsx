import { COLORS } from "@/constants";
import { ImageBackground, ImageBackgroundProps } from "react-native";

export function BlurBG({
    style,
    centered,
    ...props
}: ImageBackgroundProps & {
    centered?: boolean;
}) {
    return (
        <ImageBackground
            style={[
                {
                    flex: 1,
                    backgroundColor: COLORS.background,
                    justifyContent: centered ? "center" : "flex-start",
                    alignItems: centered ? "center" : "stretch",
                    padding: 16,
                },
                style,
            ]}
            {...props}
            source={require("@/assets/images/background.png")}
        ></ImageBackground>
    );
}
