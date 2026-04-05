import { ProjectView } from './project.view.tsx';
import { useProjectData, useProjectDictionaries, useUpdateProject } from '../../hooks.ts';
import { useLocation, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useUpdateUserRoleMutation } from '@/api/projects/projects.api.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';
import { useDebounce } from '@/app/utils.ts';
import { useUsersOptions } from '@/api/users/users.hooks.ts';

const Project = () => {
	const params = useParams();
	const location = useLocation();

	const [activeField, setActiveField] = useState<{ fieldName: string; value: string | null }>({
		fieldName: '',
		value: '',
	});

	const [activeTab, setActiveTab] = useState(location.state?.from ? 'tasks' : 'description');

	const [searchValue, setSearchValue] = useState('');

	const debauncedValue = useDebounce(searchValue, 1000);

	const { usersListOptions } = useUsersOptions({
		filters: {
			...(params.uuid ? { withOutProject: params.uuid } : {}),
			...(searchValue ? { search: debauncedValue } : {}),
		},
	});

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

	const handleUpdateUserRole = (userUuid: string, userRole: string) => {
		if (!params.uuid) return;

		updateUserRole({ uuid: params.uuid, userUuid, userRole });
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
