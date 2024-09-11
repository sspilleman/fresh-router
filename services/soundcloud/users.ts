import { getHeaders } from "$services/soundcloud/oauth.ts";
import { base } from "$services/soundcloud/const.ts";
import type { TracksStreamsResponse } from "$services/soundcloud/interfaces.ts";

export const playlists = async (
    user_id: string,
): Promise<TracksStreamsResponse | undefined> => {
    const headers = await getHeaders();
    const r = await fetch(`${base}/users/${user_id}/playlists`, {
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

const response = await playlists("229737");
// console.log(response);
await Deno.writeTextFile(
    "./services/soundcloud/users_playlists.json",
    JSON.stringify(response, undefined, "  "),
);
