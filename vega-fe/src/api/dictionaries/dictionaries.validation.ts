import { z } from 'zod';

export const DictionarySchema = z.array(
	z.object({
		id: z.string(),
		label: z.string(),
		key: z.string(),
		description: z.string().nullable(),
	}),
);

export const DictionariesResponseSchema = z.object({
	dictionaries: z.object({
		taskPriority: DictionarySchema.optional(),
		taskStatus: DictionarySchema.optional(),
		taskType: DictionarySchema.optional(),
		roleType: DictionarySchema.optional(),
		userSpecialisation: DictionarySchema.optional(),
		projectStatus: DictionarySchema.optional(),
	}),
});
