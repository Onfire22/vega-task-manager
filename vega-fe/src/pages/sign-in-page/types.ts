import { z } from 'zod';
import { SignUpValidationSchema } from '@/pages/sign-in-page/validation.ts';

export type TSignInFormFormValues = z.infer<typeof SignUpValidationSchema>;
