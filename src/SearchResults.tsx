import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useGetSearchTrackResultQuery } from "./api/apiSlice";
import { authSelectors } from "./containers/auth/selectors";
import { SpotifyTrackItem } from "./types";

import "./SearchResults.css";
import { track } from "./song/songSlice";

function Song({ trackItem, imageHeight }: { trackItem: SpotifyTrackItem; imageHeight: number }) {
  const dispatch = useDispatch();
  return (
    <div className="song" onClick={() => dispatch(track(trackItem.id))}>
      <img
        loading="lazy"
        height={imageHeight}
        src={trackItem.album.images.length > 0 ? trackItem.album.images[0].url : "/no-cover.jpg"}
        alt={"Album cover for " + trackItem.name}
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
}

export default function SearchResults({ imageHeight }: { imageHeight: number }) {
  const accessToken = useSelector(authSelectors.getAccessToken);
  const searchQuery = useSelector((state: RootState) => state.accountState.id);
  const { data: queryMatches } = useGetSearchTrackResultQuery(searchQuery, {
    skip: !accessToken
  });
  console.log(queryMatches);
  if (queryMatches !== undefined) {
    return (
      <div id="searchResults">
        {queryMatches.map((match) => (
          <Song key={match.id} trackItem={match} imageHeight={imageHeight} />
        ))}
      </div>
    );
  }
}
