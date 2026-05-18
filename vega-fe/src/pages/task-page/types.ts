import { z } from 'zod';
import { LogTimeFormValidation } from '@/pages/task-page/validation.ts';

export type TModalType = 'links' | 'estimate' | null;

export interface IInitialState {
	modalType: TModalType;
	taskField: TField;
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
			avatarUrl: string | null;
		};
	};
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	assignee: string | null;
	assigneeUuid?: string | null;
	mrLinks?: Array<string>;
	buildLinks?: Array<string>;
	description: string;
	project: {
		code: string;
		id: string;
		projectStatus: {
			key: string;
			label: string;
		};
	};
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
			avatarUrl: string | null;
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

export interface ILogData {
	value: number;
	name: string;
	fill: string;
	custom?: string;
}

export interface IChartData {
	remainingTime?: string;
	estimateTime?: string;
	totalLoggedTime?: string;
	estimateTimePercents: number | null;
	remainingTimePercents: number | null;
	totalLoggedTimePercents: number | null;
	logData: Array<ILogData>;
}

export interface ILinksForm {
	mrLinks?: string;
	buildLinks?: string;
}

export interface IOption {
	label: string;
	value: string;
}
