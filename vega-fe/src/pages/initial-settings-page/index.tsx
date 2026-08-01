import { useState } from 'react';
import { InitialTeamsForm } from '@/pages/initial-settings-page/components/initial-teams-form/initial-teams-form.tsx';
import { InitialCompanyForm } from '@/pages/initial-settings-page/components/initial-company-form/initial-company-form.tsx';
import { GreetingsScreen } from '@/pages/initial-settings-page/components/greetings-screen/greetings-screen.tsx';
import type { TScreenTypes } from '@/pages/initial-settings-page/types.ts';

const screens = {
	greet: GreetingsScreen,
	company: InitialCompanyForm,
	teams: InitialTeamsForm,
};

const InitialSettingsPage = () => {
	const [screenType, setScreenType] = useState<TScreenTypes>('teams');

	const handleNextStepClick = (step: TScreenTypes) => {
		setScreenType(step);
	};

	const Component = screens[screenType as keyof typeof screens];

	return <Component onNextStepClick={handleNextStepClick} />;
};

export { InitialSettingsPage };
