import { z } from 'zod';
import { CreateProjectValidationSchema, CreateTaskValidationSchema } from '@/modules/modals/validation.ts';

export interface IInitialState {
	activeModal: TActiveModal;
}

export interface ISelectType {
	value: string;
	label: string;
	description?: string;
	color?: string;
}

export type TActiveModal = 'project' | 'task' | null;

export type TTaskFormValues = z.infer<typeof CreateTaskValidationSchema>;

export type TProjectValues = z.infer<typeof CreateProjectValidationSchema>;
