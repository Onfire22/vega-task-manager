import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../api';
import tasksReducer from '../pages/tasks-page/slice';
import signUpReducer from '../pages/sign-up-page/slice';
import modalsReducer from '../modules/modals/slice';
import layoutReducer from '../pages/layout/slice';
import taskSlice from '../pages/task-page/slice';

export default combineReducers({
	tasksReducer,
	signUpReducer,
	layoutReducer,
	modalsReducer,
	taskSlice,
	[baseApi.reducerPath]: baseApi.reducer,
});
