import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { useTermsNConditions } from "@/queries/useTermsNCondition";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function HelpSupport() {
    const { t } = useTranslation();
    const { data, isLoading } = useTermsNConditions();

    const terms = data?.data ?? [];
    const lastUpdated = data?.lastUpdated;

    return (
        <>
            <Stack.Screen
                options={{
                    title: t("terms.title"),
                    headerRight: () => null,
                }}
            />

            <Layout noPadding>
                {/* Header */}
                <View style={styles.labelContainer}>
                    <RNText
                        variant="title"
                        size="3xl"
                        style={{ color: COLORS.text + "DD" }}
                    >
                        {t("terms.heading")}
                    </RNText>

                    {lastUpdated && (
                        <RNText
                            style={{
                                marginTop: 8,
                                color: COLORS.text + "AA",
                            }}
                        >
                            {t("terms.lastUpdated", { date: lastUpdated })}
                        </RNText>
                    )}
                </View>

                {/* Loading */}
                {isLoading && (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                )}

                {/* Content */}
                {!isLoading &&
                    terms.map((item, index) => (
                        <View
                            key={item.id}
                            style={{
                                borderBottomColor: COLORS.muted + "33",
                                borderBottomWidth: index === terms.length - 1 ? 0 : 1,
                                padding: 16,
                            }}
                        >
                            <RNText
                                variant="title"
                                size="lg"
                                style={{ color: COLORS.text + "DD" }}
                            >
                                {index + 1}. {item.question}
                            </RNText>

                            <RNText
                                style={{
                                    marginTop: 8,
                                    color: COLORS.text + "AA",
                                    lineHeight: 20,
                                }}
                            >
                                {item.answer}
                            </RNText>
                        </View>
                    ))}

                {/* Empty state */}
                {!isLoading && terms.length === 0 && (
                    <RNText
                        style={{
                            padding: 16,
                            color: COLORS.text + "AA",
                        }}
                    >
                        No terms available.
                    </RNText>
                )}
            </Layout>
        </>
    );
}

const styles = StyleSheet.create({
    labelContainer: {
        borderBottomColor: COLORS.muted + "33",
        borderBottomWidth: 1,
        padding: 16,
        paddingVertical: 24,
    },
    loader: {
        paddingVertical: 40,
        alignItems: "center",
        justifyContent: "center",
    },
});
