import { useState } from "react";
import {
    Modal,
    View,
    TouchableOpacity,
    FlatList,
    Pressable,
    Dimensions,
} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate,
} from "react-native-reanimated";
import { COLORS } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RNText } from "../ui/text";
import { RNInput } from "../ui/input";

type Props = {
    label?: string;
    value?: string;
    items: { label: string; value: string }[];
    onSelectItem?: (item: string) => void;
};

const height = Dimensions.get("window").height;

export function RNPicker({ onSelectItem, label, value, items }: Props) {
    const [showPicker, setShowPicker] = useState(false);
    const animationDriver = useSharedValue(0);

    const closeModal = () => {
        animationDriver.value = withTiming(0, { duration: 400 });
        setTimeout(() => setShowPicker(false), 400);
    };

    const modalPosition = useAnimatedStyle(() => {
        const translateY = interpolate(
            animationDriver.value,
            [0, 1],
            [height, 0],
            Extrapolate.CLAMP,
        );

        return {
            transform: [{ translateY }],
        };
    });

    const backdropStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animationDriver.value,
            [0, 0.5, 1],
            [0, 0.5, 1],
            Extrapolate.CLAMP,
        );

        return {
            opacity,
        };
    });

    const onSelectItemHandle = (item: string) => {
        if (onSelectItem) {
            onSelectItem(item);
        }
        closeModal();
    };

    const renderItem = ({
        item,
        index,
    }: {
        item: {
            value: string;
            label: string;
        };
    }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onSelectItemHandle(item.value)}
            style={{
                width: "100%",
                paddingHorizontal: 16,
            }}
        >
            <RNText style={{ color: COLORS.text }}>{item.label}</RNText>
        </TouchableOpacity>
    );

    return (
        <>
            <Pressable
                onPress={() => {
                    setShowPicker(true);
                    animationDriver.value = withTiming(1, { duration: 400 });
                }}
                style={{
                    width: "100%",
                    position: "relative",
                }}
            >
                <RNInput label={label} value={value} editable={false} />

                <AntDesign
                    style={{
                        position: "absolute",
                        right: 8,
                        top: 20,
                        padding: 4,
                    }}
                    name="down"
                    size={20}
                    color={COLORS.muted}
                />
            </Pressable>

            <Modal
                animationType="none"
                transparent={true}
                visible={showPicker}
                onRequestClose={closeModal}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                    }}
                >
                    <Animated.View
                        onStartShouldSetResponder={() => {
                            closeModal();
                            return false;
                        }}
                        style={[
                            {
                                flex: 1,
                                backgroundColor: "rgba(0,0,0,0.45)",
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                justifyContent: "flex-end",
                            },
                            backdropStyle,
                        ]}
                    />

                    <Animated.View
                        style={[
                            {
                                backgroundColor: COLORS.background,
                                width: "100%",
                                borderTopRightRadius: 15,
                                borderTopLeftRadius: 15,
                                padding: 16,
                                maxHeight: height * 0.8,
                                zIndex: 10,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.37,
                                shadowRadius: 7.49,
                                elevation: 10,
                            },
                            modalPosition,
                        ]}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 12,
                            }}
                        >
                            <RNText
                                style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: COLORS.text,
                                }}
                            >
                                {label || "Select"}
                            </RNText>
                            <TouchableOpacity onPress={closeModal} activeOpacity={0.7}>
                                <AntDesign name="close" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                width: "100%",
                                height: 2,
                                backgroundColor: COLORS.muted,
                            }}
                        />

                        <FlatList
                            data={items}
                            keyExtractor={(item, index) => `${item}-${index}`}
                            renderItem={renderItem}
                            style={{ marginBottom: 20, marginTop: 12 }}
                            ItemSeparatorComponent={() => (
                                <View
                                    style={{
                                        width: "100%",
                                        height: 1,
                                        backgroundColor: COLORS.muted,
                                        marginVertical: 8,
                                    }}
                                />
                            )}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                        />
                    </Animated.View>
                </View>
            </Modal>
        </>
    );
}
