import AVATAR from "@/assets/svgs/avatar.svg";
import EDIT from "@/assets/svgs/edit.svg";
import { useUpdateProfile } from "@/queries/useUpdateUser";
import { RNCountryPicker } from "@/components/common/country-picker";
import { COLORS } from "@/constants";
import { RNDatePicker } from "@/components/common/date-picker";
import { RNPicker } from "@/components/common/picker";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Layout } from "@/components/ui/layout";
import { imagePicker } from "@/lib/imagePicker";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, View } from "react-native";
import { useAuthStore } from "@/store/auth";
import { parseISODate } from "@/lib/utils";
import type { User } from "@/type/user";

type FormData = Partial<User> & {
    countryFlag?: string;
    countryCode?: string;
};

export default function Screen() {
    const { t } = useTranslation();
    const { user } = useAuthStore();

    const [formData, setFormData] = useState<FormData>({
        name: user?.name ?? "",
        country: user?.country ?? "",
        phone: user?.phone ?? "",
        gender: user?.gender ?? undefined,
        img: user?.img ?? undefined,
        date_of_birth: user?.date_of_birth ?? undefined,
    });

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

    return (
        <>
            <Stack.Screen options={{ headerTitle: t("account.editProfile.title") }} />
            <Layout>
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
                        marginTop: 16,
                    }}
                >
                    {formData.img ? (
                        <Image
                            source={{ uri: imgUri ?? formData.img }}
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
                    value={formData.name}
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
                        formData.date_of_birth
                            ? parseISODate(formData.date_of_birth)
                            : undefined
                    }
                    onChangeDate={(date) =>
                        handleInputChange("date_of_birth", date.toISOString().split("T")[0])
                    }
                />

                <RNButton
                    loading={isPending}
                    onPress={() =>
                        updateProfile(
                            { ...formData, img: imgUri },
                            {
                                onSuccess: () => {
                                    router.canGoBack() && router.back();
                                },
                            },
                        )
                    }
                >
                    {t("account.editProfile.save")}
                </RNButton>
            </Layout>
        </>
    );
}
