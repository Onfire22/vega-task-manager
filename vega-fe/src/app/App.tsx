import { Router } from '../router/Router.tsx';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';
import { Notifications } from '@/components/common/shared/notifications.tsx';

const App = () => {
	return (
		<>
			<TooltipProvider>
				<Router />
			</TooltipProvider>
			<Notifications />
		</>
	);
};

export default App;
