import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { UserProfile } from './components/user-profile';
import { Header } from '../../components/header';

const UserProfilePage = () => {
	return (
		<>
			<Header menu />
			<PageContentWrapper offset={56}>
				<UserProfile />
			</PageContentWrapper>
		</>
	);
};

export { UserProfilePage };
