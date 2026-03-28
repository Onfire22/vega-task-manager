import { UserInfoView } from '@/pages/user-profile-page/components/user-info/user-info.view.tsx';
import { useUserInfo } from '@/pages/user-profile-page/hooks.ts';

const UserInfo = () => {
	const { userData, isLoading } = useUserInfo();

	return isLoading ? <div>Loading</div> : <UserInfoView userData={userData} />;
};

export { UserInfo };
