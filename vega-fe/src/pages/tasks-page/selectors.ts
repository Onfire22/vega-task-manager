import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';
import { dictionariesApi } from '../../api/queries/dictionaries.api.ts';
import { tasksApi } from '../../api/queries/tasks.api.ts';
import { createSelector } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';

export const getIsModalShownSelector = () => (state: RootState) =>
	state.tasksReducer?.isModalShown || initialState.isModalShown;

export const getActiveTabSelector = () => (state: RootState) => state.tasksReducer?.activeTab || initialState.activeTab;

export const getStackListResultSelector = () => dictionariesApi.endpoints.getStackList.select();

export const getStatusesResultSelector = () => dictionariesApi.endpoints.getTaskStatuses.select();

export const getPrioritiesResultSelector = () => dictionariesApi.endpoints.getTaskPriorities.select();

export const getTasksSelector = () => tasksApi.endpoints.getTasks.select({ filters: { withAssignee: false } });

export const getTableDataSelector = () =>
	createSelector(
		getTasksSelector(),
		getStackListResultSelector(),
		getStatusesResultSelector(),
		getPrioritiesResultSelector(),
		(tasks, stack, statuses, priorities) => {
			if (!tasks.data || !stack.data || !statuses.data || !priorities.data) return [];

			return tasks.data.payload.map((task) => {
				return {
					...task,
					createdAt: format(new Date(task.createdAt), DATE_FORMAT),
					priorityUuid:
						priorities.data?.payload.find((item) => item.value === task.priorityUuid)?.label ?? '-',
					stackUuid: stack.data?.payload.find((item) => item.value === task.stackUuid)?.label ?? '-',
					statusUuid: statuses.data?.payload.find((item) => item.value === task.statusUuid)?.label ?? '-',
					reporterUuid: '-',
				};
			});
		},
	);
