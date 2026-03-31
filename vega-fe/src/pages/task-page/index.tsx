import { Task } from '@/pages/task-page/components/task/task.tsx';
import { ModalWindow } from '@/pages/task-page/components/modal-window/modal-window.tsx';

const TaskPage = () => {
	return (
		<>
			<Task />
			<ModalWindow />
		</>
	);
};

export { TaskPage };
