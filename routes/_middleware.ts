import { FreshContext } from "$fresh/server.ts";

const allow =
    "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With";

export async function handler(req: Request, ctx: FreshContext) {
    const origin = req.headers.get("Origin") || "*";
    if (req.method == "OPTIONS") {
        const resp = new Response(null, { status: 204 });
        const headers = resp.headers;
        headers.set("Access-Control-Allow-Origin", origin);
        headers.set("Access-Control-Allow-Methods", req.method);
        return resp;
    }
    const resp = await ctx.next();
    const headers = resp.headers;
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", req.method);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Access-Control-Allow-Headers", allow);
    return resp;
}
