import { createSlice } from "@reduxjs/toolkit";

export interface headerInterface {
  searchText: string;
  filterValue: "" | "Rumi" | "Mother Teresa" | "Albert Einstein" | "reset";
}

const initialState: headerInterface = {
  searchText: "",
  filterValue: "",
};

const headerSlice = createSlice({
  name: "headerSlice",
  initialState,
  reducers: {
    updateSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    updateFilterValue: (state, action) => {
      state.filterValue = action.payload;
    }
  },
});

export const { updateSearchText, updateFilterValue } =
  headerSlice.actions;
export default headerSlice.reducer;
