import { ProjectSettingsView } from '@/pages/project-page/components/project-settings/project-settings.view.tsx';
import {
	useProjectData,
	useProjectDictionaries,
	useProjectProgress,
	useUpdateProject,
} from '@/pages/project-page/hooks.ts';
import { useState } from 'react';
import type { IField, TActiveFiled } from '@/pages/project-page/types.ts';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';

const ProjectSettings = () => {
	const [activeField, setActiveField] = useState<IField>({
		fieldName: '',
		value: '',
	});

	const { projectData, isProjectLoading } = useProjectData();

	const { projectProgress } = useProjectProgress();

	const { projectStatusOptions } = useProjectDictionaries();

	const { handleUpdateProject } = useUpdateProject();

	const handleProjectFieldChange = (fieldName: TActiveFiled, value: string | Date) => {
		handleUpdateProject(fieldName, value);
		setActiveField({ fieldName: '', value: '' });
	};

	const handleSetActiveFiled = (fieldName: string, value: string | null) => {
		setActiveField({ fieldName, value });
	};

	return isProjectLoading ? (
		<CustomLoader />
	) : (
		<ProjectSettingsView
			project={projectData}
			dictionariesOptions={projectStatusOptions}
			activeField={activeField}
			projectProgress={projectProgress}
			onProjectFieldChange={handleProjectFieldChange}
			onSetActiveFiled={handleSetActiveFiled}
		/>
	);
};

export { ProjectSettings };
