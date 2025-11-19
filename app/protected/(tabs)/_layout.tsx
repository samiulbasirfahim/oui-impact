import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { RNTabs } from "@/lib/tabNavigation";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProtectedLayout() {
    const { bottom } = useSafeAreaInsets();


    return (
        <RNTabs
            tabBarPosition="bottom"
            screenOptions={{
                lazy: false,
                swipeEnabled: true,
                tabBarStyle: {
                    paddingBottom: bottom,
                },
                tabBarIndicatorStyle: {
                    marginBottom: bottom,
                    height: 2,
                },
                animationEnabled: true,
            }}
            tabBar={CustomTabBar}
        >
            <Tabs.Screen name="chat" />
            <Tabs.Screen name="reward" />
            <Tabs.Screen name="impact" />
            <Tabs.Screen name="account" />
        </RNTabs>
    );
}

function CustomTabBar(props: MaterialTopTabBarProps) {
    const tabs = ["Chat", "Reward", "Impact", "Account"];
    const { bottom } = useSafeAreaInsets();

    const icons: Record<string, any> = {
        chat: require("@/assets/svgs/chat-tab.svg"),
        reward: require("@/assets/svgs/reward-tab.svg"),
        impact: require("@/assets/svgs/impact.svg"),
        account: require("@/assets/svgs/account.svg"),
    };

    return (
        <View style={{ flexDirection: "row", paddingBottom: bottom }}>
            {props.state.routes.map((route, index) => {
                const isFocused = props.state.index === index;
                const IconComponent = icons[route.name.toLowerCase()]?.default;

                return (
                    <Pressable
                        onPress={() => {
                            const event = props.navigation.emit({
                                type: "tabPress",
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                props.navigation.navigate(route.name);
                            }
                        }}
                        key={route.key}
                        style={{
                            paddingBottom: 16,
                            flex: 1,
                            alignItems: "center",
                            gap: 4,
                            backgroundColor: COLORS.background,
                        }}
                    >
                        {IconComponent && (
                            <>
                                <IconComponent
                                    width={Dimensions.get("window").width > 400 ? 24 : 20}
                                    height={Dimensions.get("window").width > 400 ? 24 : 20}
                                    fill={isFocused ? COLORS.primary : COLORS.muted}
                                />
                            </>
                        )}

                        <RNText
                            style={{
                                color: isFocused ? COLORS.primary : COLORS.muted,
                            }}
                            size={Dimensions.get("window").width > 400 ? "md" : "sm"}
                        >
                            {tabs[index].charAt(0).toUpperCase() + tabs[index].slice(1)}
                        </RNText>
                    </Pressable>
                );
            })}
        </View>
    );
}
