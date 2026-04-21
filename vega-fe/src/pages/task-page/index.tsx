import { Task } from '@/pages/task-page/components/task/task.tsx';
import { ModalWindow } from '@/pages/task-page/components/modal-window/modal-window.tsx';
import { LinksModal } from '@/pages/task-page/components/links-modal/links-modal.tsx';

const TaskPage = () => {
	return (
		<>
			<Task />
			<ModalWindow />
			<LinksModal />
		</>
	);
};

export { TaskPage };
