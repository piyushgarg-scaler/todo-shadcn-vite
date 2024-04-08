import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import JokeService from "@/service/jokes";
import { RootState } from "../store";

interface IJokeState {
  joke?: string | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IJokeState = {
  joke: null,
  isLoading: false,
  isError: false,
};

export const fetchJoke = createAsyncThunk("jokes/fetchJoke", async () => {
  const { joke } = await JokeService.getJokeByCategories(["Programming"]);
  return joke;
});

const jokeSlice = createSlice({
  name: "jokes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJoke.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchJoke.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(fetchJoke.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.joke = action.payload;
    });
  },
});

export const getJokeSelector = createSelector(
  (state: RootState) => state,
  (state) => state.joke
);

export default jokeSlice.reducer;
