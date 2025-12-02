import RewardExpired from "@/assets/svgs/reward.svg";
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
            <RewardExpired height={100} />
            <RNText size="xl" variant="title">{t("status.noRewards.title")}</RNText>
            <RNText
                size="md"
                variant="secondary"
                style={{ textAlign: "center", marginBottom: 12 }}
            >
                {t("status.noRewards.subtitle")}
            </RNText>
            <RNButton>{t("status.noRewards.button")}</RNButton>
        </BlurBG>
    );
}
