import { z } from 'zod';

export const ChannelsResponseSchema = z.object({
	channels: z.array(
		z.object({
			uuid: z.string(),
			title: z.string(),
			channelType: z.enum(['channel', 'pm']),
			channelVisibility: z.enum(['public', 'private']),
			users: z.array(
				z.object({
					uuid: z.string(),
					userName: z.string(),
					name: z.string(),
					secondName: z.string(),
					role: z.object({
						uuid: z.string(),
						key: z.string(),
						label: z.string(),
					}),
				}),
			),
		}),
	),
});
