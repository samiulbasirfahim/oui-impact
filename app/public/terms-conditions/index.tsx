import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function HelpSupport() {
    const { t } = useTranslation();
    const data = [
        {
            question: "Acceptance of Terms",
            answer:
                "By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.",
        },
        {
            question: "Modification of Terms",
            answer:
                "We reserve the right to modify these terms at any time. You should check these terms periodically for changes.",
        },
        {
            question: "User Responsibilities",
            answer:
                "You agree to use the services only for lawful purposes and in a way that does not infringe the rights of others.",
        },
        {
            question: "Limitation of Liability",
            answer:
                "In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages arising out of your use of our services.",
        },
        {
            question: "Governing Law",
            answer:
                "These terms shall be governed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.",
        },
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: t("terms.title"),
                    headerRight: () => null,
                }}
            />
            <Layout noPadding>
                <View style={styles.labelContainer}>
                    <RNText
                        variant="title"
                        size="3xl"
                        style={{
                            color: COLORS.text + "DD",
                        }}
                    >
                        {t("terms.heading")}
                    </RNText>
                    <RNText
                        style={{
                            marginTop: 8,
                            color: COLORS.text + "AA",
                        }}
                    >
                        {t("terms.lastUpdated", { date: "June 2025" })}
                    </RNText>
                </View>

                {data.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            borderBottomColor: COLORS.muted + "33",
                            borderBottomWidth: index === data.length - 1 ? 0 : 1,
                            padding: 16,
                        }}
                    >
                        <RNText
                            variant="title"
                            size="lg"
                            style={{
                                color: COLORS.text + "DD",
                            }}
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
});
