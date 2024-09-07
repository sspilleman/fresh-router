#!/bin/bash
TIMESTAMP=`date "+%Y-%m-%dT%H-%M-%S"`
echo $TIMESTAMP
git add .
git commit -m "${TIMESTAMP}"
git push origin

# https://fresh-router.deno.dev
# curl https://fresh-router.deno.dev/soundcloud/search
# curl https://fresh-router.deno.dev/soundcloud/stream\?url\=https://api.soundcloud.com/tracks/453489375/stream
