import { InitialTeamsForm } from '@/pages/super-admin-settings-page/components/initial-teams-form/initial-teams-form.tsx';
import { useState } from 'react';
import { GreetingsScreen } from '@/pages/super-admin-settings-page/components/greetings-screen/greetings-screen.tsx';
import { InitialCompanyForm } from '@/pages/super-admin-settings-page/components/initial-company-form/initial-company-form.tsx';
import type { TScreenTypes } from '@/pages/super-admin-settings-page/types.ts';

const screens = {
	greet: GreetingsScreen,
	company: InitialCompanyForm,
	teams: InitialTeamsForm,
};

const SuperAdminSettingsPage = () => {
	const [screenType, setScreenType] = useState<TScreenTypes>('teams');

	const handleNextStepClick = (step: TScreenTypes) => {
		setScreenType(step);
	};

	const Component = screens[screenType as keyof typeof screens];

	return <Component onNextStepClick={handleNextStepClick} />;
};

export { SuperAdminSettingsPage };
