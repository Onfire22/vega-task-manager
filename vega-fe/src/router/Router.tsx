import { Routes, Route } from 'react-router-dom';
import { pagesList } from './pages-list.ts';

const Router = () => {
	return (
		<Routes>
			{(Object.keys(pagesList) as Array<keyof typeof pagesList>).map((key) => {
				const Component = pagesList[key].component;
				return <Route key={pagesList[key].id} path={pagesList[key].path} element={<Component />} />;
			})}
		</Routes>
	);
};

export { Router };
