import { MantineProvider } from '@mantine/core';
import { Notifications } from './modules/notifications';
import { THEME } from './utils.ts';
import { Router } from './router/Router.tsx';

const App = () => {
	return (
		<MantineProvider theme={THEME} defaultColorScheme="dark">
			<Notifications />
			<Router />
		</MantineProvider>
	);
};

export default App;
