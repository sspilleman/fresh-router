import { getHeaders } from "$services/soundcloud/oauth.ts";
import { base } from "$services/soundcloud/const.ts";
import type { TracksStreamsResponse } from "$services/soundcloud/interfaces.ts";

export const streams = async (
    track_id: number,
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

// const response = await streams(83957632)
// console.log(response);
