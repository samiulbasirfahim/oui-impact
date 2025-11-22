import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function HelpSupport() {
    const data = [
        {
            question: "How to reset my password?",
            answer:
                "To reset your password, go to the login screen and click on 'Forgot Password'. Follow the instructions sent to your registered email address.",
        },
        {
            question: "How to contact customer support?",
            answer: "You can contact our customer support by emailing",
        },
        {
            question: "Where can I find the privacy policy?",
            answer:
                "Our privacy policy can be found at the bottom of our website or within the app under 'Settings' > 'Privacy Policy'.",
        },
        {
            question: "How to update my account information?",
            answer:
                "To update your account information, navigate to 'Account Settings' in the app and make the necessary changes.",
        },
        {
            question: "What should I do if I encounter a bug?",
            answer:
                "If you encounter a bug, please report it to our support team with detailed information about the issue and steps to reproduce it.",
        },
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Help & Support",
                }}
            />
            <Layout noPadding>
                <View style={styles.labelContainer}>
                    <RNText
                        variant="title"
                        size="4xl"
                        style={{
                            color: COLORS.text + "DD",
                        }}
                    >
                        Helps & Supports
                    </RNText>
                    <RNText
                        style={{
                            marginTop: 8,
                            color: COLORS.text + "AA",
                        }}
                    >
                        Last updated: June 2024
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
                            size="xl"
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
