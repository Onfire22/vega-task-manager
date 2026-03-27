import { Toaster } from '@/components/ui/sonner.tsx';
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';

const Notifications = () => {
	return (
		<Toaster
			position="top-right"
			richColors
			icons={{
				success: <CircleCheckIcon className="w-5 h-5" />,
				info: <InfoIcon className="w-5 h-5" />,
				warning: <TriangleAlertIcon className="w-5 h-5" />,
				error: <OctagonXIcon className="w-5 h-5" />,
				loading: <Loader2Icon className="w-5 h-5 animate-spin" />,
			}}
		/>
	);
};

export { Notifications };
