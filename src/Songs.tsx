import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "./containers/auth/selectors";
import { RootState } from "./store/store";
import { useGetPlaylistTracksQuery } from "./api/apiSlice";
import { EpisodeObject, SpotifySongItem, TrackObject } from "./types";

import "./Songs.css";
import { episode, track } from "./song/songSlice";

function Song({ songItem, imageHeight }: { songItem: SpotifySongItem; imageHeight: number }) {
  const dispatch = useDispatch();
  console.log(songItem);
  if ("album" in songItem.track) {
    const trackItem = songItem.track as TrackObject;
    return (
      <div className="song" onClick={() => dispatch(track(trackItem.id))}>
        <img
          loading="lazy"
          height={imageHeight}
          src={trackItem.album.images.length > 0 ? trackItem.album.images[0].url : "/no-cover.jpg"}
          alt={"Track album cover for " + trackItem.name}
          draggable="false"
        />
        <h3>{trackItem.name}</h3>
        <div className="trackInfo albumTrack">
          <div>
            <p className="statDescription">Duration</p>
            <p>
              {String(Math.floor(trackItem.duration_ms / (60 * 1000))).padStart(2, "0") +
                ":" +
                String(Math.floor((trackItem.duration_ms % (60 * 1000)) / 1000)).padStart(2, "0")}
            </p>
          </div>
          <div>
            <p className="statDescription">Album</p>
            <a href={trackItem.album.external_urls.spotify} target="_blank" rel="noreferrer">
              {trackItem.album.name}
            </a>
          </div>
          {trackItem.artists.length > 0 && trackItem.artists[0].name && (
            <div>
              {trackItem.artists.length === 1 ? (
                <p className="statDescription">Artist</p>
              ) : (
                <p className="statDescription">Artists</p>
              )}
              <p>
                {trackItem.artists.map((artist, index) => (
                  <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
                    {artist.name}
                    {trackItem.artists.length - 1 === index ? "" : ", "}
                  </a>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    const episodeItem = songItem.track as EpisodeObject;
    return (
      <div className="song" onClick={() => dispatch(episode(episodeItem.id))}>
        <img
          loading="lazy"
          height={imageHeight}
          src={episodeItem.images.length > 0 ? episodeItem.images[0].url : "/no-cover.jpg"}
          alt={"Episode show cover for " + episodeItem.name}
          draggable="false"
        />
        <h3>{songItem.track.name}</h3>
        <div className="trackInfo showEpisode">
          <p>
            {String(Math.floor(episodeItem.duration_ms / (60 * 1000))).padStart(2, "0") +
              ":" +
              String(Math.floor((episodeItem.duration_ms % (60 * 1000)) / 1000)).padStart(2, "0")}
          </p>
          <a href={episodeItem.show.external_urls.spotify} target="_blank" rel="noreferrer">
            {episodeItem.show.name}
          </a>
        </div>
      </div>
    );
  }
}
export default function Songs({ imageHeight }: { imageHeight: number }) {
  const accessToken = useSelector(authSelectors.getAccessToken);
  const playlistId = useSelector((state: RootState) => state.accountState.id);
  const { data: songs } = useGetPlaylistTracksQuery("/playlists/" + playlistId + "/tracks", {
    skip: !accessToken
  });
  if (songs !== undefined) {
    return (
      <>
        <h1>Playlist</h1>
        <div id="songs">
          {songs.items.map((songItem) => (
            <Song key={songItem.track.id} songItem={songItem} imageHeight={imageHeight} />
          ))}
        </div>
      </>
    );
  }
}
