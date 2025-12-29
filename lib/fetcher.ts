import { BASE_URL } from "@/constants/uri";
import { useTokenStore } from "@/store/auth";

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
    dontParseJson?: boolean;
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

    console.log("Body", body);

    try {
        res = await fetch(`${BASE_URL}/api${endpoint}`, {
            method,
            headers: finalHeaders,
            body: body
                ? options.dontParseJson
                    ? body
                    : JSON.stringify(body)
                : undefined,
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
        console.log("API ERROR: ", `${BASE_URL}${endpoint}`, "-->", data);
        throw new ApiError(res.status, data);
    }

    return data as T;
}
