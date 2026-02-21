import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../pages/tasks-page/slice';
import signUpReducer from '../pages/sign-up-page/slice';
import { authApi } from '../api/auth/api.ts';

export default combineReducers({
	tasksReducer,
	signUpReducer,
	[authApi.reducerPath]: authApi.reducer,
});
