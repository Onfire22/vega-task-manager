import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/index';
import { signUpApi } from '../pages/sign-up-page/api.ts';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(signUpApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
