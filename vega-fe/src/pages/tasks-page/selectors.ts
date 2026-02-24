import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';
import { dictionariesApi } from '../../api/queries/dictionaries.api.ts';
import { tasksApi } from '../../api/queries/tasks.api.ts';
import { createSelector } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { BASE_DICTIONARIES_META, DATE_FORMAT } from './constants.ts';
import { transformDictionaries } from './utils.ts';

export const getIsModalShownSelector = () => (state: RootState) =>
	state.tasksReducer?.isModalShown || initialState.isModalShown;

export const getActiveTabSelector = () => (state: RootState) => state.tasksReducer?.activeTab || initialState.activeTab;

export const getDictionariesSelector = () => dictionariesApi.endpoints.getDictionaries.select(BASE_DICTIONARIES_META);

export const getTasksSelector = () => tasksApi.endpoints.getTasks.select({ filters: { withAssignee: false } });

export const getSelectorsValuesSelector = () =>
	createSelector(getDictionariesSelector(), (dictionaries) => {
		if (!dictionaries.data) return {};

		return {
			priorities: transformDictionaries(dictionaries.data.payload.task_priority),
			stackTypes: transformDictionaries(dictionaries.data.payload.stack_type),
		};
	});

export const getTableDataSelector = () =>
	createSelector(getTasksSelector(), getDictionariesSelector(), (tasks, dictionaries) => {
		if (!tasks.data || !dictionaries?.data) return [];

		return tasks.data.payload.map((task) => {
			return {
				...task,
				createdAt: format(new Date(task.createdAt), DATE_FORMAT),
				priorityUuid:
					dictionaries.data?.payload.task_priority.find((item) => item.id === task.taskPriorityUuid)?.name ??
					'-',
				stackUuid:
					dictionaries.data?.payload.stack_type.find((item) => item.id === task.taskStackUuid)?.name ?? '-',
				statusUuid:
					dictionaries.data?.payload.task_status.find((item) => item.id === task.taskStatusUuid)?.name ?? '-',
				reporterUuid: '-',
			};
		});
	});
