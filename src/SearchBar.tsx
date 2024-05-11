import { useDispatch, useSelector } from "react-redux";
import { search, updateSearch } from "./song/songSlice";

import "./SearchBar.css";
import { RootState } from "./store/store";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.accountState.search);
  return (
    <div>
      <input
        id="searchInput"
        value={searchQuery}
        onChange={(event) => dispatch(updateSearch(event.target.value))}
        onKeyDown={(event) => event.key === "Enter" && dispatch(search())}
      />
      <button id="searchButton" className="button" onClick={() => dispatch(search())}>
        Search
      </button>
    </div>
  );
}
