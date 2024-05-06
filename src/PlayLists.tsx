import { useSelector, useDispatch } from "react-redux";
import { useGetPlaylistsQuery } from "./api/apiSlice";
import { authSelectors } from "./containers/auth/selectors";
import { SpotifyPlaylistItem } from "./types";
import { playlist } from "./song/songSlice";

import "./PlayLists.css";

function PlayList({
  spotify_playlist,
  imageHeight
}: {
  spotify_playlist: SpotifyPlaylistItem;
  imageHeight: number;
}) {
  const dispatch = useDispatch();
  return (
    <div className="playlistItem" onClick={() => dispatch(playlist(spotify_playlist.id)) }>
      <img
        loading="lazy"
        height={imageHeight}
        src={spotify_playlist.images.length > 0 ? spotify_playlist.images[0].url : "/no-cover.jpg"}
        alt={"Playlist cover for " + spotify_playlist.name}
        draggable="false"
      />
      <h3>{spotify_playlist.name}</h3>
      {spotify_playlist.description !== "" && <p>{spotify_playlist.description}</p>}
    </div>
  );
}
export default function PlayLists({ imageHeight }: { imageHeight: number }) {
  const accessToken = useSelector(authSelectors.getAccessToken);
  const { data: playlists } = useGetPlaylistsQuery(undefined, {
    skip: !accessToken
  });
  if (playlists !== undefined) {
    const playlistJSX = playlists.items.map((spotify_playlist) => (
      <PlayList
        key={spotify_playlist.id}
        spotify_playlist={spotify_playlist}
        imageHeight={imageHeight}
      />
    ));
    return <div id="playlists">{playlistJSX}</div>;
  }
}
