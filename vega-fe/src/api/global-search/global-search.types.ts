import { z } from 'zod';
import { GetGlobalSearchResponseSchema } from '@/api/global-search/global-search.validation.ts';

export type TGlobalSearchResponse = z.infer<typeof GetGlobalSearchResponseSchema>;
