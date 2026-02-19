import { PageContentWrapper } from '../../components/page-content-wrapper.tsx';
import { useAppSelector } from '../../store/hooks.ts';
import { getActiveFormSelector } from './selectors.ts';
import { component } from './components/active-form';
import { useMemo } from 'react';

const SignUpPage = () => {
	const activeForm = useAppSelector(getActiveFormSelector());

	const CurrentForm = useMemo(() => component[activeForm], [activeForm]);

	return (
		<PageContentWrapper>
			<CurrentForm />
		</PageContentWrapper>
	);
};

export { SignUpPage };
