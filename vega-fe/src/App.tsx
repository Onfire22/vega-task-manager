import { MantineProvider } from '@mantine/core';
import { Notifications } from './components/notifications';
import { THEME } from './utils.ts';
import { Layout } from './pages/layout';

const App = () => {
	return (
		<MantineProvider theme={THEME} defaultColorScheme="dark">
			<Notifications />
			<Layout />
		</MantineProvider>
	);
};

export default App;
