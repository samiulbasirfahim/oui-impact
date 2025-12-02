import SHARE_EARN from "@/assets/svgs/share-earn.svg";
import { RNButton } from "@/components/ui/button";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import Octicons from "@expo/vector-icons/Octicons";
import BottomSheet, {
    BottomSheetTextInput,
    BottomSheetView,
    useBottomSheetScrollableCreator,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, View } from "react-native";

export default function Screen() {
    const { t } = useTranslation();
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const scrollView = useBottomSheetScrollableCreator();

    const data = Array.from({ length: 20 }, (_, i) => {
        return {
            id: i + 1,
            name: `Friend ${i + 1}`,
            date: new Date().toISOString().split("T")[0],
            avatar: require("@/assets/images/placeholder-image.jpg"),
        };
    });

    return (
        <>
            <Layout edges={["top"]}>
                <SHARE_EARN style={{ alignSelf: "center", marginVertical: 32 }} />
                <RNText
                    size="2xl"
                    variant="title"
                    style={{
                        textAlign: "center",
                        width: "70%",
                        alignSelf: "center",
                        marginBottom: 24,
                    }}
                >
                    {t("shareEarn.title")}
                </RNText>

                <RNText>{t("shareEarn.referralLink")}</RNText>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        marginTop: 8,
                        padding: 12,
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <RNText
                        variant="caption"
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        www.example.com/referral-link
                    </RNText>
                    <RNButton
                        variant="ghost"
                        size="sm"
                        nowrap
                        style={{
                            paddingVertical: 0,
                            paddingHorizontal: 0,
                        }}
                        onPress={() => {
                            alert("Link copied to clipboard!");
                        }}
                    >
                        <Octicons name="copy" size={18} color={COLORS.primary} />
                    </RNButton>
                </View>
            </Layout>

            <BottomSheet
                snapPoints={[200, 540]}
                keyboardBehavior="extend"
                enableHandlePanningGesture={true}
                enablePanDownToClose={false}
                enableDynamicSizing={false}
                onChange={(index) => {
                    if (index === 0) {
                        setShowSearch(false);
                    }
                }}
            >
                <BottomSheetView
                    style={{
                        padding: 16,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {showSearch ? (
                            <BottomSheetTextInput
                                autoFocus
                                placeholderTextColor={COLORS.secondaryText}
                                placeholder={t("shareEarn.searchPlaceholder")}
                                style={{
                                    borderWidth: 1,
                                    flex: 1,
                                    borderRadius: 8,
                                    padding: 12,
                                    fontSize: 16,
                                }}
                            />
                        ) : (
                            <RNText size="lg" variant="title">
                                {t("shareEarn.invitedFriends")}
                            </RNText>
                        )}

                        <Pressable
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 4,
                                marginLeft: 8,
                            }}
                            onPress={() => setShowSearch((prev) => !prev)}
                        >
                            <Octicons
                                name={showSearch ? "x" : "search"}
                                size={22}
                                color={COLORS.text}
                            />
                        </Pressable>
                    </View>

                    <FlashList
                        data={data}
                        renderScrollComponent={scrollView}
                        renderItem={(item) => {
                            return (
                                <View style={styles.friendItem}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 12,
                                        }}
                                    >
                                        <Image
                                            source={item.item.avatar}
                                            style={{ width: 48, height: 48, borderRadius: 24 }}
                                        />
                                        <View>
                                            <RNText variant="title" size="lg">
                                                {item.item.name}
                                            </RNText>
                                            {
                                                <RNText
                                                    variant="caption"
                                                    size="sm"
                                                    style={{ color: COLORS.secondaryText }}
                                                >
                                                    {item.item.date}
                                                </RNText>
                                            }
                                        </View>
                                    </View>
                                    <RNText
                                        variant="title"
                                        size="sm"
                                        style={{
                                            color: COLORS.primary,
                                            backgroundColor: COLORS.primary + "22",
                                            padding: 6,
                                            borderRadius: 4,
                                        }}
                                    >
                                        {t("shareEarn.points", { count: 550 })}
                                    </RNText>
                                </View>
                            );
                        }}
                        style={{
                            marginTop: 16,
                            height: 400,
                        }}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: COLORS.muted + "33",
                                }}
                            ></View>
                        )}
                        contentContainerStyle={{
                            paddingBottom: 32,
                        }}
                    />
                </BottomSheetView>
            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    friendItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
});
