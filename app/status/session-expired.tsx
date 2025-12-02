import SessionExpired from "@/assets/svgs/session-expired.svg";
import { BlurBG } from "@/components/ui/blur-bg";
import { RNButton } from "@/components/ui/button";
import { RNText } from "@/components/ui/text";
import { useTranslation } from "react-i18next";

export default function NotInternetScreen() {
    const { t } = useTranslation();
    return (
        <BlurBG
            style={{
                padding: 16,
                gap: 8,
            }}
            centered
        >
            <SessionExpired height={100} />
            <RNText size="xl" variant="title">{t("auth.session.expiredTitle")}</RNText>
            <RNText
                size="md"
                variant="secondary"
                style={{ textAlign: "center", marginBottom: 12 }}
            >
                {t("auth.session.expiredSubtitle")}
            </RNText>
            <RNButton>{t("auth.session.loginButton")}</RNButton>
        </BlurBG>
    );
}
