import { TaskLogsView } from './task-logs.view.tsx';
import { useParams } from 'react-router-dom';
import { useTimeLogs } from '@/pages/task-page/hooks.ts';

const TaskLogs = () => {
	const params = useParams();

	const { logs } = useTimeLogs(params.uuid!);

	return <TaskLogsView logs={logs} />;
};

export { TaskLogs };
