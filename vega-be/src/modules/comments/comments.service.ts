import { prismaAppClient } from '../../lib/prisma';
import { TCreateCommentBody } from './comments.types';
import { isDateEquals } from '../../common/utils';

const getComments = async (taskUuid: string) => {
	const comments = await prismaAppClient.comment.findMany({
		where: { taskUuid },
		select: {
			uuid: true,
			text: true,
			createdAt: true,
			updatedAt: true,
			author: {
				select: {
					uuid: true,
					name: true,
					secondName: true,
					avatarUrl: true,
				},
			},
		},
	});

	return comments.map((comment) => {
		const { updatedAt, ...rest } = comment;

		return {
			...rest,
			...(!isDateEquals(comment.createdAt, updatedAt) ? { updatedAt } : {}),
		};
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
		where: { uuid: commentId },
		data: { text },
	});
};

const deleteComment = (commentId: string) => {
	return prismaAppClient.comment.delete({ where: { uuid: commentId } });
};

export const commentsService = {
	getComments,
	createComment,
	updateComment,
	deleteComment,
};
