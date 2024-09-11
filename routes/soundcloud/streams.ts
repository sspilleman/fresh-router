import { FreshContext, Handlers } from "$fresh/server.ts";
import { streams } from "$services/soundcloud/tracks.ts";
import { Unauthorized } from "$services/http.ts";

export const handler: Handlers = {
    async GET(req: Request, _ctx: FreshContext): Promise<Response> {
        console.log(_ctx);
        const track_id = new URL(req.url).searchParams.get("id");
        const response = await streams(parseInt(track_id as string, 10));
        if (response) {
            return new Response(
                JSON.stringify(response),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                },
            );
        } else {
            return new Response(Unauthorized.text, Unauthorized);
        }
    },
};

// curl http://localhost:8001/soundcloud/streams?id=83957632
