import { COLORS } from "@/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";
import { RNText } from "../ui/text";


function RedeemItem(){
    return <View>
        
    </View>
}


export function RedeemptionHistory() {
    return (
        <View>
            <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="history" size={24} color={COLORS.text} />
                <RNText variant="subtitle" size="lg">
                    Redeemption History
                </RNText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    labelContainer: {
        marginTop: 12,
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
    },
});
