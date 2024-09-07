import { encodeBase64 } from "./base64.ts";
import { kv } from "$connections/kv.ts";
import { type AuthorizeResponse, type SearchResponse } from "./interfaces.ts";

const kvkeys = {
    headers: ["soundcloud", "headers"],
    expires_in: ["soundcloud", "expires_in"],
    refresh_token: ["soundcloud", "refresh_token"],
};

// console.log("object", Deno.env.toObject());
// console.log("build", Deno.build);
const { CLIENT_ID, CLIENT_SECRET } = Deno.env.toObject();
console.log({ CLIENT_ID, CLIENT_SECRET });

export const getHeaders = async () => {
    let found = false;
    const now = new Date().getTime();
    const expiry_date = await kv.get<number>(kvkeys.expires_in);
    const expired = expiry_date.value ? expiry_date.value < now : true;
    if (!expired) {
        // Get existing headers
        const existing = await kv.get<HeadersInit>(kvkeys.headers);
        if (existing.value) {
            found = true;
            console.log("existing");
            return existing.value;
        }
    }
    if (!found) {
        // Get by refresh token
        const existing = await kv.get<string>(kvkeys.refresh_token);
        if (existing.value) {
            const { token_type, access_token, refresh_token, expires_in } =
                await refresh(
                    CLIENT_ID,
                    CLIENT_SECRET,
                    existing.value,
                );
            if (access_token) {
                const expireIn = now + (1000 * Math.ceil(expires_in / 2));
                const headers: HeadersInit = {
                    accept: "application/json; charset=utf-8",
                    Authorization: `${token_type} ${access_token}`,
                };
                await kv.set(kvkeys.headers, headers);
                await kv.set(kvkeys.refresh_token, refresh_token);
                await kv.set(kvkeys.expires_in, expireIn);
                found = true;
                console.log("refresh");
                return headers;
            }
        }
    }
    if (!found) {
        // Get new tokens
        const { token_type, access_token, refresh_token, expires_in } =
            await authorize(
                CLIENT_ID,
                CLIENT_SECRET,
            );
        if (access_token) {
            const expireIn = now + (1000 * Math.ceil(expires_in / 2));
            const headers: HeadersInit = {
                accept: "application/json; charset=utf-8",
                Authorization: `${token_type} ${access_token}`,
            };
            await kv.set(kvkeys.headers, headers);
            await kv.set(kvkeys.refresh_token, refresh_token);
            await kv.set(kvkeys.expires_in, expireIn);
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
    } else {
        console.log(r);
        return {} as AuthorizeResponse;
    }
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
    } else {
        console.log(r);
        return {} as AuthorizeResponse;
    }
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
    } else {
        console.log(r);
        return undefined;
    }
};

export const stream = async (url: string) => {
    const headers = await getHeaders();
    const r = await fetch(url, { method: "GET", headers });
    if (r.ok) return r.url;
    else {
        console.log(r);
        return undefined;
    }
};
