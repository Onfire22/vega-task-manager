import { ProjectWithDetails, TProjectTasks } from './projects.types';

export const getProjectProgress = (tasks: Array<TProjectTasks>) => {
	const completedTasks = tasks.filter((task) => task.taskStatus.key === 'done').length;
	const allTasks = tasks.length;

	if (!completedTasks || !allTasks) return 0;

	return (completedTasks / allTasks) * 100;
};

export const normalizeProject = (project: ProjectWithDetails) => {
	const { memberships, ...rest } = project;
	return {
		...rest,
		users: memberships.map((item) => {
			return {
				...item.user,
				role: item.userRole,
			};
		}),
	};
};

export const normalizeProjectsList = (projects: Array<ProjectWithDetails>) => {
	return projects.map((item) => {
		const project = normalizeProject(item);

		const { tasks, ...rest } = project;

		const projectProgress = getProjectProgress(tasks);

		return {
			...rest,
			projectProgress,
			tasksCount: tasks.length,
		};
	});
};
