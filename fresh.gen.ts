// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $index from "./routes/index.tsx";
import * as $language_translate from "./routes/language/translate.ts";
import * as $soundcloud_search_tracks from "./routes/soundcloud/search/tracks.ts";
import * as $soundcloud_tracks_get from "./routes/soundcloud/tracks/get.ts";
import * as $soundcloud_tracks_related from "./routes/soundcloud/tracks/related.ts";
import * as $soundcloud_tracks_streams from "./routes/soundcloud/tracks/streams.ts";
import * as $soundcloud_users_playlists from "./routes/soundcloud/users/playlists.ts";

import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/index.tsx": $index,
    "./routes/language/translate.ts": $language_translate,
    "./routes/soundcloud/search/tracks.ts": $soundcloud_search_tracks,
    "./routes/soundcloud/tracks/get.ts": $soundcloud_tracks_get,
    "./routes/soundcloud/tracks/related.ts": $soundcloud_tracks_related,
    "./routes/soundcloud/tracks/streams.ts": $soundcloud_tracks_streams,
    "./routes/soundcloud/users/playlists.ts": $soundcloud_users_playlists,
  },
  islands: {},
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
