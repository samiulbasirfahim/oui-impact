import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { pickLocalizedText } from "@/lib/utils";
import { useHelpsNSupports } from "@/queries/useHelpsNSupports";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function HelpSupport() {
    const { t, i18n } = useTranslation();
    const { data, isLoading } = useHelpsNSupports();

    const helpItems = data?.data ?? [];
    const lastUpdated = data?.lastUpdated;

    return (
        <>
            <Stack.Screen
                options={{
                    title: t("account.helpSupport.title"),
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
                        {t("account.helpSupport.heading")}
                    </RNText>

                    {lastUpdated && (
                        <RNText
                            style={{
                                marginTop: 8,
                                color: COLORS.text + "AA",
                            }}
                        >
                            {t("account.helpSupport.lastUpdated", {
                                date: lastUpdated,
                            })}
                        </RNText>
                    )}
                </View>

                {isLoading && (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                )}

                {!isLoading &&
                    helpItems.map((item, index) => {
                        const { question, answer } = pickLocalizedText(item, i18n.language);

                        return (
                            <View
                                key={item.id}
                                style={{
                                    borderBottomColor: COLORS.muted + "33",
                                    borderBottomWidth: index === helpItems.length - 1 ? 0 : 1,
                                    padding: 16,
                                }}
                            >
                                <RNText variant="title" size="lg">
                                    {index + 1}. {question}
                                </RNText>

                                <RNText style={{ marginTop: 8, lineHeight: 20 }}>
                                    {answer}
                                </RNText>
                            </View>
                        );
                    })}

                {/* Empty state */}
                {!isLoading && helpItems.length === 0 && (
                    <RNText
                        style={{
                            padding: 16,
                            color: COLORS.text + "AA",
                        }}
                    >
                        No help articles available.
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
