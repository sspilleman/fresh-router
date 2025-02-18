import { Client } from "npm:@elastic/elasticsearch";

const elasticsearch = new Client({
  nodes: ["http://beast:9201", "http://beast:9202", "http://beast:9203"],
  // nodes: ["http://localhost:9201", "http://localhost:9202", "http://localhost:9203"],
  maxRetries: 2,
  requestTimeout: 10 * 60 * 1000,
});

import { tracks } from "../soundcloud/search.ts";

const params = new URLSearchParams();
// params.set("q", "Armin van Buuren");
params.set("q", "John O'Callaghan");
// params.set("q", "popov");
// params.set("q", "ottaviani");
// params.set("q", "Gareth Emery");
params.set("limit", "50");
params.set("order", "created_at");
params.set("linked_partitioning", "true");
// params.append("duration[from]", "1200000");
// params.append("duration[to]", "2400000");
for (let minutes = 0; minutes <= 2 * 3600; minutes += 5) {
  const from = minutes * 1000;
  const to = (minutes + 5) * 1000;
  params.set("duration[from]", `${from}`);
  params.set("duration[to]", `${to}`);
  for (let page = 0; page < 6; page++) {
    params.set("offset", `${page * 50}`);
    const _tracks = await tracks(params);
    console.log(minutes, page, _tracks?.collection.length);
    if (_tracks && _tracks.collection.length > 0) {
      const operations = _tracks.collection.flatMap((doc) => [
        {
          update: {
            _index: "soundcloud",
            _id: doc.id,
            retry_on_conflict: 3,
          },
        },
        {
          doc,
          doc_as_upsert: true,
        },
      ]);
      await elasticsearch.bulk({ operations });
      //   for (const doc of _tracks.collection) {
      //     await elasticsearch.update({
      //       index: "soundcloud",
      //       id: `${doc.id}`,
      //       doc,
      //       doc_as_upsert: true,
      //     });
      //   }
    }
    if (!_tracks?.next_href) page = 6;
  }
}

// next_href: "https://api.soundcloud.com/tracks?linked_partitioning=true&offset=5&q=alexander%20popov&genres=Trance%2Ctrance%2CTRANCE&limit=5&access=playable"
