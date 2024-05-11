type ExternalUrlsObject = {
  spotify: string;
};

type ImageObject = {
  url: string;
  height: number;
  width: number;
};

export type User = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enable: boolean;
    filter_locked: boolean;
  };
  external_urls: ExternalUrlsObject;
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: ImageObject[];
  product: string;
  type: string;
  uri: string;
};

export type SpotifyPlaylistItem = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrlsObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: {
    external_urls: ExternalUrlsObject;
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};

export type SpotifyPlaylist = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SpotifyPlaylistItem[];
};

type AlbumObject = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrlsObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: {
    external_urls: ExternalUrlsObject;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
};

type ArtistObject = {
  external_urls: ExternalUrlsObject;
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type TrackObject = {
  album: AlbumObject;
  artists: ArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: ExternalUrlsObject;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type EpisodeObject = {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlsObject;
  href: string;
  id: string;
  images: ImageObject[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  type: string;
  uri: string;
  restrictions: {
    reason: string;
  };
  show: {
    available_markets: string[];
    copyrights: {
      text: string;
      type: string;
    }[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrlsObject;
    href: string;
    id: string;
    images: ImageObject[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: string;
    uri: string;
    total_episodes: number;
  };
};
export type SpotifySongItem = {
  added_at: string;
  added_by: {
    external_urls: ExternalUrlsObject;
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  track: TrackObject | EpisodeObject;
};
export type SpotifyTrack = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SpotifySongItem[];
};
export type SpotifyTrackItem = TrackObject;
