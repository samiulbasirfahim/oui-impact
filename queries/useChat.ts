import { fetcher } from "@/lib/fetcher";
import { ChatHistoryList } from "@/type/chat";
import { ApiChatListResponse, Message } from "@/type/message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useChatHistory() {
    return useQuery<ChatHistoryList>({
        queryKey: ["chatHistory"],
        queryFn: async () => {
            const res = await fetcher("/chat/chats/", {
                method: "GET",
                auth: true,
            });

            if (res === null) {
                return [];
            }

            if (!Array.isArray(res)) {
                throw new Error("Invalid response format");
            }

            return res.map((item: any) => ({
                id: item.id,
                title: item.title,
                created_at: item.created_at,
                messages_count: item.messages_count,
            }));
        },
    });
}

export function useMessageHistory(chatId: number | null) {
    return useQuery<Message[]>({
        queryKey: ["messageHistory", chatId],
        queryFn: async () => {
            if (chatId === null) {
                return [];
            }
            const res = await fetcher(`/chat/chats/${chatId}/`, {
                method: "GET",
                auth: true,
            });

            if (res === null) {
                return [];
            }

            if (typeof res !== "object") {
                throw new Error("Invalid response format");
            }

            if (!("messages" in res)) {
                throw new Error("Invalid response format: missing messages");
            }

            if (!res || !Array.isArray(res.messages)) {
                return [];
            }

            const formatted: Message[] = [];

            res.messages.forEach((item: ApiChatListResponse) => {
                if (item.user_text) {
                    formatted.push({
                        id: `user-${item.id}`,
                        text: item.user_text,
                        time: item.created_at,
                        isMe: true,
                    });
                }

                if (item.assistant_text) {
                    formatted.push({
                        id: `assistant-${item.id}`,
                        text: item.assistant_text,
                        time: item.created_at,
                        isMe: false,
                    });
                }
            });

            return formatted;
        },
        enabled: !!chatId,
    });
}

type SendFirstMessagePayload = {
    text: string;
};

export function useSendFirstMessage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ text }: SendFirstMessagePayload) => {
            const res = await fetcher("/chat/chats/message/", {
                method: "POST",
                auth: true,
                body: { text },
            });

            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["chatHistory"],
            });
        },
    });
}

type SendMessagePayload = {
    chatId: number;
    text: string;
};

export function useSendMessage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ chatId, text }: SendMessagePayload) => {
            return fetcher(`/chat/chats/${chatId}/message/`, {
                method: "POST",
                auth: true,
                body: { text },
            });
        },

        // onSuccess: (_data, variables) => {
        //     // 🔄 refetch messages for this chat
        //     queryClient.invalidateQueries({
        //         queryKey: ["messageHistory", variables.chatId],
        //     });
        // },
    });
}
