import { InitialTeamsForm } from '@/pages/initial-settings-page/components/initial-teams-form/initial-teams-form.tsx';
import { InitialCompanyForm } from '@/pages/initial-settings-page/components/initial-company-form/initial-company-form.tsx';
import { GreetingsScreen } from '@/pages/initial-settings-page/components/greetings-screen/greetings-screen.tsx';
import type { TScreenTypes } from '@/pages/initial-settings-page/types.ts';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const screens = {
	greet: GreetingsScreen,
	company: InitialCompanyForm,
	teams: InitialTeamsForm,
};

const InitialSettingsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const step = searchParams.get('step');
		if (!step) {
			setSearchParams({ step: 'greet' }, { replace: true });
		}
	}, [searchParams, setSearchParams]);

	const handleNextStepClick = (step: TScreenTypes) => {
		setSearchParams({ step });
	};

	const Component = screens[searchParams.get('step') as keyof typeof screens];

	return Component && <Component onNextStepClick={handleNextStepClick} />;
};

export { InitialSettingsPage };
