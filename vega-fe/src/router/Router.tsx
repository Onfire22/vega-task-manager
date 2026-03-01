import { Routes, Route } from 'react-router-dom';
import { TasksPage } from '../pages/tasks-page';
import { SignInPage } from '../pages/sign-in-page';
import { SignUpPage } from '../pages/sign-up-page';
import { NotFoundPage } from '../pages/not-found-page';
import { ProtectedRoute } from './protected-route.tsx';
import { PublicRoute } from './public-route.tsx';
import { TaskPage } from '../pages/task-page';
import { UserProfilePage } from '../pages/user-profile-page';
import { ProjectsPage } from '../pages/projects-page';
import { Loader } from '@mantine/core';
import { BLUE_COLOR } from '../pages/sign-up-page/constants.ts';
import { useGetCurrentUserQuery } from '../api/queries/auth.api.ts';
import { FRONT_ROUTES } from '../shared/constants.ts';

const Router = () => {
	const { isLoading, isError, isFetching } = useGetCurrentUserQuery();

	if (isLoading) return <Loader color={BLUE_COLOR} size={40} />;

	return (
		<Routes>
			<Route element={<PublicRoute isError={isError} isFetching={isFetching} />}>
				<Route path={FRONT_ROUTES.signIn} element={<SignInPage />} />
				<Route path={FRONT_ROUTES.signUp} element={<SignUpPage />} />
			</Route>
			<Route element={<ProtectedRoute isError={isError} isFetching={isFetching} />}>
				<Route index element={<TasksPage />} />
				<Route path={FRONT_ROUTES.task} element={<TaskPage />} />
				<Route path={FRONT_ROUTES.profile} element={<UserProfilePage />} />
				<Route path={FRONT_ROUTES.projects} element={<ProjectsPage />} />
			</Route>
			<Route path={FRONT_ROUTES.all} element={<NotFoundPage />} />
		</Routes>
	);
};

export { Router };
