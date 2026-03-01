import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { Task } from './task';

const TaskPage = () => {
	return (
		<PageContentWrapper offset={56}>
			<Task />
		</PageContentWrapper>
	);
};

export { TaskPage };
