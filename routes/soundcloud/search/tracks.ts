import { FreshContext, Handlers } from "$fresh/server.ts";
import { tracks } from "$services/soundcloud/search.ts";
import { Json, NotFound } from "$services/http.ts";

export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
        const response = await tracks();
        if (response?.collection.length) {
            return new Response(
                JSON.stringify(response?.collection || []),
                Json,
            );
        } else {
            return new Response(NotFound.text, NotFound);
        }
    },
};

// curl http://localhost:8001/soundcloud/search/tracks
