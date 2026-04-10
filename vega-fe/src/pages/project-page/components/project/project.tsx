import { ProjectView } from './project.view.tsx';
import { useProjectData, useProjectDictionaries, useUpdateProject, useUsersWithFilters } from '../../hooks.ts';
import { useLocation, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useUpdateUserRoleMutation } from '@/api/projects/projects.api.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { useDebounce } from '@/app/utils.ts';
import { OWNER_ROLE_UUID } from '@/pages/project-page/constants.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { setModalInfo } from '@/pages/project-page/slice.ts';

const Project = () => {
	const params = useParams();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const [activeField, setActiveField] = useState<{ fieldName: string; value: string | null }>({
		fieldName: '',
		value: '',
	});

	const [activeTab, setActiveTab] = useState(location.state?.from ? 'tasks' : 'description');

	const [searchValue, setSearchValue] = useState('');

	const debauncedValue = useDebounce(searchValue, 1000);

	const { usersListOptions } = useUsersWithFilters(debauncedValue, params.uuid);

	const { project, isProjectLoading, projectProgress } = useProjectData(params.uuid);

	const { roleTypeOptions, projectStatusOptions } = useProjectDictionaries();

	const [updateUserRole] = useUpdateUserRoleMutation();

	const { handleUpdateProject } = useUpdateProject(params.uuid);

	const handleTabClick = (tab: string | null) => {
		if (tab) {
			setActiveTab(tab);
		}
	};

	const handleSetActiveFiled = (fieldName: string, value: string | null) => {
		setActiveField({ fieldName, value });
	};

	const handleProjectFieldChange = (fieldName: 'deadlineDate' | 'projectStatusUuid', value: string | Date) => {
		handleUpdateProject(fieldName, value);
		setActiveField({ fieldName: '', value: '' });
	};

	const handleUpdateUserRole = (userUuid: string, userRoleUuid: string) => {
		if (!params.uuid) return;
		if (userRoleUuid === OWNER_ROLE_UUID) {
			const userName = project?.users.find((item) => item?.id === userUuid)?.userName;
			if (userName) {
				dispatch(setModalInfo({ userUuid, userRoleUuid, userName }));
			}

			return;
		}

		updateUserRole({ uuid: params.uuid, userUuid, userRoleUuid });
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return isProjectLoading ? (
		<CustomLoader />
	) : (
		<ProjectView
			project={project}
			activeTab={activeTab}
			dictionariesOptions={projectStatusOptions}
			roleTypeOptions={roleTypeOptions}
			projectProgress={projectProgress}
			usersListOptions={usersListOptions}
			activeField={activeField}
			searchValue={searchValue}
			onTabClick={handleTabClick}
			onSearchChange={handleSearchChange}
			onSetActiveFiled={handleSetActiveFiled}
			onProjectFieldChange={handleProjectFieldChange}
			onUpdateUserRole={handleUpdateUserRole}
		/>
	);
};

export { Project };
