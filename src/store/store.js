import { configureStore } from '@reduxjs/toolkit';
import newsSliceReducer from '../reducers/newsSlice';

const store = configureStore({
  reducer: {
    news: newsSliceReducer
  }
});

export default store;
