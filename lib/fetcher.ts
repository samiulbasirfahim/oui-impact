import { useTokenStore } from "@/store/auth";

export const BASE_URL =
    "https://walleyed-manipulatively-katelynn.ngrok-free.dev/api";

export class ApiError extends Error {
    public status: number;
    public data: any;

    constructor(status: number, data: any) {
        super("API Error");
        this.status = status;
        this.data = data;
    }
}

type Options = {
    method?: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
    body?: any;
    headers?: Record<string, string>;
    auth?: boolean;
};

export async function fetcher<T>(
    endpoint: string,
    options: Options = {},
): Promise<T> {
    const { method = "GET", body, headers = {}, auth = false } = options;

    const finalHeaders: Record<string, string> = {
        Accept: "application/json",
        ...headers,
    };

    if (body && !(body instanceof FormData)) {
        finalHeaders["Content-Type"] = "application/json";
    }

    if (auth) {
        const token = useTokenStore.getState().accessToken;
        if (token) {
            finalHeaders["X-Authorization"] = `Bearer ${token}`;
            finalHeaders["Authorization"] = `Bearer ${token}`;
        }
    }

    let res: any;

    try {
        res = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: finalHeaders,
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
        });
    } catch (err) {
        console.log("THIS IS THE ERR: ", err);
    }

    let data: any;
    console.log(data);
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        console.log("API ERROR: ", `${BASE_URL}${endpoint}`, "-->", res);
        throw new ApiError(res.status, data);
    }

    return data as T;
}
