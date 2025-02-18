import { createHandler, ServeHandlerInfo } from "$fresh/server.ts";
import manifest from "../fresh.gen.ts";
import config from "../fresh.config.ts";
import { assertEquals, assertExists } from "jsr:@std/assert";
import { tracks } from "$services/soundcloud/search.ts";
import { load } from "jsr:@std/dotenv";

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
  completed: new Promise((r) => r()),
};

const searchObj = {
  q: "alexander popov",
  genres: "Trance,trance,TRANCE",
  limit: "5",
  linked_partitioning: "true",
};

Deno.test("SEARCH test", async (t) => {
  await load({ envPath: "./.env", export: true });
  const { CLIENT_ID, CLIENT_SECRET } = Deno.env.toObject();
  if (!CLIENT_ID) console.log({ CLIENT_ID, CLIENT_SECRET });
  const handler = await createHandler(manifest, config);

  await t.step("#1 search: HTTP", async () => {
    const req = new Request("http://127.0.0.1/soundcloud/search/tracks", {
      method: "POST",
      body: JSON.stringify(searchObj),
    });
    const resp = await handler(req, CONN_INFO);
    assertEquals(resp.status, 200);
    const tracks = await resp.json();
    assertExists(tracks);
    assertEquals(tracks.length, 5);
  });

  await t.step("#2 search: BACKEND", async () => {
    const params = new URLSearchParams(searchObj);
    const _tracks = await tracks(params);
    assertExists(_tracks);
    assertExists(_tracks.collection);
    assertEquals(_tracks.collection.length, 5);
  });
});
