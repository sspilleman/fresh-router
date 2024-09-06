import { encodeBase64 } from "./base64.ts";
import { type AuthorizeResponse, type SearchResponse } from "./interfaces.ts";

const CLIENT_ID = Deno.env.get("CLIENT_ID") as string;
const CLIENT_SECRET = Deno.env.get("CLIENT_SECRET") as string;
console.log(Deno.env.toObject());
console.log({ CLIENT_ID, CLIENT_SECRET });
const kv = await Deno.openKv();

export const getHeaders = async () => {
    let found = false;
    if (!found) {
        const headers = await kv.get<HeadersInit>(["soundcloud", "headers"]);
        if (headers.value) {
            console.log("existing");
            found = true;
            return headers.value;
        }
    }
    if (!found) {
        const refresh_token = await kv.get<string>([
            "soundcloud",
            "refresh_token",
        ]);
        if (refresh_token.value) {
            const { token_type, access_token, expires_in } = await refresh(
                CLIENT_ID,
                CLIENT_SECRET,
                refresh_token.value,
            );
            if (access_token) {
                const expireIn = 1000 * expires_in;
                const headers: HeadersInit = {
                    accept: "application/json; charset=utf-8",
                    Authorization: `${token_type} ${access_token}`,
                };
                kv.set(["soundcloud", "headers"], headers, { expireIn });
                kv.set(["soundcloud", "refresh_token"], refresh_token);
                found = true;
                console.log("refresh");
                return headers;
            }
        }
    }
    if (!found) {
        const { token_type, access_token, expires_in, refresh_token } =
            await authorize(
                CLIENT_ID,
                CLIENT_SECRET,
            );
        if (access_token) {
            const expireIn = 1000 * expires_in;
            const headers: HeadersInit = {
                accept: "application/json; charset=utf-8",
                Authorization: `${token_type} ${access_token}`,
            };
            kv.set(["soundcloud", "headers"], headers, { expireIn });
            kv.set(["soundcloud", "refresh_token"], refresh_token);
            found = true;
            console.log("new");
            return headers;
        }
    }
};

export const authorize = async (
    client_id: string,
    client_secret: string,
): Promise<AuthorizeResponse> => {
    const b64 = encodeBase64(`${client_id}:${client_secret}`);
    const body = new URLSearchParams();
    body.set("grant_type", "client_credentials");
    const r = await fetch(
        "https://secure.soundcloud.com/oauth/token",
        {
            method: "POST",
            headers: {
                "accept": "application/json; charset=utf-8",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${b64}`,
            },
            body,
        },
    );
    if (r.ok) {
        const json: AuthorizeResponse = await r.json();
        return json;
    }
    return {} as AuthorizeResponse;
};

export const refresh = async (
    client_id: string,
    client_secret: string,
    refresh_token: string,
): Promise<AuthorizeResponse> => {
    const body = new URLSearchParams();
    body.set("grant_type", "refresh_token");
    body.set("client_id", client_id);
    body.set("client_secret", client_secret);
    body.set("refresh_token", refresh_token);
    const r = await fetch(
        "https://secure.soundcloud.com/oauth/token",
        {
            method: "POST",
            headers: {
                "accept": "application/json; charset=utf-8",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        },
    );
    if (r.ok) {
        const json: AuthorizeResponse = await r.json();
        return json;
    }
    return {} as AuthorizeResponse;
};

export const search = async () => {
    const headers = await getHeaders();
    const params = new URLSearchParams();
    params.set("q", "popov");
    params.set("order", "hotness");
    params.set("genres", "Trance,trance,TRANCE");
    params.set("access", "playable");
    params.set("limit", "100");
    params.set("linked_partitioning", "true");
    params.set("duration[from]", `${1200 * 1000}`);
    const r = await fetch(
        `https://api.soundcloud.com/tracks?${params.toString()}`,
        { method: "GET", headers },
    );
    if (r.ok) {
        const json: SearchResponse = await r.json();
        return json;
    }
};

export const stream = async (url: string) => {
    const headers = await getHeaders();
    const r = await fetch(url, { method: "GET", headers });
    if (r.ok) return r.url;
};
