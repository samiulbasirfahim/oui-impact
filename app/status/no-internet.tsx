import NoInternetSVG from "@/assets/svgs/no-internet.svg";
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
            <NoInternetSVG height={100} />
            <RNText size="xl" variant="title">{t("auth.session.noInternetTitle")}</RNText>
            <RNText
                size="md"
                variant="secondary"
                style={{ textAlign: "center", marginBottom: 12 }}
            >
                {t("auth.session.noInternetSubtitle")}
            </RNText>
            <RNButton>{t("auth.session.retry")}</RNButton>
        </BlurBG>
    );
}
