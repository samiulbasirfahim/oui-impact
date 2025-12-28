export type ChatHistory = {
    id: number;
    title: string;
    created_at: string;
    messages_count: number;
};

export type ChatHistoryList = ChatHistory[];

export type ChatMessage = {
    id: number;
    chat_history_id: number;
    sender: "user" | "bot";
    content: string;
    timestamp: Date;
};

export type ChatMessageList = ChatMessage[];
