import React from 'react';
import { TableControls } from '../../table-controls';
import './styles.less';

interface IProps {
	component: React.ComponentType;
}

const TasksView: React.FC<IProps> = ({ component: Component }) => {
	return (
		<div className="tasks">
			<TableControls />
			<Component />
		</div>
	);
};

export { TasksView };
