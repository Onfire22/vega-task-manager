import { Navigate, Outlet } from 'react-router-dom';
import { FRONT_ROUTES } from '../app/constants.ts';

const ProtectedRoute = ({ isError, isFetching }: { isError: boolean; isFetching: boolean }) => {
	if (isFetching) return null;
	if (isError) return <Navigate to={FRONT_ROUTES.signIn} />;
	return <Outlet />;
};

export { ProtectedRoute };
