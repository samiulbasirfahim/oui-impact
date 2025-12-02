import NoChat from "@/assets/svgs/chat.svg";
import { BlurBG } from "@/components/ui/blur-bg";
import { RNButton } from "@/components/ui/button";
import { RNText } from "@/components/ui/text";
import { useTranslation } from "react-i18next";

export default function NoChatScreen() {
    const { t } = useTranslation();
    return (
        <BlurBG
            style={{
                padding: 16,
                gap: 8,
            }}
            centered
        >
            <NoChat height={100} />
            <RNText size="xl" variant="title">{t("chat.empty.title")}</RNText>
            <RNText
                size="md"
                variant="secondary"
                style={{ textAlign: "center", marginBottom: 12 }}
            >
                {t("chat.empty.subtitle")}
            </RNText>
            <RNButton>{t("chat.empty.button")}</RNButton>
        </BlurBG>
    );
}
