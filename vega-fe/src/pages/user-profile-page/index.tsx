import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { UserProfile } from './components/user-profile';

const UserProfilePage = () => {
	return (
		<>
			<PageContentWrapper offset={56}>
				<UserProfile />
			</PageContentWrapper>
		</>
	);
};

export { UserProfilePage };
