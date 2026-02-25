import { Header } from '../../components/header';
import { CustomMenu } from './components/custom-menu';
import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { Task } from './task';

const TaskPage = () => {
	return (
		<>
			<Header menu={<CustomMenu />} />
			<PageContentWrapper offset={56}>
				<Task />
			</PageContentWrapper>
		</>
	);
};

export { TaskPage };
