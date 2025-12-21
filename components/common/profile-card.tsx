import { COLORS } from "@/constants";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { RNText } from "../ui/text";
import { useAuthStore } from "@/store/auth";

export function ProfileCard() {
    const { user } = useAuthStore();

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
                    source={{
                        uri: user?.img
                            ? user.img
                            : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                    }}
                    resizeMode="contain"
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
                <RNText
                    size="lg"
                    variant="title"
                    style={{
                        marginBottom: 6,
                    }}
                >
                    {user?.name && user.name.length > 0 ? user?.name : "Unnamed"}
                </RNText>
                <RNText
                    size="sm"
                    variant="base"
                    style={{
                        flex: 1,
                        color: COLORS.muted,
                    }}
                >
                    {user?.email && user.email.length > 0 ? user?.email : "undefined"}
                </RNText>

                <RNText
                    size="sm"
                    variant="base"
                    style={{ marginTop: 4, color: COLORS.muted, alignSelf: "center" }}
                >
                    {user?.my_points ?? 0} points
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
