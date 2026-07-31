import { LayoutView } from './components/layout-view/layout.view.tsx';
import { useNotificationsSocket } from '@/modules/notifications/hooks.ts';

const Layout = () => {
	// useNotificationsSocket();

	return <LayoutView />;
};

export { Layout };
