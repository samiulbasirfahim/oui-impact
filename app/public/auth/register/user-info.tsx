import AntDesign from "@expo/vector-icons/AntDesign";
import { RNCountryPicker } from "@/components/common/country-picker";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { ReactNode, useState } from "react";
import { Pressable } from "react-native";
import { COLORS } from "@/constants";
import { RNPicker } from "@/components/common/picker";

type FormData = {
    fullName?: string;
    country?: string;
    countryFlag?: ReactNode;
    phoneNumber?: string;
    gender?: "male" | "female";
    dateOfBirth?: Date;
};

export default function UserInfoScreen() {
    const [showCountryPicker, setShowCountryPicker] = useState(false);

    const [formData, setFormData] = useState<FormData>({});

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <Layout>
            <RNText
                style={{
                    alignSelf: "center",
                }}
                size="2xl"
                variant="title"
            >
                User Information
            </RNText>
            <RNText
                style={{
                    alignSelf: "center",
                    textAlign: "center",
                }}
                variant="secondary"
            >
                Please enter your profile. Don’t worry, only you can see your personal
                data. No one else will be able to see it. Or yor can skip it for now.
            </RNText>

            <RNInput
                label="Full name"
                onChangeText={(t) => handleInputChange("fullName", t)}
            />
            <Pressable
                onPress={() => {
                    setShowCountryPicker(true);
                }}
                style={{
                    width: "100%",
                    position: "relative",
                }}
            >
                <RNInput
                    label="Country/Region"
                    value={formData.country}
                    editable={false}
                    key={formData.country}
                />
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

            <RNPicker
                items={[
                    {
                        value: "male",
                        label: "Male",
                    },
                    {
                        value: "female",
                        label: "Female",
                    },
                ]}
                label="Gender"
                value={
                    formData.gender
                        ? formData.gender === "male"
                            ? "Male"
                            : "Female"
                        : ""
                }
                onSelectItem={(item) => {
                    console.log("Selected gender:", item);
                    handleInputChange("gender", item);
                }}
                key={formData.gender}
            />

            <RNCountryPicker
                showCountryPicker={showCountryPicker}
                setShowCountryPicker={setShowCountryPicker}
                onSelectCountry={(country) => {
                    handleInputChange("country", country.name["en"]);
                    handleInputChange("countryFlag", country.code);
                }}
            />

            <RNButton variant="outline">Add profile photo</RNButton>
        </Layout>
    );
}
