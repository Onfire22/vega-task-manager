import { prismaAppClient } from '../../lib/prisma';
import { TCreateCommentBody } from './comments.types';

const getComments = (taskUuid: string) => {
	return prismaAppClient.comment.findMany({
		where: { taskUuid },
		select: {
			id: true,
			text: true,
			createdAt: true,
			updatedAt: true,
			author: {
				select: {
					id: true,
					name: true,
					secondName: true,
				},
			},
		},
	});
};

const createComment = (authorUuid: string, comment: TCreateCommentBody) => {
	return prismaAppClient.comment.create({
		data: {
			...comment,
			authorUuid,
		},
	});
};

const updateComment = (commentId: string, text: string) => {
	return prismaAppClient.comment.update({
		where: { id: commentId },
		data: { text },
	});
};

const deleteComment = (commentId: string) => {
	return prismaAppClient.comment.delete({ where: { id: commentId } });
};

export const commentsService = {
	getComments,
	createComment,
	updateComment,
	deleteComment,
};
