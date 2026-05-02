import { prismaAppClient } from '../../lib/prisma';
import { SEARCH_KEYS } from './global-search.constants';
import { commentsSelect, logsSelect, projectSelect, taskSelect, userSelect } from './global-search.selects';
import { getNormalizedResults } from './global-search.utils';

const getGlobalSearchResults = async (searchQuery: string) => {
	const tasks = await prismaAppClient.task.findMany({
		where: {
			OR: SEARCH_KEYS.tasks.map((key) => ({ [key]: { contains: searchQuery, mode: 'insensitive' } })),
		},
		select: taskSelect,
	});

	const projects = await prismaAppClient.project.findMany({
		where: {
			OR: SEARCH_KEYS.projects.map((key) => ({ [key]: { contains: searchQuery, mode: 'insensitive' } })),
		},
		select: projectSelect,
	});

	const users = await prismaAppClient.user.findMany({
		where: {
			OR: SEARCH_KEYS.users.map((key) => ({ [key]: { contains: searchQuery, mode: 'insensitive' } })),
		},
		select: userSelect,
	});

	const comments = await prismaAppClient.comment.findMany({
		where: {
			text: { contains: searchQuery },
		},
		select: commentsSelect,
	});

	const logs = await prismaAppClient.timeLog.findMany({
		where: {
			description: { contains: searchQuery },
		},
		select: logsSelect,
	});

	return getNormalizedResults({ tasks, projects, users, comments, logs });
};

export const globalSearchResultsService = { getGlobalSearchResults };
