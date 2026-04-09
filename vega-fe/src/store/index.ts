import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../api';
import tasksReducer from '../pages/tasks-page/slice';
import signUpReducer from '../pages/sign-up-page/slice';
import modalsReducer from '../modules/modals/slice';
import notificationsSlice from '../modules/notifications/slice';
import layoutReducer from '../pages/layout/slice';
import taskSlice from '../pages/task-page/slice';
import projectsReducer from '../pages/projects-page/slice';
import projectReducer from '../pages/project-page/slice';
import authSlice from '@/store/authSlice.ts';

export default combineReducers({
	tasksReducer,
	signUpReducer,
	layoutReducer,
	modalsReducer,
	taskSlice,
	authSlice,
	projectsReducer,
	notificationsSlice,
	projectReducer,
	[baseApi.reducerPath]: baseApi.reducer,
});
