import { Grid2x2, TableOfContents } from 'lucide-react';

export const DATE_FORMAT = 'dd.MM.yyyy';

export const PLURAL_OPTIONS = {
	one: 'задача',
	few: 'задачи',
	many: 'задач',
};

export const TABS = [
	{ text: 'Таблица', value: 'table', icon: TableOfContents },
	{ text: 'Карточки', value: 'cards', icon: Grid2x2 },
];
