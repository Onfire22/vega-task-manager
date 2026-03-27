import React from 'react';
import { TableControls } from '../../table-controls';

interface IProps {
	component: React.ComponentType;
}

const TasksView: React.FC<IProps> = ({ component: Component }) => {
	return (
		<div className="w-full p-5">
			<TableControls />
			<Component />
		</div>
	);
};

export { TasksView };
