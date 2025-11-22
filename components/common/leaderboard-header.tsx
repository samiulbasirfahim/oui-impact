import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { RNText } from "../ui/text";
import CROWN from "@/assets/svgs/crown.svg";

type Person = {
    name: string;
    avatar: ImageSourcePropType;
};

type Props = {
    first: Person;
    second: Person;
    third: Person;
};

export function LeaderboardHeader({ first, second, third }: Props) {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <View style={styles.eachPersonContainer}>
                <View style={{ ...styles.eachPerson, borderColor: "#4F46E51A" }}>
                    <Image
                        style={{
                            ...styles.imageStyle,
                            width: (width - 128) / 3,
                            height: (width - 128) / 3,
                        }}
                        source={first.avatar}
                    />
                </View>

                <RNText>{second.name}</RNText>
            </View>
            <View style={{ ...styles.eachPersonContainer, marginTop: -16 }}>
                <CROWN
                    width={(width - 128) / 3}
                    height={(width - 128) / 3}
                    style={styles.crownStyle}
                />
                <View
                    style={{
                        ...styles.eachPerson,
                        borderColor: "#EDBC2A",
                        transform: [{ scale: 1.1 }],
                        marginBottom: 8,
                    }}
                >
                    <Image
                        style={{
                            ...styles.imageStyle,
                            width: (width - 128) / 3,
                            height: (width - 128) / 3,
                        }}
                        source={second.avatar}
                    />
                </View>
                <RNText>{second.name}</RNText>
            </View>
            <View style={styles.eachPersonContainer}>
                <View style={{ ...styles.eachPerson, borderColor: "#F59E0B33" }}>
                    <Image
                        style={{
                            ...styles.imageStyle,
                            width: (width - 128) / 3,
                            height: (width - 128) / 3,
                        }}
                        source={third.avatar}
                    />
                </View>
                <RNText>{third.name}</RNText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 24,
        marginTop: 64,
    },

    eachPerson: {
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 100,
        borderWidth: 6,
        transform: [{ scale: 0.95 }],
    },
    crownStyle: {
        position: "absolute",
        top: -64,
    },
    imageStyle: {},
    eachPersonContainer: {
        alignItems: "center",
    },
});
