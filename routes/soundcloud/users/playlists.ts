import { FreshContext, Handlers } from "$fresh/server.ts";
import { playlists } from "$services/soundcloud/users.ts";
import { Json, NotFound } from "$services/http.ts";

export const handler: Handlers = {
    async GET(req: Request, _ctx: FreshContext): Promise<Response> {
        const user_id = new URL(req.url).searchParams.get("user_id");
        const response = await playlists(user_id as string);
        if (response) {
            return new Response(JSON.stringify(response), Json);
        } else {
            return new Response(NotFound.text, NotFound);
        }
    },
};

// curl http://localhost:8001/soundcloud/users/playlists\?user_id\=229737
