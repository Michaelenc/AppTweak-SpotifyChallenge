import { useSelector } from "react-redux";
import { authSelectors } from "./containers/auth/selectors";
import { useGetTrackQuery } from "./api/apiSlice";
import { RootState } from "./store/store";

import "./TrackInformation.css";

function togglePlay() {
  let audioPlayer = document.getElementById("audioPreview");
  if (audioPlayer !== null && audioPlayer instanceof HTMLAudioElement) {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }
}
export default function TrackInformation({ imageHeight }: { imageHeight: number }) {
  const accessToken = useSelector(authSelectors.getAccessToken);
  const trackId = useSelector((state: RootState) => state.accountState.id);
  const { data: track } = useGetTrackQuery(trackId, {
    skip: !accessToken
  });
  if (track !== undefined) {
    return (
      <div id="TrackInfoContainer" style={{ marginBlockStart: imageHeight / 2 }}>
        <div id="TrackInfo">
          <img
            id="albumCover"
            loading="lazy"
            height={imageHeight}
            src={track.album.images.length > 0 ? track.album.images[0].url : "/no-cover.jpg"}
            alt={"Track album cover for " + track.name}
            draggable="false"
            style={{ top: -(imageHeight / 2) }}
          />
          <div style={{ minWidth: imageHeight * 2 }} id="TrackTextInfo">
            {track.preview_url !== null && (
              <div id="audioPlayer">
                <audio src={track.preview_url} id="audioPreview"></audio>
                <img
                  src="loudspeaker.png"
                  draggable="false"
                  id="loudspeakerIcon"
                  alt="loudspeaker icon"
                  onClick={togglePlay}
                  height={imageHeight / 2}
                  title={"Audio preview for " + track.name}
                />
              </div>
            )}
            <h3 style={{ paddingBlockStart: imageHeight / 2 }} id="TrackInfoTitle">
              <a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
                {track.name}
              </a>
            </h3>
            <p>
              Album:{" "}
              <a href={track.album.external_urls.spotify} target="_blank" rel="noreferrer">
                {track.album.name}
              </a>
            </p>
            <p>Released on: {track.album.release_date}</p>
            <p>
              {track.artists.length === 1 ? <>Artist: </> : <>Artists: </>}
              {track.artists.map((artist, index) => (
                <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
                  {artist.name}
                  {track.artists.length - 1 === index ? "" : ", "}
                </a>
              ))}
            </p>
            <p>
              Duration:{" "}
              {String(Math.floor(track.duration_ms / (60 * 1000))).padStart(2, "0") +
                ":" +
                String(Math.floor((track.duration_ms % (60 * 1000)) / 1000)).padStart(2, "0")}
            </p>
            {track.available_markets.length > 0 && (
              <p>Available in: {track.available_markets.join(", ")}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
