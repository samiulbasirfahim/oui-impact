import AVATAR from "@/assets/svgs/avatar.svg";
import EDIT from "@/assets/svgs/edit.svg";
import { RNCountryPicker } from "@/components/common/country-picker";
import { COLORS } from "@/constants";

import { RNDatePicker } from "@/components/common/date-picker";
import { RNPicker } from "@/components/common/picker";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { imagePicker } from "@/lib/imagePicker";
import { Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, View } from "react-native";

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
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FormData>({});

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: t("account.editProfile.title") }} />
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
                    label={t("auth.userInfo.fullName")}
                    onChangeText={(t) => handleInputChange("fullName", t)}
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

                <RNInput
                    label={t("auth.userInfo.phone")}
                    value={formData.phoneNumber}
                    prefix={formData.countryCode}
                    onChangeText={(t) => handleInputChange("fullName", t)}
                    keyboardType="phone-pad"
                    key={formData.countryCode}
                />

                <RNPicker
                    items={[
                        {
                            value: "male",
                            label: t("auth.userInfo.male"),
                        },
                        {
                            value: "female",
                            label: t("auth.userInfo.female"),
                        },
                    ]}
                    label={t("auth.userInfo.gender")}
                    value={
                        formData.gender
                            ? formData.gender === "male"
                                ? t("auth.userInfo.male")
                                : t("auth.userInfo.female")
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
                    label={t("auth.userInfo.dob")}
                    value={formData.dateOfBirth}
                />

                <RNButton>{t("account.editProfile.save")}</RNButton>
            </Layout>
        </>
    );
}
