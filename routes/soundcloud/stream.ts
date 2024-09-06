import { FreshContext, Handlers } from "$fresh/server.ts";
import { stream } from "$services/soundcloud.ts";

export const handler: Handlers = {
    async GET(req: Request, _ctx: FreshContext): Promise<Response> {
        const requestUrl = new URL(req.url);
        const url = requestUrl.searchParams.get("url") as string;
        const link = await stream(url);
        return new Response(JSON.stringify({ url: link }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    },
};
