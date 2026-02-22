import React from 'react';
import { CreateTaskWindowView } from './create-task-window-view';
import { setIsModalShown } from '../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { getIsModalShownSelector } from '../selectors.ts';
import type { IDictionary } from '../types.ts';

interface IProps {
	dictionaries: { stackList?: IDictionary[]; taskPriorities?: IDictionary[] };
}

const CreateTaskWindow: React.FC<IProps> = ({ dictionaries }) => {
	const dispatch = useAppDispatch();
	const isModalShown = useAppSelector(getIsModalShownSelector());

	const handleModalClose = () => {
		dispatch(setIsModalShown(false));
	};

	return (
		<CreateTaskWindowView isModalShown={isModalShown} onModalClose={handleModalClose} dictionaries={dictionaries} />
	);
};

export { CreateTaskWindow };
