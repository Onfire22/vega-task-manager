import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../api';
import tasksReducer from '../pages/tasks-page/slice';
import signUpReducer from '../pages/sign-up-page/slice';
import notificationsReducer from '../components/notifications/slice';

export default combineReducers({
	tasksReducer,
	signUpReducer,
	notificationsReducer,
	[baseApi.reducerPath]: baseApi.reducer,
});
