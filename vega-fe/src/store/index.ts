import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../pages/tasks-page/slice';
import signUoReducer from '../pages/sign-up-page/slice';

export default combineReducers({
	tasksReducer,
	signUoReducer,
});
