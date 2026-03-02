import type { TDictionariesTypes } from '../../api/types.ts';
import { FRONT_ROUTES } from '../../constants.ts';
import { IconClipboardCopy, IconSitemap, IconUserCog } from '@tabler/icons-react';

export const TASK_FORM_INITIAL_VALUES = {
	title: '',
	description: '',
	taskStackUuid: '',
	taskPriorityUuid: '',
};

export const PROJECT_FORM_INITIAL_VALUES = {
	title: '',
	description: '',
	usersUuids: [],
};

export const BASE_DICTIONARIES_META: TDictionariesTypes[] = ['TASK_PRIORITY', 'STACK_TYPE', 'TASK_STATUS'];

export const HEADERLESS_PAGES = ['/sign-up', '/sign-in'];

export const LINKS = [
	{ href: FRONT_ROUTES.profile, label: 'Профиль', color: 'teal', icon: IconUserCog },
	{ href: FRONT_ROUTES.root, label: 'Задачи', color: 'teal', icon: IconClipboardCopy },
	{ href: FRONT_ROUTES.projects, label: 'Проекты', color: 'teal', icon: IconSitemap },
];
