import { ChangeUserMembershipBodySchema, ChangeUserMembershipParamsSchema } from './memberships.validation';
import { z } from 'zod';

export type TChangeUserMembershipParams = z.infer<typeof ChangeUserMembershipParamsSchema>;

export type TChangeUserMembershipBody = z.infer<typeof ChangeUserMembershipBodySchema>;
