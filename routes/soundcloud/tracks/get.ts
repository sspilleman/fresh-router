import { FreshContext, Handlers } from "$fresh/server.ts";
import { get } from "$services/soundcloud/tracks.ts";
import { Json, NotFound } from "$services/http.ts";

export const handler: Handlers = {
    async GET(req: Request, _ctx: FreshContext): Promise<Response> {
        const track_id = new URL(req.url).searchParams.get("track_id");
        const response = await get(track_id as string);
        if (response) {
            return new Response(JSON.stringify(response), Json);
        } else {
            return new Response(NotFound.text, NotFound);
        }
    },
};

// curl http://localhost:8001/soundcloud/tracks/streams\?track_id\=83957632
