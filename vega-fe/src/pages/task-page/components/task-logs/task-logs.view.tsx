import type { ITimeLog } from '../../types.ts';
import React from 'react';
import { CustomAvatar } from '@/components/common/shared/custom-avatar.tsx';

interface IProps {
	logs: Array<ITimeLog>;
}

const TaskLogsView: React.FC<IProps> = ({ logs }) => {
	return (
		<ul className="flex flex-col gap-2.5 text-[14px]">
			{logs.map((log) => {
				return (
					<li className="p-1.25 rounded-[5px] flex flex-col gap-1.25 hover:bg-secondary" key={log.id}>
						<div className="flex gap-2.5 items-start">
							<div
								className="w-7.5 h-7.5 rounded-full flex items-center justify-center"
								style={{ backgroundColor: log.user.avatar.color }}
							>
								<CustomAvatar
									initials={log.user.avatar.initials}
									avatarUrl={log.user.avatar.avatarUrl}
								/>
							</div>
							<div className="flex flex-col">
								<span>{log.user.name}</span>
								<div className="flex items-center gap-2">
									<span>залогал</span>
									<span>{log.loggedTime}</span>
									<span className="text-muted-foreground text-[12px]">{log.createdAt}</span>
								</div>
							</div>
						</div>
						<div>{log.description}</div>
					</li>
				);
			})}
		</ul>
	);
};

export { TaskLogsView };
