import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { Pressable, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants";
import { RNText } from "../ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RNInput } from "../ui/input";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

type Props = {
    value?: string;
    onSelectCountry?: (country: CountryItem) => void;
};

export function RNCountryPicker({ onSelectCountry, value }: Props) {
    const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);

    const onSelectCountryHandle = (country: CountryItem) => {
        if (onSelectCountry) {
            onSelectCountry(country);
        }
        setShowCountryPicker(false);
    };

    const { bottom } = useSafeAreaInsets();

    return (
        <>
            <Pressable
                onPress={() => {
                    setShowCountryPicker(true);
                }}
                pointerEvents="box-only"
                style={{
                    width: "100%",
                    position: "relative",
                }}
            >
                <RNInput
                    label="Country/Region"
                    value={value}
                    editable={false}
                    key={value}
                    pointerEvents="none"
                />
                <AntDesign
                    style={{
                        position: "absolute",
                        right: 8,
                        top: 20,
                        padding: 4,
                    }}
                    name="caret-down"
                    size={20}
                    color={COLORS.muted}
                />
            </Pressable>

            <CountryPicker
                show={showCountryPicker}
                pickerButtonOnPress={(country) => {
                    onSelectCountryHandle(country);
                }}
                onBackdropPress={() => {
                    setShowCountryPicker(false);
                }}
                itemTemplate={(item) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={item.onPress}
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.muted,
                        }}
                    >
                        <RNText>
                            {item.item.flag} {item.name}
                        </RNText>
                    </TouchableOpacity>
                )}
                enableModalAvoiding={true}
                style={{
                    modal: {
                        height: "80%",
                        paddingBottom: bottom,
                    },
                }}
                lang="en"
            />
        </>
    );
}
