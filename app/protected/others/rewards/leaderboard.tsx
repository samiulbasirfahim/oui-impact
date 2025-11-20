import { Layout } from "@/components/ui/layout";
import { Stack } from "expo-router";

export default function LeaderBoardScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Leaderboard",
                }}
            />
            <Layout></Layout>
        </>
    );
}
