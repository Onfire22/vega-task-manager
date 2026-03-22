import { MantineProvider } from '@mantine/core';
import { Notifications } from '../modules/notifications';
import { Router } from '../router/Router.tsx';
import { theme } from './theme.ts';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';

const App = () => {
	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
			<TooltipProvider>
				<Notifications />
				<Router />
			</TooltipProvider>
		</MantineProvider>
	);
};

export default App;
