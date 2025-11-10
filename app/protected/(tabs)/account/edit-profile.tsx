import { COLORS } from "@/constants";
import { RNCountryPicker } from "@/components/common/country-picker";
import AVATAR from "@/assets/svgs/avatar.svg";
import EDIT from "@/assets/svgs/edit.svg";

import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { Stack } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { imagePicker } from "@/lib/imagePicker";
import { useState } from "react";
import { RNInput } from "@/components/ui/input";
import { RNPicker } from "@/components/common/picker";
import { RNDatePicker } from "@/components/common/date-picker";
import { RNButton } from "@/components/ui/button";

type FormData = {
    fullName?: string;
    country?: string;
    countryFlag?: string;
    countryCode?: string;
    phoneNumber?: string;
    gender?: "male" | "female";
    dateOfBirth?: Date;
    avatarUri?: string;
};

export default function Screen() {
    const [formData, setFormData] = useState<FormData>({});

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: "Edit Profile" }} />
            <Layout>
                <Pressable
                    onPress={() => {
                        imagePicker((uri) => {
                            if (uri) {
                                handleInputChange("avatarUri", uri);
                            }
                        });
                    }}
                    style={{
                        alignSelf: "center",
                        width: 100,
                        height: 100,
                        outlineWidth: 3,
                        outlineColor: COLORS.primary,
                        borderRadius: 50,
                        marginTop: 16,
                    }}
                >
                    {formData.avatarUri ? (
                        <Image
                            source={{
                                uri: formData.avatarUri,
                            }}
                            style={{
                                borderRadius: 50,
                                width: 100,
                                height: 100,
                            }}
                        />
                    ) : (
                        <>
                            <AVATAR
                                width={100}
                                height={100}
                                style={{
                                    borderRadius: 50,
                                    width: 100,
                                    height: 100,
                                }}
                            />
                        </>
                    )}
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                        }}
                    >
                        <EDIT width={30} height={30} />
                    </View>
                </Pressable>

                <RNInput
                    label="Full name"
                    onChangeText={(t) => handleInputChange("fullName", t)}
                />

                <RNInput
                    label="Phone Number"
                    value={formData.phoneNumber}
                    prefix={formData.countryCode}
                    onChangeText={(t) => handleInputChange("fullName", t)}
                    keyboardType="phone-pad"
                    key={formData.countryCode}
                />

                <RNCountryPicker
                    value={
                        (formData.countryFlag ? formData.countryFlag + "    " : "") +
                        (formData.country ?? "")
                    }
                    onSelectCountry={(country) => {
                        handleInputChange("country", country.name["en"]);
                        handleInputChange("countryFlag", country.flag);
                        handleInputChange("countryCode", country.dial_code);
                    }}
                />

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

                <RNDatePicker
                    onChangeDate={(date) => handleInputChange("dateOfBirth", date)}
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                />

                <RNButton>Submit</RNButton>
            </Layout>
        </>
    );
}
