import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
            }}
        >
            <Link href="/tab1">
                <Text>Go to Tab 1</Text>
            </Link>
            <Link href="/profile/screen1">
                <Text>Go to Profile Screen 1</Text>
            </Link>
            <Link href="/profile/screen2">
                <Text>Go to Profile Screen 2</Text>
            </Link>
        </View>
    );
}
