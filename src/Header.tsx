import { useDispatch, useSelector } from "react-redux";
import { profile, switchTheme, userPlaylists } from "./song/songSlice";

import "./Header.css";
import { RootState } from "./store/store";

export function HeaderLogo() {
  const dispatch = useDispatch();
  return (
    <div id="headerLogoContainer">
      <img
        src="./AppTweak_logo_1920.png"
        alt="logo AppTweak"
        draggable="false"
        id="headerLogo"
        onClick={() => dispatch(userPlaylists())}
      />
      <img
        src="./logo180.png"
        alt="logo AppTweak"
        draggable="false"
        id="headerLogoSmall"
        onClick={() => dispatch(userPlaylists())}
      />
    </div>
  );
}
export function HeaderTitle() {
  return (
    <div id="headerTitleContainer">
      <h1 id="headerTitle">AppTweak Music</h1>
    </div>
  );
}

export function HeaderTheme() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.accountState.theme);
  return (
    <img
      src="brightness.png"
      alt="light or dark theme"
      draggable="false"
      id="headerTheme"
      onClick={() => {
        dispatch(switchTheme());
        if (theme === "light") {
          document.documentElement.style.setProperty("--background-color", "#121212");
          document.documentElement.style.setProperty("--shadow-color", "#303030");
          document.documentElement.style.setProperty("--background-hover-color", "#181818");
          document.documentElement.style.setProperty("--text-color", "white");
          const headerTheme = document.getElementById("headerTheme");
          if (headerTheme !== null) {
            headerTheme.style.setProperty("filter", "invert(100%)");
          }
          const headerAccount = document.getElementById("headerAccount");
          if (headerAccount !== null) {
            headerAccount.style.setProperty("filter", "invert(100%)");
          }
        } else {
          document.documentElement.style.setProperty("--background-color", "white");
          document.documentElement.style.setProperty("--shadow-color", "#808080");
          document.documentElement.style.setProperty("--background-hover-color", "#FFEFEE");
          document.documentElement.style.setProperty("--text-color", "black");
          const headerTheme = document.getElementById("headerTheme");
          if (headerTheme !== null) {
            headerTheme.style.setProperty("filter", "invert(0%)");
          }
          const headerAccount = document.getElementById("headerAccount");
          if (headerAccount !== null) {
            headerAccount.style.setProperty("filter", "invert(0%)");
          }
        }
      }}
    />
  );
}

export function HeaderAccount() {
  const dispatch = useDispatch();
  return (
    <img
      src="user.png"
      alt="account"
      draggable="false"
      id="headerAccount"
      onClick={() => dispatch(profile())}
    />
  );
}
export function Header({ height, children }: { height: number; children: JSX.Element[] }) {
  return (
    <header style={{ height: height }} id="header">
      {children}
    </header>
  );
}
