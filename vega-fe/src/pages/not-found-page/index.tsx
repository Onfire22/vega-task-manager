import { Link } from 'react-router-dom';
import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import './styles.less';
import { FRONT_ROUTES } from '../../shared/constants.ts';

const NotFoundPage = () => {
	return (
		<PageContentWrapper>
			<div className="not-found">
				<h1 className="not-found__title">404</h1>
				<div className="not-found__text">Станица не найдена...</div>
				<Link className="not-found__link" to={FRONT_ROUTES.root}>
					На главную
				</Link>
			</div>
		</PageContentWrapper>
	);
};

export { NotFoundPage };
