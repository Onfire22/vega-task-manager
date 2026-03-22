import { ProjectView } from './project-view';
import { useProjectData, useUpdateProject } from '../../hooks.ts';
import { useLocation, useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { useState } from 'react';
import { useUsersOptions } from '../../../../api/hooks.ts';
import { useUpdateUserRoleMutation } from '../../../../api/queries/projects.api.ts';

const Project = () => {
	const params = useParams();
	const location = useLocation();

	const [activeField, setActiveField] = useState<{ fieldName: string; value: string | null }>({
		fieldName: '',
		value: '',
	});

	const [activeTab, setActiveTab] = useState(location.state?.from ? 'tasks' : 'description');

	const { usersListOptions } = useUsersOptions({
		filters: { ...(params.uuid ? { withOutProject: params.uuid } : {}) },
	});

	const { project, isProjectLoading, dictionariesOptions, projectProgress } = useProjectData(params.uuid);

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

	const handleProjectFieldChange = (fieldName: 'deadlineDate' | 'projectStatusUuid', value: string) => {
		handleUpdateProject(fieldName, value);
		setActiveField({ fieldName: '', value: '' });
	};

	const handleUpdateUserRole = (userUuid: string, userRole: string) => {
		if (!params.uuid) return;

		updateUserRole({ uuid: params.uuid, userUuid, userRole });
	};

	return isProjectLoading ? (
		<Loader />
	) : (
		<ProjectView
			project={project}
			activeTab={activeTab}
			dictionariesOptions={dictionariesOptions.projectStatus}
			projectProgress={projectProgress}
			usersListOptions={usersListOptions}
			activeField={activeField}
			onTabClick={handleTabClick}
			onSetActiveFiled={handleSetActiveFiled}
			onProjectFieldChange={handleProjectFieldChange}
			onUpdateUserRole={handleUpdateUserRole}
		/>
	);
};

export { Project };
