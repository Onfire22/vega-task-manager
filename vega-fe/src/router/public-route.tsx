import { Navigate, Outlet } from 'react-router-dom';
import { FRONT_ROUTES } from '../shared/constants.ts';

const PublicRoute = ({ isError, isFetching }: { isError: boolean; isFetching: boolean }) => {
	if (isFetching) return <Outlet />;
	if (!isError) return <Navigate to={FRONT_ROUTES.root} replace />;
	return <Outlet />;
};

export { PublicRoute };
