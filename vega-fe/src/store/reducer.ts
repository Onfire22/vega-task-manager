import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/index';
import { baseApi } from '../api';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
