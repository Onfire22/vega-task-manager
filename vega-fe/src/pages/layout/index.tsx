import { BaseCustomMenu } from './components/base-custom-menu';
import { useAppSelector } from '../../store/hooks.ts';
import { getActiveModalShownSelector } from './selectors.ts';
import { modal } from './components/modals';
import { Header } from './components/header';
import { Router } from '../../router/Router.tsx';
import { useLocation } from 'react-router-dom';
import { HEADERLESS_PAGES } from './contsants.ts';
import { Sidebar } from './components/sidebar';

const Layout = () => {
	const location = useLocation();
	const activeModal = useAppSelector(getActiveModalShownSelector());

	const ActiveModal = activeModal ? modal[activeModal] : null;

	return (
		<>
			{!HEADERLESS_PAGES.includes(location.pathname) ? <Header menu={<BaseCustomMenu />} /> : null}
			<Router />
			{ActiveModal && <ActiveModal />}
			<Sidebar />
		</>
	);
};

export { Layout };
