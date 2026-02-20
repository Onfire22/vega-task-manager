import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../pages/tasks-page/slice';
import signUoReducer from '../pages/sign-up-page/slice';
import { signUpApi } from '../pages/sign-up-page/api.ts';

export default combineReducers({
	tasksReducer,
	signUoReducer,
	[signUpApi.reducerPath]: signUpApi.reducer,
});
