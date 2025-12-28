import { View } from "react-native";
import { RNButton } from "../ui/button";
import { RNModal } from "../ui/modal";
import { RNText } from "../ui/text";
import { useAuthStore } from "@/store/auth";
import { useTranslation } from "react-i18next";

type Props = {
    onClose: () => void;
    isOpen: boolean;
};

export function LogOutModal({ onClose, isOpen }: Props) {
    const { logOut } = useAuthStore();
    const { t } = useTranslation();

    const onConfirm = () => {
        logOut();
        onClose();
    };

    return (
        <RNModal onClose={onClose} isOpen={isOpen}>
            <RNText
                variant="title"
                size="lg"
                style={{
                    textAlign: "center",
                    marginBottom: 12,
                }}
            >
                {t("logout.title")}
            </RNText>

            <RNText style={{ textAlign: "center" }}>{t("logout.description")}</RNText>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 24,
                    gap: 12,
                }}
            >
                <RNButton style={{ flex: 1 }} variant="outline" onPress={onClose}>
                    {t("common.cancel")}
                </RNButton>

                <RNButton style={{ flex: 1 }} onPress={onConfirm}>
                    {t("common.confirm")}
                </RNButton>
            </View>
        </RNModal>
    );
}
