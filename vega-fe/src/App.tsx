import { Router } from './router/Router.tsx';
import { MantineProvider } from '@mantine/core';
import { Notifications } from './components/notifications';

const App = () => {
	return (
		<MantineProvider defaultColorScheme="light">
			<Notifications>
				<Router />
			</Notifications>
		</MantineProvider>
	);
};

export default App;
