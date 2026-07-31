import type { TeamsPresetsResponseSchema } from '@/api/teams/teams.validation.ts';
import { z } from 'zod';

export type TeamsPresetsResponse = z.infer<typeof TeamsPresetsResponseSchema>;
