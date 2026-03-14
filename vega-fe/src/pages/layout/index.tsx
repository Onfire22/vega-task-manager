import { useAppSelector } from '../../store/hooks.ts';
import { getActiveModalSelector } from '../../modules/modals/selectors.ts';
import { modal } from '../../modules/modals';
import { LayoutView } from './components/layout-view';

const Layout = () => {
	const activeModal = useAppSelector(getActiveModalSelector());

	const ActiveModal = activeModal ? modal[activeModal] : null;

	return <LayoutView component={ActiveModal} />;
};

export { Layout };
