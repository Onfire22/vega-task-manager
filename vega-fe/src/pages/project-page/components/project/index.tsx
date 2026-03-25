import { ProjectView } from './project-view';
import { useProjectData, useUpdateProject } from '../../hooks.ts';
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useUsersOptions } from '../../../../api/hooks.ts';
import { useUpdateUserRoleMutation } from '../../../../api/queries/projects.api.ts';
import { CustomLoader } from '@/components/common/custom-loader.tsx';

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

	const { project, isProjectLoading, options, projectProgress } = useProjectData(params.uuid);

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

	return isProjectLoading ? (
		<CustomLoader />
	) : (
		<ProjectView
			project={project}
			activeTab={activeTab}
			dictionariesOptions={options}
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
