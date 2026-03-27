import { UserInfo } from '@/pages/user-profile-page/components/user-info/user-info.tsx';
import { PersonalInfo } from '@/pages/user-profile-page/components/personal-info/personal-info.tsx';
import { PasswordInfo } from '@/pages/user-profile-page/components/password-info/password-info.tsx';

const UserProfileView = () => {
	return (
		<div className="w-full p-5 flex flex-col gap-3">
			<UserInfo />
			<PersonalInfo />
			<PasswordInfo />
		</div>
	);
};

export { UserProfileView };
