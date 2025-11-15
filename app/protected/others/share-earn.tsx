import { Layout } from "@/components/ui/layout";
import BottomSheet, {
    BottomSheetFlashList,
    BottomSheetTextInput,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { RNText } from "@/components/ui/text";
import SHARE_EARN from "@/assets/svgs/share-earn.svg";
import { Pressable, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { COLORS } from "@/constants";
import { RNButton } from "@/components/ui/button";
import { useState } from "react";

export default function Screen() {
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const data = Array.from({ length: 20 }, (_, i) => {
        return {
            id: i + 1,
            name: `Friend ${i + 1}`,
            platform: i % 2 === 0 ? "Facebook" : "Instagram",
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
                    Earn Reward By Refer
                </RNText>

                <RNText>Your referral link</RNText>
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
                                placeholder="Search Friends..."
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
                                Invite a Friend
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

                    <BottomSheetFlashList
                        data={data}
                        keyExtractor={(item: number) => item.toString()}
                        renderItem={({ item }: { item: number }) => (
                            <View style={{}}></View>
                        )}
                        estimatedItemSize={50}
                    />
                </BottomSheetView>
            </BottomSheet>
        </>
    );
}
