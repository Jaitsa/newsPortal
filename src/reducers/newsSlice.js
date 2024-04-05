import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  news: [],
  error: '',
  isOnNewsPage: false
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsRequest(state) {
      state.loading = true;
      state.error = '';
    },
    fetchNewsSuccess(state, action) {
      state.loading = false;
      state.news = action.payload;
      state.error = '';
    },
    fetchNewsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setOnNewsPage(state, action) {
      state.isOnNewsPage = action.payload;
    },
  },
});

export const { fetchNewsRequest, fetchNewsSuccess, fetchNewsFailure, setOnNewsPage } = newsSlice.actions;

export const fetchData = async (dispatch, request) => {
  try {
    dispatch(fetchNewsRequest());

    const ids = await request('https://hacker-news.firebaseio.com/v0/newstories.json');

    const limitedIds = ids.slice(0, 100);
    
    const dataPromises = limitedIds.map(id =>
      request(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    );

    const responseData = await Promise.all(dataPromises);

    dispatch(fetchNewsSuccess(responseData));
  } catch (err) {
    dispatch(fetchNewsFailure(err.message));
  }
};

export const fetchComments = async (request, kidsIds, setComments) => {
  try {
    const commentsPromises = kidsIds.map(kidId =>
      request(`https://hacker-news.firebaseio.com/v0/item/${kidId}.json`)
    );
    const commentsData = await Promise.all(commentsPromises);
    setComments(commentsData.filter(comment => comment && !comment.deleted));
  } catch (err) {
    console.error('Ошибка при загрузке комментариев:', err);
  }
};

export default newsSlice.reducer;
