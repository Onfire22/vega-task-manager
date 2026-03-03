import { BaseCustomMenu } from './components/base-custom-menu';
import { useAppSelector } from '../../store/hooks.ts';
import { getActiveModalSelector } from '../../modules/modals/selectors.ts';
import { modal } from '../../modules/modals';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';
import { Outlet } from 'react-router-dom';
import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';

const Layout = () => {
	const activeModal = useAppSelector(getActiveModalSelector());

	const ActiveModal = activeModal ? modal[activeModal] : null;

	return (
		<>
			<Header menu={<BaseCustomMenu />} />
			<main>
				<PageContentWrapper>
					<Outlet />
				</PageContentWrapper>
			</main>
			{ActiveModal && <ActiveModal />}
			<Sidebar />
		</>
	);
};

export { Layout };
