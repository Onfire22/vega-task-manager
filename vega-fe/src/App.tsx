import { Router } from './router/Router.tsx';
import { MantineProvider } from '@mantine/core';
import { Notifications } from './components/notifications';
import { THEME } from './utils.ts';

const App = () => {
	return (
		<MantineProvider theme={THEME} defaultColorScheme="dark">
			<Notifications />
			<Router />
		</MantineProvider>
	);
};

export default App;
