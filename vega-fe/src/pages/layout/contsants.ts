import { FRONT_ROUTES } from '../../app/constants.ts';
import { IconCalendarCheck, IconChartBar, IconLayoutGrid, IconLogout2, IconUser } from '@tabler/icons-react';

export const TOP_LINKS = [
	{ href: FRONT_ROUTES.projects, label: 'Проекты', icon: IconLayoutGrid },
	{ href: FRONT_ROUTES.dashboard, label: 'Задачи', icon: IconCalendarCheck },
	{ href: '#', label: 'Статистика', icon: IconChartBar },
];

export const BOTTOM_LINKS = [
	{ href: FRONT_ROUTES.profile, label: 'Профиль', icon: IconUser },
	{ href: 'logout', label: 'Выход', icon: IconLogout2 },
];

export const BREADCRUMBS = {
	profile: 'Профиль',
	projects: 'Проекты',
	dashboard: 'Задачи',
};
