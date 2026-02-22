import { Header } from '../../components/header';
import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { CustomMenu } from './custom-menu';

const TasksPage = () => {
	return (
		<>
			<Header menu={<CustomMenu />} />
			<PageContentWrapper offset={56}>
				<div>123</div>
			</PageContentWrapper>
		</>
	);
};

export { TasksPage };
