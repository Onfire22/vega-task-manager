import type { ITimeLog } from '../../types.ts';
import React from 'react';

interface IProps {
	logs: Array<ITimeLog>;
}

const TaskLogsView: React.FC<IProps> = ({ logs }) => {
	return (
		<div className="flex flex-column gap-2.5 text-[14px]">
			{logs.map((log) => {
				return (
					<div className="p-2.5 hover:bg-background" key={log.id}>
						<div className="mb-2.5 flex items-center justify-between">
							<div className="flex items-center gap-1.25">
								<a>{`${log.user.name} ${log.user.secondName}`}</a>
								<span>logged</span>
								<div>{log.createdAt}</div>
							</div>
						</div>
						<div className="flex items-center gap-1.25 mb-1.25">
							<div>Time:</div>
							<div>{log.loggedTime}</div>
						</div>
						<div className="flex items-center gap-1.25 mb-1.25">
							<div>Work log:</div>
							<div>{`${log.description}`}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export { TaskLogsView };
