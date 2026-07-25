import { ProjectMembersView } from '@/pages/project-page/components/project-members/project-members.view.tsx';
import { useProjectDictionaries, useProjectUsers, useUsersWithFilters } from '@/pages/project-page/hooks.ts';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { OWNER_ROLE_UUID } from '@/pages/project-page/constants.ts';
import { setModalInfo } from '@/pages/project-page/slice.ts';
import { useUpdateUserRoleMutation } from '@/api/projects/projects.api.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';

const ProjectMembers = () => {
	const params = useParams();
	const dispatch = useAppDispatch();

	const [searchValue, setSearchValue] = useState('');

	const { usersList, canEdit, isProjectLoading } = useProjectUsers();

	const { usersListOptions } = useUsersWithFilters(searchValue);

	const { roleTypeOptions } = useProjectDictionaries();

	const [updateUserRole] = useUpdateUserRoleMutation();

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleUpdateUserRole = (userUuid: string, userRoleUuid: string) => {
		if (!params.uuid) return;
		if (userRoleUuid === OWNER_ROLE_UUID) {
			const userName = usersList.find((item) => item?.uuid === userUuid)?.userName;
			if (userName) {
				dispatch(setModalInfo({ userUuid, userRoleUuid, userName }));
			}

			return;
		}

		updateUserRole({ uuid: params.uuid, userUuid, userRoleUuid });
	};

	return isProjectLoading ? (
		<CustomLoader />
	) : (
		<ProjectMembersView
			usersList={usersList}
			canEdit={canEdit}
			searchValue={searchValue}
			usersListOptions={usersListOptions}
			roleTypeOptions={roleTypeOptions}
			onSearchChange={handleSearchChange}
			onUpdateUserRole={handleUpdateUserRole}
		/>
	);
};

export { ProjectMembers };
