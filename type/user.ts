export type User = {
    email: string;
    phone: string;
    country: string;
    avatarUrl: string;
    gender: "male" | "female";
};

export type AuthData = {
    refreshToken: string;
    accessToken: string;
};
