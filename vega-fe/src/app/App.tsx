import { MantineProvider } from '@mantine/core';
import { Notifications } from '../modules/notifications';
import { Router } from '../router/Router.tsx';
import { theme } from './theme.ts';

const App = () => {
	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
			<Notifications />
			<Router />
		</MantineProvider>
	);
};

export default App;
