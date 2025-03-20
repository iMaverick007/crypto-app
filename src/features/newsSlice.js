import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch news articles with a fixed query for "crypto"
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async () => {
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/latest?apikey=${import.meta.env.VITE_NEWS_API_KEY}&q=crypto&removeduplicate=1`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data.results; // Return results from the API
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;