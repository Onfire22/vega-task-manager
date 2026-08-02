import { z } from 'zod';

export const TeamsPresetsResponseSchema = z.object({
	badgeName: z.string(),
	fullName: z.string(),
	avatarPath: z.string(),
});
