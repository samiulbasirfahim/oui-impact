import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { RNTabs } from "@/lib/tabNavigation";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProtectedLayout() {
    const { t } = useTranslation();
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
    const { t } = useTranslation();
    const tabs = [
        t("tabs.chat"),
        t("tabs.redeem"),
        t("tabs.impact"),
        t("tabs.account"),
    ];
    const { bottom } = useSafeAreaInsets();

    const icons: Record<string, any> = {
        chat: require("@/assets/svgs/chat-tab.svg"),
        reward: require("@/assets/svgs/reward-tab.svg"),
        impact: require("@/assets/svgs/impact.svg"),
        account: require("@/assets/svgs/account.svg"),
    };

    return (
        <View
            style={{
                flexDirection: "row",
                borderTopWidth: 1,
                borderTopColor: COLORS.muted + "33",
                paddingBottom: bottom,
                backgroundColor: COLORS.background,
            }}
        >
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
                            paddingVertical: 8,
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
                            {tabs[index]}
                        </RNText>
                    </Pressable>
                );
            })}
        </View>
    );
}
