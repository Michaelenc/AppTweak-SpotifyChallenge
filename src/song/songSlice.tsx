import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  songState: string;
  id: string;
  returnState: string;
  returnId: string;
  search: string
}

const initialState: CounterState = {
  songState: "user-playlists",
  id: "",
  returnState: "",
  returnId: "",
  search: "",
};

export const accountSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    userPlaylists: (state) => {
        state.songState = "user-playlists";
    },
    playlist: (state, id: PayloadAction<string>) => {
        state.songState = "playlist";
        state.id = id.payload;
    },
    profile: (state) => {
        state.songState = "user-profile";
    },
    search: (state) => {
        state.songState = "search";
        state.id = state.search;
    },
    updateSearch: (state, search: PayloadAction<string>) => {
        state.search = search.payload
    },
    track: (state, id: PayloadAction<string>) => {
        state.returnState = state.songState;
        state.returnId = state.id;
        state.songState = "track-information";
        state.id = id.payload; 
    },
    episode: (state, id: PayloadAction<string>) => {
      state.returnState = state.songState;
      state.returnId = state.id;
      state.songState = "episode-information";
      state.id = id.payload; 
    },
    back: (state, back: PayloadAction<{ backDirection: string; backId: string }>) => {
        state.songState = back.payload.backDirection;
        state.id = back.payload.backId;
    }
  }
});

// Action creators are generated for each case reducer function
export const { userPlaylists, playlist, profile, search, updateSearch, track, episode, back } = accountSlice.actions;

export default accountSlice.reducer;
