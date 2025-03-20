import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch news articles
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (category = "cryptocurrency") => {
    console.log("API Key:", import.meta.env.VITE_NEWS_API_KEY); // Debugging line
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
    );
    console.log("Response Status:", response.status); // Debugging line
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.articles;
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