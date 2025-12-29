import { FaqItem } from "@/type/faq";
import { Image } from "react-native";

export const minutesToMillis = (minutes: number) => minutes * 60 * 1000;

export function formatTimeAMPM(isoString: string): string {
    const date = new Date(isoString);

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export function parseISODate(dateString?: string) {
    if (!dateString) return undefined;

    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
}

export const refetchImage = async (uri: string) => {
    if (!Image.queryCache) {
        return;
    }

    console.log("Refetching image:", uri);

    const cache = await Image.queryCache([uri]);

    if (cache[uri]) {
        await Image.prefetch(uri);
    }
};

export function pickLocalizedText(item: FaqItem, lang: string) {
    const isFr = lang.startsWith("fr");

    return {
        question: isFr && item.question_fr ? item.question_fr : item.question,
        answer: isFr && item.answer_fr ? item.answer_fr : item.answer,
    };
}
