import RADIXDASHBOARD from "@/assets/svgs/radix-icons_dashboard.svg";
import Entypo from "@expo/vector-icons/Entypo";
import ASSISTANT from "@/assets/svgs/assistant.svg";
import { GradientBG } from "@/components/ui/gradient-bg";
import { RNInput } from "@/components/ui/input";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { FlatList, Keyboard, Pressable, Text, View } from "react-native";
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
            screenOptions={({ navigation }) => ({
                drawerPosition: "left",
                headerStyle: {
                    height: 120,
                },

                headerTitle: () => null,

                headerRight: () => (
                    <Pressable
                        onPress={() => {
                            Keyboard.dismiss();
                            navigation.openDrawer();
                        }}
                        style={{
                            marginRight: 16,
                            padding: 6,
                            backgroundColor: COLORS.muted + "22",
                            borderRadius: 24,
                        }}
                    >
                        <RADIXDASHBOARD width={24} height={24} fill={COLORS.text} />
                    </Pressable>
                ),

                headerLeft: () => (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            marginLeft: 16,
                        }}
                    >
                        <GradientBG
                            style={{
                                padding: 12,
                                backgroundColor: COLORS.muted + "22",
                                borderRadius: 24,
                            }}
                        >
                            <ASSISTANT width={18} height={18} />
                        </GradientBG>
                        <RNText
                            variant="title"
                            style={{
                                fontSize: 20,
                                fontWeight: "600",
                            }}
                        >
                            AI Assistant
                        </RNText>
                    </View>
                ),
            })}
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

                        <RNInput
                            placeholder="Search..."
                            style={{
                                width: "90%",
                            }}
                            placeholderTextColor={COLORS.muted}
                        />

                        <View
                            style={{
                                flex: 1,
                                width: "90%",
                                marginTop: 30,
                            }}
                        >
                            <RNText
                                style={{
                                    fontSize: 20,
                                    fontWeight: "600",
                                }}
                            >
                                Chat History
                            </RNText>

                            <FlatList
                                data={chatList}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => {
                                            router.push(`/protected/chat/${item.id}`);
                                        }}
                                    >
                                        <GradientBG
                                            style={{
                                                padding: 15,
                                                borderRadius: 10,
                                                marginTop: 10,
                                            }}
                                        >
                                            <RNText>{item.name}</RNText>
                                        </GradientBG>
                                    </Pressable>
                                )}
                                style={{
                                    marginTop: 20,
                                    width: "100%",
                                }}
                            />
                        </View>
                    </View>
                );
            }}
        />
    );
}
