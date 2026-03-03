import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../api';
import tasksReducer from '../pages/tasks-page/slice';
import signUpReducer from '../pages/sign-up-page/slice';
import notificationsReducer from '../modules/notifications/slice';
import modalsReducer from '../modules/modals/slice';
import layoutReducer from '../pages/layout/slice';

export default combineReducers({
	tasksReducer,
	signUpReducer,
	notificationsReducer,
	layoutReducer,
	modalsReducer,
	[baseApi.reducerPath]: baseApi.reducer,
});
