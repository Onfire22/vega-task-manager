import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../pages/tasks-page/slice';

export default combineReducers({
	tasksReducer,
});
