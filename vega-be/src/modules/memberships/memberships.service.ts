import { prismaAppClient } from '../../lib/prisma';
import { AppError } from '../../errors/errors';
import { RESPONSE_STATUSES } from '../../constants';

const changeUserRole = async (userUuid: string, userRole: string, projectUuid: string) => {
	const memberRole = await prismaAppClient.dictionary.findUnique({
		where: { key_type: { key: userRole, type: 'ROLE_TYPE' } },
		select: { id: true },
	});

	if (!memberRole) {
		throw new AppError('Роль не найдена', RESPONSE_STATUSES.notFound);
	}

	await prismaAppClient.membership.upsert({
		where: { user_project: { projectUuid, userUuid } },
		update: {
			userRoleUuid: memberRole.id,
		},
		create: {
			userUuid,
			projectUuid,
			userRoleUuid: memberRole.id,
		},
	});
};

export const membershipsService = { changeUserRole };
