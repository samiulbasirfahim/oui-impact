import { RNCountryPicker } from "@/components/common/country-picker";
import AVATAR from "@/assets/svgs/avatar.svg";
import EDIT from "@/assets/svgs/edit.svg";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { useState } from "react";
import { RNPicker } from "@/components/common/picker";
import { RNDatePicker } from "@/components/common/date-picker";
import { Image, Pressable, View } from "react-native";
import { imagePicker } from "@/lib/imagePicker";
import { COLORS } from "@/constants";
import { useTranslation } from "react-i18next";

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

export default function UserInfoScreen() {
    const [formData, setFormData] = useState<FormData>({});
    const { t } = useTranslation();

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return (
        <Layout>
            {/* TITLE */}
            <RNText style={{ alignSelf: "center" }} size="2xl" variant="title">
                {t("auth.userInfo.title")}
            </RNText>

            {/* SUBTITLE */}
            <RNText
                style={{
                    alignSelf: "center",
                    textAlign: "center",
                    marginTop: 6,
                }}
                variant="secondary"
            >
                {t("auth.userInfo.subtitle")}
            </RNText>

            {/* AVATAR PICKER */}
            <Pressable
                onPress={() => {
                    imagePicker((uri) => {
                        if (uri) handleInputChange("avatarUri", uri);
                    });
                }}
                style={{
                    alignSelf: "center",
                    width: 100,
                    height: 100,
                    outlineWidth: 3,
                    outlineColor: COLORS.primary,
                    borderRadius: 50,
                    marginTop: 20,
                }}
            >
                {formData.avatarUri ? (
                    <Image
                        source={{ uri: formData.avatarUri }}
                        style={{
                            borderRadius: 50,
                            width: 100,
                            height: 100,
                        }}
                    />
                ) : (
                    <AVATAR
                        width={100}
                        height={100}
                        style={{
                            borderRadius: 50,
                            width: 100,
                            height: 100,
                        }}
                    />
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

            {/* FULL NAME */}
            <RNInput
                label={t("auth.userInfo.fullName")}
                onChangeText={(t) => handleInputChange("fullName", t)}
            />

            {/* COUNTRY PICKER */}
            <RNCountryPicker
                value={
                    (formData.countryFlag ? formData.countryFlag + "    " : "") +
                    (formData.country ?? "")
                }
                label={t("auth.userInfo.country")}
                onSelectCountry={(country) => {
                    handleInputChange("country", country.name["en"]);
                    handleInputChange("countryFlag", country.flag);
                    handleInputChange("countryCode", country.dial_code);
                }}
            />

            {/* PHONE INPUT */}
            <RNInput
                label={t("auth.userInfo.phone")}
                value={formData.phoneNumber}
                prefix={formData.countryCode}
                onChangeText={(t) => handleInputChange("phoneNumber", t)}
                keyboardType="phone-pad"
                key={formData.countryCode}
            />

            {/* GENDER PICKER */}
            <RNPicker
                items={[
                    { value: "male", label: "Male" },
                    {
                        value: "female",
                        label: "Female",
                    },
                ]}
                label={t("auth.userInfo.gender")}
                value={
                    formData.gender
                        ? formData.gender === "male"
                            ? (t("auth.userInfo.genderMale") ?? "Male")
                            : (t("auth.userInfo.genderFemale") ?? "Female")
                        : ""
                }
                onSelectItem={(item) => handleInputChange("gender", item)}
                key={formData.gender}
            />

            {/* DOB */}
            <RNDatePicker
                onChangeDate={(date) => handleInputChange("dateOfBirth", date)}
                label={t("auth.userInfo.dob")}
                value={formData.dateOfBirth}
            />

            {/* SUBMIT */}
            <RNButton style={{ marginTop: 16 }}>{t("auth.userInfo.button")}</RNButton>
        </Layout>
    );
}
