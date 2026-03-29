import { z } from 'zod';

export const ChangeUserMembershipParamsSchema = z.object({
	uuid: z.string(),
});

export const ChangeUserMembershipBodySchema = z.object({
	userUuid: z.string(),
	userRole: z.enum(['viewer', 'member', 'owner']),
});
