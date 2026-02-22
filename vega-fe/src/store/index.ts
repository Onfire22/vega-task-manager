import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../pages/tasks-page/slice';
import signUpReducer from '../pages/sign-up-page/slice';
import { baseApi } from '../api';

export default combineReducers({
	tasksReducer,
	signUpReducer,
	[baseApi.reducerPath]: baseApi.reducer,
});
