import "./App.css";

import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import { Header, HeaderAccount, HeaderLogo, HeaderTheme, HeaderTitle } from "./Header";
import SearchBar from "./SearchBar";
import PlayLists from "./PlayLists";
import { RootState } from "./store/store";
import BackButton from "./BackButton";
import Songs from "./Songs";
import Profile from "./Profile";
import SearchResults from "./SearchResults";
import SongInformation from "./TrackInformation";
import EpisodeInformation from "./EpisodeInformation";
import Footer from "./Footer";

const App: FC = (): ReactElement => {
  const headerHeight = 60;
  const imageHeight = 100;
  const songState = useSelector((state: RootState) => state.accountState.songState);
  const returnId = useSelector((state: RootState) => state.accountState.returnId);
  const returnState = useSelector((state: RootState) => state.accountState.returnState);
  return (
    <div id="contentContainer">
      <Header height={headerHeight}>
        <HeaderLogo />
        <HeaderTitle />
        <HeaderTheme />
        <HeaderAccount />
      </Header>
      <main style={{ marginBlockStart: headerHeight + 10 }} id="main">
        {(songState === "playlist" || songState === "user-profile" || songState === "search") && (
          <BackButton backDirection="user-playlists" backId="" />
        )}
        {(songState === "track-information" || songState === "episode-information") && (
          <BackButton backDirection={returnState} backId={returnId} />
        )}
        {songState === "user-playlists" && (
          <>
            <SearchBar />
            <PlayLists imageHeight={imageHeight} />
          </>
        )}
        {songState === "playlist" && <Songs imageHeight={imageHeight} />}
        {songState === "user-profile" && <Profile imageHeight={imageHeight} />}
        {songState === "search" && <SearchResults imageHeight={imageHeight} />}
        {songState === "track-information" && <SongInformation imageHeight={imageHeight} />}
        {songState === "episode-information" && <EpisodeInformation imageHeight={imageHeight} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
