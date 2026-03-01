import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../api';
import tasksReducer from '../pages/tasks-page/slice';
import signUpReducer from '../pages/sign-up-page/slice';
import notificationsReducer from '../components/notifications/slice';
import layoutReducer from '../pages/layout/slice';

export default combineReducers({
	tasksReducer,
	signUpReducer,
	notificationsReducer,
	layoutReducer,
	[baseApi.reducerPath]: baseApi.reducer,
});
