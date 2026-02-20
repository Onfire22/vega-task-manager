import { Routes, Route } from 'react-router-dom';
import { TasksPage } from '../pages/tasks-page';
import { SignInPage } from '../pages/sign-in-page';
import { SignUpPage } from '../pages/sign-up-page';
import { NotFoundPage } from '../pages/not-found-page';

const Router = () => {
	return (
		<Routes>
			<Route index element={<TasksPage />} />
			<Route path="/sign-in" element={<SignInPage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export { Router };
