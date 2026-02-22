import React from 'react';
import { CreateTaskWindowView } from './create-task-window-view';
import { setIsModalShown } from '../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { getIsModalShownSelector } from '../selectors.ts';
import type { IDictionaryItem } from '../../../api/types.ts';

interface IProps {
	stackListData?: IDictionaryItem[];
	taskPrioritiesData?: IDictionaryItem[];
}

const CreateTaskWindow: React.FC<IProps> = ({ taskPrioritiesData, stackListData }) => {
	const dispatch = useAppDispatch();
	const isModalShown = useAppSelector(getIsModalShownSelector());

	const handleModalClose = () => {
		dispatch(setIsModalShown(false));
	};

	return (
		<CreateTaskWindowView
			isModalShown={isModalShown}
			taskPrioritiesData={taskPrioritiesData}
			stackListData={stackListData}
			onModalClose={handleModalClose}
		/>
	);
};

export { CreateTaskWindow };
