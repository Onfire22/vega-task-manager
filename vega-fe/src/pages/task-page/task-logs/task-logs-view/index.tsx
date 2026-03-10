import type { ITimeLog } from '../../types.ts';
import React from 'react';

interface IProps {
	logs: Array<ITimeLog>;
}

const TaskLogsView: React.FC<IProps> = ({ logs }) => {
	return (
		<div className="task-logs">
			{logs.map((log) => {
				return (
					<div className="task-log" key={log.id}>
						<div className="task-log__user">USER USER</div>
						<div className="task-log__time">{`${log.loggedTime.hours || null}${log.loggedTime.minutes}`}</div>
					</div>
				);
			})}
		</div>
	);
};

export { TaskLogsView };
