import { Layout } from "@/components/ui/layout";
import { Stack } from "expo-router";

export default function Screen() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Watch & Earn",
                }}
            />
            <Layout></Layout>
        </>
    );
}
