import type { ITimeLog } from '../../types.ts';
import React from 'react';
import './styles.less';

interface IProps {
	logs: Array<ITimeLog>;
}

const TaskLogsView: React.FC<IProps> = ({ logs }) => {
	return (
		<div className="task-logs">
			{logs.map((log) => {
				return (
					<div className="task-logs__log" key={log.id}>
						<div className="task-logs__info">
							<div className="task-logs__data">
								<a className="task-logs__user">{`${log.user.name} ${log.user.secondName}`}</a>
								<span>logged</span>
								<div className="task-logs__date">{log.createdAt}</div>
							</div>
							{log?.updatedAt && <div className="task-logs__edit">edited</div>}
						</div>
						<div className="task-logs__description">
							<div className="task-logs__title">Time:</div>
							<div className="task-logs__text">{log.loggedTime}</div>
						</div>
						<div className="task-logs__description">
							<div className="task-logs__title">Work log:</div>
							<div className="task-logs__text">{`${log.description}`}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export { TaskLogsView };
