import { TaskView } from './task.view.tsx';
import { INITIAL_FIELD_VALUES } from '../../constants.ts';
import { useDictionariesWithColors, useTaskData, useUpdateTask } from '../../hooks.ts';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setModalType, setTaskField } from '../../slice.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import type { TModalType, TTaskFields } from '@/pages/task-page/types.ts';
import { Comments } from '@/pages/task-page/components/comments/comments.tsx';
import { TaskLogs } from '@/pages/task-page/components/task-logs/task-logs.tsx';
import { getTaskFieldSelector } from '@/pages/task-page/selectors.ts';

const activityComponents = {
	comments: Comments,
	logs: TaskLogs,
};

const Task = () => {
	const dispatch = useAppDispatch();

	const [activeTab, setActiveTab] = useState('comments');

	const taskField = useAppSelector(getTaskFieldSelector());

	const { dictionariesOptions } = useDictionariesWithColors();
	const { isTaskLoading, task } = useTaskData();
	const updateTask = useUpdateTask();

	const handleSetActiveTab = (value: string) => {
		if (value) {
			setActiveTab(value);
		}
	};

	const handleSetFieldToEdit = (fieldName: TTaskFields | '', value: string | null) => {
		const selection = window.getSelection();
		if (selection && selection.toString().length > 0) return;

		if (value) {
			dispatch(setTaskField({ fieldName, value }));
		}
	};

	const handleFieldChange: {
		(e: React.ChangeEvent<HTMLInputElement>, fieldName: TTaskFields): void;
		(e: React.ChangeEvent<HTMLTextAreaElement>, fieldName: TTaskFields): void;
	} = (e, fieldName) => {
		dispatch(setTaskField({ fieldName, value: e.target.value }));
	};

	const handleCancelChanges = () => {
		dispatch(setTaskField(INITIAL_FIELD_VALUES));
	};

	const handleModalShown = (modalType: TModalType) => {
		dispatch(setModalType(modalType));
	};

	const component = activityComponents[activeTab as keyof typeof activityComponents];

	return isTaskLoading ? (
		<CustomLoader />
	) : (
		<TaskView
			task={task}
			field={taskField}
			activeTab={activeTab}
			options={dictionariesOptions ?? { taskType: [], taskPriority: [], taskStatus: [] }}
			component={component}
			onSetFieldToEdit={handleSetFieldToEdit}
			onFieldChange={handleFieldChange}
			onCancelChanges={handleCancelChanges}
			onModalShown={handleModalShown}
			onUpdateTask={updateTask}
			onSetActiveTab={handleSetActiveTab}
		/>
	);
};

export { Task };
