import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  letters: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __addLetter = createAsyncThunk(
  "addLetter",
  (payload, thunkAPI) => {
    thunkAPI.dispatch(addLetter(payload));
  }
);

export const __deleteLetter = createAsyncThunk(
  "deleteLetter",
  (payload, thunkAPI) => {
    thunkAPI.dispatch(deleteLetter(payload));
  }
);

export const __fetchLetters = createAsyncThunk(
  "fetchLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/letters?_sort=createAt&_order=desc"
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      state.letters.push(action.payload);
    },
    deleteLetter: (state, action) => {
      state.letters = state.letters.filter(
        (letter) => letter.id !== action.payload
      );
    },
    editedLetter: (state, action) => {
      state.letters = state.letters.map((letter) =>
        letter.id === action.payload.id
          ? { ...letter, content: action.payload.content }
          : letter
      );
    },
  },
  extraReducers: {
    [__fetchLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },

    [__fetchLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
    },
    [__fetchLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { addLetter, deleteLetter, editedLetter } = lettersSlice.actions;
export default lettersSlice.reducer;
