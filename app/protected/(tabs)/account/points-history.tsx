import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { Stack } from "expo-router";

export default function Screen() {
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Point History" }} />
            <Layout>
                <RNText size="xl" variant="title">
                    Account Screen
                </RNText>
            </Layout>
        </>
    );
}
