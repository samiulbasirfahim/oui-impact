import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurBG } from "@/components/ui/blur-bg";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Image, View } from "react-native";
import { RNButton } from "../ui/button";

type Props = {
    imageSource: any;
    title?: string;
    subtitle?: string;
    caption?: string;
    description?: string;
    tatalSteps?: number;
    currentStep?: number;
    skipAction?: () => void;
    nextAction?: () => void;
};

export function OnboardingScreen({
    imageSource,
    title,
    description,
    caption,
    subtitle,
    currentStep,
    tatalSteps,
    skipAction,
    nextAction,
}: Props) {
    return (
        <BlurBG centered>
            <View
                style={{
                    flex: 1,
                    justifyContent: "space-between",
                    paddingVertical: 40,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "50%",
                    }}
                >
                    <Image
                        source={imageSource}
                        style={{
                            width: 200,
                            height: 200,
                            marginBottom: 20,
                            borderRadius: 12,
                        }}
                    />
                </View>
                <View style={{ alignItems: "flex-start", gap: 12, flex: 1 }}>
                    {title && (
                        <RNText size="2xl" variant="title">
                            {title}
                        </RNText>
                    )}

                    {subtitle && (
                        <RNText size="xl" variant="title" style={{ textAlign: "center" }}>
                            {subtitle}
                        </RNText>
                    )}

                    <View>
                        {description && (
                            <RNText
                                size="md"
                                variant="secondary"
                                style={{ textAlign: "left" }}
                            >
                                {description}
                            </RNText>
                        )}

                        {caption && (
                            <RNText
                                size="md"
                                variant="secondary"
                                style={{ textAlign: "left" }}
                            >
                                {caption}
                            </RNText>
                        )}
                    </View>
                </View>

                <View
                    style={{
                        gap: 12,
                        marginTop: 20,
                    }}
                >
                    {tatalSteps && currentStep && (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                gap: 6,
                            }}
                        >
                            {Array.from({ length: tatalSteps }).map((_, index) => (
                                <View
                                    key={index}
                                    style={{
                                        width: index + 1 === currentStep ? 24 : 8,
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor:
                                            index + 1 === currentStep
                                                ? COLORS.primary
                                                : COLORS.secondaryText,
                                    }}
                                />
                            ))}
                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: "row",
                            gap: 12,
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        {skipAction && (
                            <RNButton
                                style={{
                                    paddingHorizontal: 8,
                                }}
                                size="lg"
                                variant="ghost"
                                onPress={skipAction}
                            >
                                Skip
                            </RNButton>
                        )}
                        {nextAction && (
                            <RNButton
                                style={{
                                    width: 64,
                                    elevation: 4,
                                    shadowOpacity: 0.3,
                                    shadowColor: COLORS.primary,
                                    borderRadius: 20,
                                    aspectRatio: 1,
                                    padding: 0,
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                }}
                                onPress={nextAction}
                                nowrap
                            >
                                <AntDesign
                                    name="arrow-right"
                                    size={32}
                                    color={COLORS.background}
                                />
                            </RNButton>
                        )}
                    </View>

                    <RNText
                        style={{
                            textAlign: "center",
                        }}
                        variant="secondary"
                    >
                        By contininuing you agree to
                    </RNText>
                </View>
            </View>
        </BlurBG>
    );
}
