import { Router } from './router/Router.tsx';
import { MantineProvider } from '@mantine/core';
import { Notifications } from './components/notifications';
import { THEME } from './shared/utils.ts';

const App = () => {
	console.log('test');
	return (
		<MantineProvider theme={THEME} defaultColorScheme="dark">
			<Notifications />
			<Router />
		</MantineProvider>
	);
};

export default App;
