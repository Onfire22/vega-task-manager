import { Link } from 'react-router-dom';
import { FRONT_ROUTES } from '../../app/constants.ts';

const NotFoundPage = () => {
	return (
		<div className="w-full h-screen flex-centered-column gap-12.5">
			<h1 className="text-teal text-[150px]">404</h1>
			<div className="text-[50px]">Станица не найдена...</div>
			<Link className="link-styled text-[30px]" to={FRONT_ROUTES.root}>
				На главную
			</Link>
		</div>
	);
};

export { NotFoundPage };
