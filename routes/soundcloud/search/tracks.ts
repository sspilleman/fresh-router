import { FreshContext, Handlers } from "$fresh/server.ts";
import { tracks } from "$services/soundcloud/search.ts";
import { Json, NotFound } from "$services/http.ts";

export const handler: Handlers = {
  async POST(req: Request, _ctx: FreshContext): Promise<Response> {
    const params = new URLSearchParams(await req.json());
    // console.log(params);
    // params.delete("q");
    // params.set("linked_partitioning", "true");
    // params.set("access", "playable");
    const response = await tracks(params);
    // console.log(response);
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

// const params = new URLSearchParams(obj);
// console.log(params.toString());

// curl http://localhost:8001/soundcloud/search/tracks
