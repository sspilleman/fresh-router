import { getHeaders } from "$services/soundcloud/oauth.ts";
import { base } from "$services/soundcloud/const.ts";
import type {
    Track,
    TracksStreamsResponse,
} from "$services/soundcloud/interfaces.ts";

export const streams = async (
    track_id: string,
): Promise<TracksStreamsResponse | undefined> => {
    const headers = await getHeaders();
    const r = await fetch(`${base}/tracks/${track_id}/streams`, {
        method: "GET",
        headers,
    });
    if (r.ok) {
        return await r.json();
    } else {
        console.log(r);
        return undefined;
    }
};

export const related = async (
    track_id: string,
): Promise<Track[] | undefined> => {
    const headers = await getHeaders();
    const r = await fetch(`${base}/tracks/${track_id}/related`, {
        method: "GET",
        headers,
    });
    if (r.ok) {
        return await r.json();
    } else {
        console.log(r);
        return undefined;
    }
};

export const get = async (
    track_id: string,
): Promise<Track | undefined> => {
    const headers = await getHeaders();
    const r = await fetch(`${base}/tracks/${track_id}`, {
        method: "GET",
        headers,
    });
    if (r.ok) {
        return await r.json();
    } else {
        console.log(r);
        return undefined;
    }
};
