import type { SearchResponse } from "./interfaces.ts";
import { getHeaders } from "$services/soundcloud/oauth.ts";
import { base } from "$services/soundcloud/const.ts";

export const tracks = async (params: URLSearchParams) => {
    const headers = await getHeaders();
    const r = await fetch(
        `${base}/tracks?${params.toString()}`,
        { method: "GET", headers },
    );
    if (r.ok) {
        return await r.json() as SearchResponse;
    } else {
        console.log(r);
        return undefined;
    }
};
