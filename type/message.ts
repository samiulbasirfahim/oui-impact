export type ApiChatListResponse = {
    id: number;
    user: number;
    chat: number;
    user_text: string | null;
    assistant_text: string | null;
    created_at: string;
};

export type ChatWithMessagesResponse = {
    id: number;
    title: string;
    created_at: string;
    messages: ApiChatListResponse[];
};

export type Message = {
    id: string;
    text: string;
    time: string;
    isMe: boolean;
};
