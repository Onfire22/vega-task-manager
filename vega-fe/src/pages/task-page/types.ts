import { z } from 'zod';
import { LogTimeFormValidation } from '@/pages/task-page/validation.ts';

export interface IInitialState {
	isModalShown: boolean;
}

export type TOption = { description: string | null; key: string; label: string; value: string; color: string };

export interface IExpDictData {
	id: string;
	label: string;
	key: string;
}

export interface ITimeLog {
	description: string;
	id: string;
	loggedTime?: string;
	createdAt: string;
	updatedAt?: string;
	user: {
		name: string;
		avatar: {
			initials: string;
			color: string;
		};
	};
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	assignee: string | null;
	description: string;
	project: {
		code: string;
		id: string;
		projectStatus: {
			key: string;
			label: string;
		};
	};
	remainingTime?: string;
	estimateTime?: string;
	totalLoggedTime?: string;
	estimateTimePercents: number | null;
	remainingTimePercents: number | null;
	totalLoggedTimePercents: number | null;
	reporter: string;
	taskPriority: IExpDictData;
	taskStack: IExpDictData;
	taskStatus: IExpDictData;
	createdAt: string;
	updatedAt: string;
}

export interface IComment {
	id: string;
	user: {
		name: string;
		userUuid: string;
		avatar: {
			color: string;
			initials: string;
		};
	};
	text: string;
	commentDate: string;
	commentEditedTime?: string;
}

export type TDictionariesWithColors = {
	taskType: Array<TOption>;
	taskPriority: Array<TOption>;
	taskStatus: Array<TOption>;
};

export type TFormOptions = z.infer<typeof LogTimeFormValidation>;

export type TTaskFields =
	| 'title'
	| 'taskStackUuid'
	| 'taskPriorityUuid'
	| 'taskStatusUuid'
	| 'assigneeUuid'
	| 'description';

export interface TField {
	fieldName: TTaskFields | '';
	value: string;
}

export type TTPayload = Record<string, { value: number; name: string }>;

export interface IChartData {
	value: number;
	name: string;
	fill: string;
	custom?: string;
}
