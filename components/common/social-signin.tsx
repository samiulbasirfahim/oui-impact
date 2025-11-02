import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { TouchableOpacity, View } from "react-native";
import GOOGLE from "../../assets/svgs/gogole.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RNText } from "../ui/text";
import { COLORS } from "@/constants";

export function SocialSignIn() {
    return (
        <View style={{ width: "100%", gap: 8 }}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                    borderWidth: 1,
                    borderColor: COLORS.muted,
                    paddingVertical: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    flexDirection: "row",
                    gap: 8,
                }}
            >
                <GOOGLE width={30} height={31} />
                <RNText>Continue with Google</RNText>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                    paddingVertical: 11,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    gap: 8,
                    flexDirection: "row",
                    backgroundColor: "#3b5998",
                }}
            >
                <FontAwesome5 name="facebook" size={24} color="white" />
                <RNText
                    style={{
                        color: "white",
                    }}
                >
                    Continue with Facebook
                </RNText>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                    paddingVertical: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    gap: 8,
                    flexDirection: "row",
                    backgroundColor: "black",
                }}
            >
                <AntDesign name="apple" size={24} color="white" />
                <RNText
                    style={{
                        color: "white",
                    }}
                >
                    Continue with Facebook
                </RNText>
            </TouchableOpacity>
        </View>
    );
}
