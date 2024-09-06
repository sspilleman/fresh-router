import { FreshContext, Handlers } from "$fresh/server.ts";
import { search } from "$services/soundcloud.ts";

export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
        const tracks = await search();
        console.log("tracks", tracks?.collection.length);
        return new Response(JSON.stringify(tracks?.collection), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    },
};
