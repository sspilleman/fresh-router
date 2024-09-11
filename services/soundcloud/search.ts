import type { SearchResponse } from "./interfaces.ts";
import { getHeaders } from "$services/soundcloud/oauth.ts";
import { base } from "$services/soundcloud/const.ts";

export const tracks = async () => {
    const headers = await getHeaders();
    const params = new URLSearchParams();
    params.set("q", "Tytanium Sessions");
    params.set("order", "hotness");
    params.set("genres", "Trance,trance,TRANCE");
    params.set("access", "playable");
    params.set("limit", "100");
    params.set("linked_partitioning", "true");
    params.set("duration[from]", `${1200 * 1000}`);
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
