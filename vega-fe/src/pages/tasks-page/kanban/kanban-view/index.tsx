import type { IExpDictData } from '../../types.ts';
import React from 'react';
import { CustomBadge } from '../../../../components/custom-badge';
import './styles.less';

interface IProps {
	columns?: Array<IExpDictData>;
}

const KanbanView: React.FC<IProps> = ({ columns }) => {
	return (
		<div className="kanban">
			<div className="kanban__columns">
				{columns?.map((column) => {
					return (
						<div className="kanban__column" key={column.id}>
							<div className="kanban__header">
								<div className="kanban__title">
									<CustomBadge color={column.color} text={column.name} />
								</div>
							</div>
							<div className="kanban__content"></div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { KanbanView };
