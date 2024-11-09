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
import { get, related, streams } from "$services/soundcloud/tracks.ts";
import { load } from "jsr:@std/dotenv";

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
};

Deno.test("TRACKS test", async (t) => {
  await load({ envPath: "./.env", export: true });
  const { CLIENT_ID, CLIENT_SECRET } = Deno.env.toObject();
  if (!CLIENT_ID) console.log({ CLIENT_ID, CLIENT_SECRET });

  const handler = await createHandler(manifest, config);

  await t.step("#1 streams: HTTP", async () => {
    const resp = await handler(
      new Request(
        "http://127.0.0.1/soundcloud/tracks/streams?track_id=83957632",
      ),
      CONN_INFO,
    );
    assertEquals(resp.status, 200);
    const json = await resp.json();
    assertExists(json);
    assertMatch(
      json.http_mp3_128_url,
      /^https:\/\/cf-media.sndcdn.com\//,
    );
  });

  await t.step("#2 streams: BACKEND", async () => {
    const resp = await streams("83957632");
    assertExists(resp);
    assertMatch(
      resp.http_mp3_128_url,
      /^https:\/\/cf-media.sndcdn.com\//,
    );
  });

  await t.step("#3 related: HTTP", async () => {
    const resp = await handler(
      new Request(
        "http://127.0.0.1/soundcloud/tracks/related?track_id=83957632",
      ),
      CONN_INFO,
    );
    assertEquals(resp.status, 200);
    const json = await resp.json();
    assertExists(json);
    assertGreater(json.length, 0);
  });

  await t.step("#4 related: BACKEND", async () => {
    const _related = await related("83957632");
    assertExists(_related);
    assertGreater(_related.length, 0);
  });

  await t.step("#5 get: HTTP", async () => {
    const resp = await handler(
      new Request(
        "http://127.0.0.1/soundcloud/tracks/get?track_id=83957632",
      ),
      CONN_INFO,
    );
    assertEquals(resp.status, 200);
    const json = await resp.json();
    assertExists(json);
    assertEquals(json.title, "Sean Tyas pres. Tytanium Sessions Episode 072");
  });

  await t.step("#6 get: BACKEND", async () => {
    const _track = await get("83957632");
    assertExists(_track);
    assertEquals(_track.title, "Sean Tyas pres. Tytanium Sessions Episode 072");
  });
});
