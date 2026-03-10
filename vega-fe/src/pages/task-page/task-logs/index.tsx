import { TaskLogsView } from './task-logs-view';
import type { ITimeLog } from '../types.ts';
import React from 'react';

interface IProps {
	logs: Array<ITimeLog>;
}

const TaskLogs: React.FC<IProps> = ({ logs }) => {
	return <TaskLogsView logs={logs} />;
};

export { TaskLogs };
