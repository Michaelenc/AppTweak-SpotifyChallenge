import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import {
  EpisodeObject,
  SpotifyPlaylist,
  SpotifyTrack,
  SpotifyTrackItem,
  TrackObject,
  User,
} from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authentication.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
    getPlaylists: builder.query<SpotifyPlaylist, void>({
      query: () => ({
        url: "/me/playlists",
        method: "GET",
      }),
    }),
    getPlaylistTracks: builder.query<SpotifyTrack, string>({
      query: (playlistRef) => ({
        url: `${playlistRef}`,
        method: "GET",
      }),
    }),
    getSearchTrackResult: builder.query<SpotifyTrackItem[], string>({
      query: (search) => ({
        url: `/search?q=${search}&type=track`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.tracks.items;
      },
    }),
    getTrack: builder.query<TrackObject, string>({
      query: (trackId) => ({
        url: `/tracks/${trackId}`,
        method: "GET",
      }),
    }),
    getEpisode: builder.query<EpisodeObject, string>({
      query: (episodeId) => ({
        url: `/episodes/${episodeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetPlaylistsQuery,
  useGetPlaylistTracksQuery,
  useGetSearchTrackResultQuery,
  useGetTrackQuery,
  useGetEpisodeQuery
} = apiSlice;

export default apiSlice.reducer;
