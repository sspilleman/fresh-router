import { FreshContext, Handlers } from "$fresh/server.ts";
import { search } from "$services/soundcloud.ts";
import { kv } from "$connections/kv.ts";

export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
        const existing = await kv.get<HeadersInit>(["soundcloud", "search"]);
        if (existing.value) {
            console.log("existing search");
            return new Response(JSON.stringify(existing.value), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
        const tracks = await search();
        console.log("tracks", tracks?.collection.length);
        await kv.set(["soundcloud", "search"], tracks?.collection);
        return new Response(JSON.stringify(tracks?.collection), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    },
};
