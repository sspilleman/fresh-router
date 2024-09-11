import { FreshContext, Handlers } from "$fresh/server.ts";
import {
    languages_translate,
    translate,
    translateCode as tc,
    type TranslateResponse,
} from "$services/language.ts";
import { Json } from "$services/http.ts";

export const handler: Handlers = {
    async POST(req: Request, _ctx: FreshContext): Promise<Response> {
        const { src, dst, q } = await req.json();
        const response = {} as TranslateResponse;
        if (dst === undefined) {
            const filtered = languages_translate.filter((l) =>
                l.code !== src &&
                l.language !== "auto detect"
            );
            for (const l of filtered) {
                response[l.language] = await translate(src, l.code, q);
            }
        } else {
            response[tc(dst)] = await translate(src, dst, q);
        }
        return new Response(JSON.stringify(response), Json);
    },
};

// curl -X POST http://localhost:8001/language/translate -H 'Content-Type:application/json' -d '{"src": "en", "dst": "it", "q": "slut"}'
// curl -X POST http://localhost:8001/language/translate -H 'Content-Type:application/json' -d '{"src": "en", "q": "slut"}'
