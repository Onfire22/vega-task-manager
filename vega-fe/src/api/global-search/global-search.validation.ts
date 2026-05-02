import { z } from 'zod';

export const GetGlobalSearchResponseSchema = z.object({
	results: z.object({
		projects: z.array(
			z.object({
				id: z.string(),
				code: z.string(),
				title: z.string(),
				link: z.string(),
			}),
		),
		tasks: z.array(
			z.object({
				id: z.string(),
				code: z.string(),
				title: z.string(),
				link: z.string(),
			}),
		),
		users: z.array(
			z.object({
				id: z.string(),
				link: z.string(),
				name: z.string(),
				email: z.string(),
				userName: z.string(),
			}),
		),
		comments: z.array(
			z.object({
				id: z.string(),
				text: z.string(),
				taskUuid: z.string(),
				link: z.string(),
			}),
		),
		logs: z.array(
			z.object({
				id: z.string(),
				description: z.string(),
				taskUuid: z.string(),
				link: z.string(),
			}),
		),
	}),
});
