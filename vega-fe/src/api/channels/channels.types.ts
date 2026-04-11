import { z } from 'zod';
import type { ChannelsResponseSchema } from '@/api/channels/channels.validation.ts';

export type ChannelsResponse = z.infer<typeof ChannelsResponseSchema>;
