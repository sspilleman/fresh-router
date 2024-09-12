export interface AuthorizeResponse {
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export interface TracksStreamsResponse {
    http_mp3_128_url: string;
    hls_mp3_128_url: string;
    preview_mp3_128_url: string;
}

export interface User {
    avatar_url: string;
    city: string | null;
    comments_count: number;
    country: string | null;
    created_at: string;
    description: string | null;
    discogs_name: string | null;
    first_name: string | null;
    followers_count: number;
    followings_count: number;
    full_name: string;
    id: number;
    kind: "user";
    last_modified: string;
    last_name: string | null;
    likes_count: number;
    myspace_name: null;
    online: false;
    permalink_url: string;
    permalink: string;
    plan: "Free" | "Pro Unlimited";
    playlist_count: number;
    public_favorites_count: number;
    reposts_count: number;
    subscriptions: unknown;
    track_count: number;
    uri: string;
    username: string;
    website_title: string | null;
    website: string | null;
}

export interface Track {
    access: "playable";
    artwork_url: string | null;
    available_country_codes: null;
    bpm: number | null;
    comment_count: number | null;
    commentable: boolean;
    created_at: string;
    description: string | null;
    download_count: number | null;
    download_url: string | null;
    downloadable: boolean;
    duration: number;
    embeddable_by: "all";
    favoritings_count: number | null;
    genre: string;
    id: number;
    isrc: string | null;
    key_signature: string | null;
    kind: "track";
    label_name: string | null;
    license: "all-rights-reserved" | "cc-by-nc-sa";
    monetization_model: null;
    permalink_url: string;
    playback_count: number | null;
    policy: null;
    purchase_title: string | null;
    purchase_url: string | null;
    release_day: number | null;
    release_month: number | null;
    release_year: number | null;
    release: string | null;
    reposts_count: number | null;
    secret_uri: null;
    sharing: "public";
    stream_url: string;
    streamable: boolean;
    tag_list: string;
    title: string;
    uri: string;
    user_favorite: null;
    user_playback_count: number | null;
    user: User;
    waveform_url: string;
}

export interface SearchResponse {
    collection: Track[];
    next_href: string;
}

export interface Playlist {
    artwork_url: string | null;
    created_at: string;
    description: string | null;
    downloadable: null;
    duration: number;
    ean: string | null;
    embeddable_by: "all";
    genre: string;
    id: number;
    kind: "playlist";
    label_id: null;
    label_name: string | null;
    label: null;
    last_modified: string;
    license: "all-rights-reserved";
    likes_count: number;
    permalink_url: string;
    permalink: string;
    playlist_type: string;
    purchase_title: string | null;
    purchase_url: string | null;
    release_day: number | null;
    release_month: number | null;
    release_year: number | null;
    release: null;
    sharing: "public";
    streamable: true;
    tag_list: string;
    tags: string;
    title: string;
    track_count: number;
    tracks_uri: string;
    tracks: Track[];
    type: string;
    uri: string;
    user_id: number;
    user: User;
}
