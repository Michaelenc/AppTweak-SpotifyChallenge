import { useSelector } from "react-redux";
import { authSelectors } from "./containers/auth/selectors";
import { useGetEpisodeQuery } from "./api/apiSlice";
import { RootState } from "./store/store";

import "./EpisodeInformation.css";

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
export default function EpisodeInformation({ imageHeight }: { imageHeight: number }) {
  const accessToken = useSelector(authSelectors.getAccessToken);
  const episodeId = useSelector((state: RootState) => state.accountState.id);
  const { data: episode } = useGetEpisodeQuery(episodeId, {
    skip: !accessToken
  });
  if (episode !== undefined) {
    return (
      <div id="EpisodeInfoContainer" style={{ marginBlockStart: imageHeight / 2 }}>
        <div id="EpisodeInfo">
          <img
            id="showCover"
            loading="lazy"
            height={imageHeight}
            src={episode.images.length > 0 ? episode.images[0].url : "/no-cover.jpg"}
            alt={"Episode cover for " + episode.name}
            draggable="false"
            style={{ top: -(imageHeight / 2) }}
          />
          <div style={{ minWidth: imageHeight * 2 }} id="EpisodeTextInfo">
            {episode.audio_preview_url !== null && (
              <div id="audioPlayer">
                <audio src={episode.audio_preview_url} id="audioPreview"></audio>
                <img
                  src="loudspeaker.png"
                  draggable="false"
                  id="loudspeakerIcon"
                  alt="loudspeaker icon"
                  onClick={togglePlay}
                  height={imageHeight / 2}
                  title={"Audio preview for " + episode.name}
                />
              </div>
            )}
            <h3 style={{ paddingBlockStart: imageHeight / 2 }} id="EpisodeInfoTitle">
              <a href={episode.external_urls.spotify} target="_blank" rel="noreferrer">
                {episode.name}
              </a>
            </h3>
            <p>
              Show:{" "}
              <a href={episode.show.external_urls.spotify} target="_blank" rel="noreferrer">
                {episode.show.name}
              </a>
            </p>
            <p>Released on: {episode.release_date}</p>
            <p>
              Duration:{" "}
              {String(Math.floor(episode.duration_ms / (60 * 1000))).padStart(2, "0") +
                ":" +
                String(Math.floor((episode.duration_ms % (60 * 1000)) / 1000)).padStart(2, "0")}
            </p>
            <p>Description: {episode.description}</p>
            {episode.show.languages.length > 0 && (
              <p>
                {episode.show.languages.length > 1 ? "Languages: " : "Language: "}:{" "}
                {episode.show.languages.join(", ")}
              </p>
            )}
            {episode.show.available_markets.length > 0 && (
              <p>Available in: {episode.show.available_markets.join(", ")}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
