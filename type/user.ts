export type User = {
    id: number;
    email: string;
    name: string;
    img: string | null;
    gender: string | null;
    date_of_birth: string | null;
    country: string | null;
    is_buy: boolean;
    plan: string;
    my_points: number;
    is_verified: boolean;
    social_auth_provider: string | null;
    referral_code: string;
};

export type AuthData = {
    refreshToken: string;
    accessToken: string;
};
