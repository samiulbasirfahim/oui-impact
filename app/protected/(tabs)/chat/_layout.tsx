import { Drawer } from "expo-router/drawer";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatLayout() {
    const chatList = [
        { id: "1", name: "General" },
        { id: "2", name: "Random" },
        { id: "3", name: "Tech Talk" },
    ];

    const { top } = useSafeAreaInsets();

    return (
        <Drawer
            drawerContent={() => {
                return (
                    <View
                        style={{
                            flex: 1,
                            paddingTop: top + 20,
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: "bold",
                                marginBottom: 20,
                                fontFamily: "SuezOne",
                            }}
                        >
                            History
                        </Text>
                    </View>
                );
            }}
        />
    );
}
