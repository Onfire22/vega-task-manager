import { z } from 'zod';
import { LogTimeFormValidation } from '@/pages/task-page/validation.ts';

export type DictionaryKey = 'taskPriority' | 'taskType' | 'taskStatus';

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
	description: string | null;
	id: string;
	loggedTime: string;
	createdAt: string;
	updatedAt: string;
	user: {
		id: string;
		name: string;
		secondName: string;
	};
}

export interface ITask {
	id: string;
	code: string | null;
	title: string;
	assignee: string | null;
	description: string;
	estimateTime: string;
	remainingTime: string;
	totalLoggedTime: string;
	estimateTimeInSecs: number | null;
	remainingPercents: number | null;
	loggedPercents: number | null;
	project: {
		code: string;
		id: string;
		projectStatus: {
			key: string;
			label: string;
		};
	};
	timeLogs: Array<ITimeLog>;
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
	};
	text: string;
	commentDate: string;
}

export type TDictionariesWithColors = {
	taskType: Array<TOption>;
	taskPriority: Array<TOption>;
	taskStatus: Array<TOption>;
};

export type TFormOptions = z.infer<typeof LogTimeFormValidation>;

export type TTaskFields = 'title' | 'taskStack' | 'taskPriority' | 'taskStatus' | 'assignee' | 'description';

export interface TField {
	fieldName: TTaskFields | '';
	value: string;
}
