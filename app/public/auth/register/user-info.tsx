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
import { useUpdateProfile } from "@/queries/useUpdateUser";
import type { User } from "@/type/user";
import { router } from "expo-router";

type FormData = Partial<User> & {
    name?: string;
    countryFlag?: string;
    countryCode?: string;
};

export default function UserInfoScreen() {
    const { t } = useTranslation();

    const [formData, setFormData] = useState<FormData>({});
    const [imgUri, setImgUri] = useState<string | null>(null);

    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const handleInputChange = <K extends keyof FormData>(
        field: K,
        value: FormData[K],
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        updateProfile(
            {
                ...formData,
                ...(imgUri ? { img: imgUri } : {}),
            },
            {
                onSuccess: () => {
                    router.canDismiss() && router.dismissAll();
                    router.replace("/protected/chat");
                },
            },
        );
    };

    return (
        <Layout>
            <RNText style={{ alignSelf: "center" }} size="2xl" variant="title">
                {t("auth.userInfo.title")}
            </RNText>

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

            {/* AVATAR */}
            <Pressable
                onPress={() =>
                    imagePicker((uri) => {
                        if (uri) setImgUri(uri);
                    })
                }
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
                {imgUri ? (
                    <Image
                        source={{ uri: imgUri }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                ) : (
                    <AVATAR width={100} height={100} />
                )}

                <View style={{ position: "absolute", bottom: 0, right: 0 }}>
                    <EDIT width={30} height={30} />
                </View>
            </Pressable>

            <RNInput
                label={t("auth.userInfo.fullName")}
                onChangeText={(t) => handleInputChange("name", t)}
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
                value={formData.phone ?? ""}
                prefix={formData.countryCode}
                onChangeText={(t) => handleInputChange("phone", t)}
                keyboardType="phone-pad"
                key={formData.countryCode}
            />

            <RNPicker
                items={[
                    { value: "male", label: t("auth.userInfo.male") },
                    { value: "female", label: t("auth.userInfo.female") },
                ]}
                key={formData.gender}
                label={t("auth.userInfo.gender")}
                value={
                    formData.gender
                        ? formData.gender === "male"
                            ? t("auth.userInfo.male")
                            : t("auth.userInfo.female")
                        : ""
                }
                onSelectItem={(item) =>
                    handleInputChange("gender", item as User["gender"])
                }
            />

            <RNDatePicker
                label={t("auth.userInfo.dob")}
                value={
                    formData.date_of_birth ? new Date(formData.date_of_birth) : undefined
                }
                onChangeDate={(date) =>
                    handleInputChange("date_of_birth", date.toISOString().split("T")[0])
                }
            />

            <RNButton
                onPress={handleSubmit}
                loading={isPending}
                style={{ marginTop: 16 }}
            >
                {t("auth.userInfo.button")}
            </RNButton>
        </Layout>
    );
}
