import { useDispatch } from "react-redux";
import { profile, userPlaylists } from "./song/songSlice";

import "./Header.css";

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
