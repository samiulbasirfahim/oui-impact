import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { Link, Stack } from "expo-router";

export default function Screen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Rewards",
                }}
            />
            <Layout>
                <Link href="/protected/(tabs)/reward/watch-earn">
                    <RNText>Watch & Earn</RNText>
                </Link>
            </Layout>
        </>
    );
}
