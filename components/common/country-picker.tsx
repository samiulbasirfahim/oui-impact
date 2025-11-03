import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { TouchableOpacity } from "react-native";
import { COLORS } from "@/constants";
import { RNText } from "../ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
    showCountryPicker: boolean;
    setShowCountryPicker: (show: boolean) => void;
    onSelectCountry?: (country: CountryItem) => void;
};

export function RNCountryPicker({
    showCountryPicker,
    setShowCountryPicker,
    onSelectCountry,
}: Props) {
    const onSelectCountryHandle = (country: CountryItem) => {
        if (onSelectCountry) {
            onSelectCountry(country);
        }
        setShowCountryPicker(false);
    };

    const { bottom } = useSafeAreaInsets();

    return (
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
                        padding: 10,
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
    );
}
