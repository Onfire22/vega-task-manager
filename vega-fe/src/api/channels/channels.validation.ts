import { z } from 'zod';

export const ChannelsResponseSchema = z.object({
	channels: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			channelType: z.enum(['CHANNEL', 'PM']),
			channelVisibility: z.enum(['PUBLIC', 'PRIVATE']),
			users: z.array(
				z.object({
					id: z.string(),
					userName: z.string(),
					name: z.string(),
					secondName: z.string(),
					role: z.object({
						id: z.string(),
						key: z.string(),
						label: z.string(),
					}),
				}),
			),
		}),
	),
});
