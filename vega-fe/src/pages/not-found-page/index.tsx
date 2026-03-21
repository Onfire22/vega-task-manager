import { Link } from 'react-router-dom';
import './styles.less';
import { FRONT_ROUTES } from '../../app/constants.ts';

const NotFoundPage = () => {
	return (
		<div className="not-found">
			<h1 className="not-found__title">404</h1>
			<div className="not-found__text">Станица не найдена...</div>
			<Link className="not-found__link" to={FRONT_ROUTES.root}>
				На главную
			</Link>
		</div>
	);
};

export { NotFoundPage };
