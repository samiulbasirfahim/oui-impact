import ASSISTANT from "@/assets/svgs/assistant.svg";
import RADIXDASHBOARD from "@/assets/svgs/radix-icons_dashboard.svg";
import { RNButton } from "@/components/ui/button";
import { GradientBG } from "@/components/ui/gradient-bg";
import { RNInput } from "@/components/ui/input";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { useChatHistory } from "@/queries/useChat";
import Feather from "@expo/vector-icons/Feather";
import { router, usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useTranslation } from "react-i18next";
import { FlatList, Keyboard, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo, useState } from "react";

export default function ChatLayout() {
    const { t } = useTranslation();

    const { data, isLoading, isError } = useChatHistory();
    const chatList = data;

    const { top } = useSafeAreaInsets();
    const pathname = usePathname();

    const [searchText, setSearchText] = useState("");

    const filteredChatList = useMemo(() => {
        if (!chatList || !searchText.trim()) return chatList;

        const q = searchText.toLowerCase();
        console.log("Filtering chat list with query:", q);
        return chatList.filter((item) => item.title.toLowerCase().includes(q));
    }, [chatList, searchText]);

    return (
        <Drawer
            screenOptions={({ navigation }) => ({
                drawerPosition: "left",
                headerStyle: {
                    height: 100,
                },
                drawerType: "slide",
                swipeEdgeWidth: 140,

                headerTitle: "",
                headerRight: () => (
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 8,
                            alignItems: "center",
                        }}
                    >
                        <RNText
                            style={{
                                backgroundColor: COLORS.primary + "33",
                                padding: 4,
                                paddingHorizontal: 8,
                                borderRadius: 8,
                                fontWeight: "500",
                            }}
                        >
                            Limit: 52
                        </RNText>
                        <Pressable
                            onPress={() => {
                                Keyboard.dismiss();
                                navigation.openDrawer();
                            }}
                            style={{
                                marginRight: 16,
                                padding: 6,
                                borderRadius: 24,
                            }}
                        >
                            <RADIXDASHBOARD width={24} height={24} fill={COLORS.text} />
                        </Pressable>
                    </View>
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
                                fontFamily: "SuezOne",
                            }}
                        >
                            {t("chat.home.title")}
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
                            {t("chat.header.history")}
                        </Text>

                        <RNInput
                            placeholder={t("chat.search.placeholder")}
                            value={searchText}
                            onChangeText={setSearchText}
                            style={{
                                width: "90%",
                            }}
                            placeholderTextColor={COLORS.text}
                        />

                        <RNButton
                            nowrap
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                marginTop: 20,
                                backgroundColor: "transparent",
                                width: "90%",
                                gap: 12,
                            }}
                            onPress={() => {
                                router.push("/protected/(tabs)/chat");
                            }}
                        >
                            <Feather name="edit" size={24} color="black" />
                            <RNText
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                {t("chat.header.newChat")}
                            </RNText>
                        </RNButton>

                        <View
                            style={{
                                flex: 1,
                                width: "90%",
                                marginTop: 16,
                            }}
                        >
                            <RNText
                                style={{
                                    fontSize: 20,
                                    fontWeight: "600",
                                }}
                            >
                                {t("chat.header.history")}
                            </RNText>

                            <FlatList
                                data={filteredChatList}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => {
                                    const selected_id = pathname.split("/").pop();
                                    const Wrapper =
                                        item.id.toString() === selected_id ? GradientBG : View;
                                    return (
                                        <Pressable
                                            onPress={() => {
                                                router.push(`/protected/chat/${item.id}`);
                                            }}
                                        >
                                            <Wrapper
                                                style={{
                                                    padding: 8,
                                                    borderRadius: 10,
                                                    marginTop: 6,
                                                }}
                                            >
                                                <RNText>{item.title}</RNText>
                                            </Wrapper>
                                        </Pressable>
                                    );
                                }}
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
