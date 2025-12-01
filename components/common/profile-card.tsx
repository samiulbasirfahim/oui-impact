import { COLORS } from "@/constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { RNText } from "../ui/text";

export function ProfileCard() {
    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: COLORS.backgroundSecondary,
                padding: 10,
                borderRadius: 12,
            }}
        >
            <View>
                <Image
                    source={require("../../assets/images/placeholder-image.jpg")}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
            </View>
            <View
                style={{
                    marginLeft: 8,
                    justifyContent: "center",
                    flex: 1,
                    maxWidth: "60%",
                }}
            >
                <RNText size="lg" variant="title">
                    Samiul Basir Fahim
                </RNText>
                <RNText
                    size="sm"
                    variant="base"
                    style={{
                        flex: 1,
                        color: COLORS.muted,
                    }}
                >
                    samiulbasirfahim.rxen@gmail.com
                </RNText>

                <RNText
                    size="sm"
                    variant="base"
                    style={{ marginTop: 4, color: COLORS.muted, alignSelf: "center" }}
                >
                    1000 points
                </RNText>
            </View>
            <Pressable
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => {
                    router.push("/protected/others/accounts/edit-profile");
                }}
            >
                <FontAwesome6 name="pencil" size={24} color={COLORS.muted} />
            </Pressable>
        </View>
    );
}
