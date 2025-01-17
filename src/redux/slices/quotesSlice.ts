import { createSlice } from "@reduxjs/toolkit";

export interface Quote{
  id: number,
  author: string,
  newAuthor: string,
  quote: string,
  newQuote: string,
  editMode: boolean
}

export interface quotesInterface {
    pageNumber: number;
    quotes: Quote[]
}

const initialState: quotesInterface = {
  pageNumber: 0,
  quotes: []
};

const quotesSlice = createSlice({
  name: "quotesSlice",
  initialState,
  reducers: {
    incrementPageNumber: (state) => {
      state.pageNumber++;
    },
    setQuotes: (state, action:{payload: Quote[]}) => {
      state.quotes = action.payload;
    },
    changeQuote: (state, action) => {
        state.quotes = state.quotes.map((element) => {
          if (element.id === action.payload.id)
          {
            return {...element, newQuote: action.payload.newQuote, newAuthor: action.payload.newAuthor};
          }
          return element
        })
    },
    setEditMode: (state, action) => {
      state.quotes = state.quotes.map((element) => {
        if (element.id == action.payload)
        {
          if (element.editMode)
          {
            return {...element, author: element.newAuthor, quote: element.newQuote, editMode: false}
          }
          return {...element, editMode: !element.editMode}
        }
        return {...element, editMode: false, newAuthor: element.author, newQuote: element.quote};
      })
    },
    removeElement: (state, action) => {
      state.quotes = state.quotes.filter((quote) => quote.id !== action.payload);
    }
  },
});

export const { incrementPageNumber, setQuotes, changeQuote, setEditMode, removeElement } =
  quotesSlice.actions;
export default quotesSlice.reducer;
