import { Routes, Route, Navigate } from 'react-router-dom';
import { TasksPage } from '@/pages/tasks-page';
import { SignInPage } from '@/pages/sign-in-page';
import { SignUpPage } from '@/pages/sign-up-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { ProtectedRoute } from './protected-route.tsx';
import { PublicRoute } from './public-route.tsx';
import { TaskPage } from '@/pages/task-page';
import { UserProfilePage } from '@/pages/user-profile-page';
import { ProjectsPage } from '@/pages/projects-page';
import { Layout } from '@/pages/layout';
import { ProjectPage } from '@/pages/project-page';
import { UserPage } from '@/pages/user-page';
import { ChatPage } from '@/pages/chat';
import { useGetCurrentUserQuery } from '../api/auth/auth.api.ts';
import { FRONT_ROUTES } from '../app/constants.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';

const Router = () => {
	const { isLoading, isError, isFetching } = useGetCurrentUserQuery();

	if (isLoading) return <CustomLoader />;

	return (
		<Routes>
			<Route element={<PublicRoute isError={isError} isFetching={isFetching} />}>
				<Route path={FRONT_ROUTES.signIn} element={<SignInPage />} />
				<Route path={FRONT_ROUTES.signUp} element={<SignUpPage />} />
			</Route>
			<Route element={<ProtectedRoute isError={isError} isFetching={isFetching} />}>
				<Route element={<Layout />}>
					<Route path={FRONT_ROUTES.root} element={<Navigate to={FRONT_ROUTES.dashboard} replace />} />
					<Route path={FRONT_ROUTES.dashboard} element={<TasksPage />} />
					<Route path={FRONT_ROUTES.task} element={<TaskPage />} />
					<Route path={FRONT_ROUTES.profile} element={<UserProfilePage />} />
					<Route path={FRONT_ROUTES.projects} element={<ProjectsPage />} />
					<Route path={FRONT_ROUTES.project} element={<ProjectPage />} />
					<Route path={FRONT_ROUTES.user} element={<UserPage />} />
					<Route path={FRONT_ROUTES.chat} element={<ChatPage />} />
				</Route>
			</Route>
			<Route path={FRONT_ROUTES.all} element={<NotFoundPage />} />
		</Routes>
	);
};

export { Router };
