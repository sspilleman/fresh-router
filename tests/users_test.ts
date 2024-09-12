// deno-lint-ignore-file no-unused-vars
import { createHandler, ServeHandlerInfo } from "$fresh/server.ts";
import manifest from "../fresh.gen.ts";
import config from "../fresh.config.ts";
import {
  assert,
  assertEquals,
  assertExists,
  assertGreater,
  assertMatch,
} from "jsr:@std/assert";
import { playlists } from "$services/soundcloud/users.ts";
import { load } from "jsr:@std/dotenv";

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
};

Deno.test("USERS test", async (t) => {
  await load({ envPath: "./.env", export: true });
  const { CLIENT_ID, CLIENT_SECRET } = Deno.env.toObject();
  if (!CLIENT_ID) console.log({ CLIENT_ID, CLIENT_SECRET });

  const handler = await createHandler(manifest, config);

  await t.step("#1 playlists: HTTP", async () => {
    const resp = await handler(
      new Request(
        "http://127.0.0.1/soundcloud/users/playlists?user_id=229737",
      ),
      CONN_INFO,
    );
    assertEquals(resp.status, 200);
    const json = await resp.json();
    assertExists(json);
    assertGreater(json.length, 0);
  });

  await t.step("#2 playlists: BACKEND", async () => {
    const resp = await playlists("229737");
    // console.log(resp);
    assertExists(resp);
    assertGreater(resp.length, 0);
  });
});
