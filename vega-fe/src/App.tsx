import { Router } from './router/Router.tsx';
import { MantineProvider } from '@mantine/core';

const App = () => {
	return (
		<MantineProvider defaultColorScheme="light">
			<Router />
		</MantineProvider>
	);
};

export default App;
