import { Prisma } from '../../generated/prisma/client';
import { commentsSelect, logsSelect, projectSelect, taskSelect, userSelect } from './global-search.selects';

export type TTaskType = Prisma.TaskGetPayload<{
	select: typeof taskSelect;
}>;

export type TProjectType = Prisma.ProjectGetPayload<{
	select: typeof projectSelect;
}>;

export type TUserType = Prisma.UserGetPayload<{
	select: typeof userSelect;
}>;

export type TCommentsType = Prisma.CommentGetPayload<{
	select: typeof commentsSelect;
}>;

export type TLogsType = Prisma.TimeLogGetPayload<{
	select: typeof logsSelect;
}>;

export type TSearchResults = {
	tasks: Array<TTaskType>;
	projects: Array<TProjectType>;
	users: Array<TUserType>;
	comments: Array<TCommentsType>;
	logs: Array<TLogsType>;
};
