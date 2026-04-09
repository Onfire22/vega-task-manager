import { Project } from './components/project/project.tsx';
import { ModalWindow } from '@/pages/project-page/components/modal-window/modal-window.tsx';

const ProjectPage = () => {
	return (
		<>
			<ModalWindow />
			<Project />
		</>
	);
};

export { ProjectPage };
