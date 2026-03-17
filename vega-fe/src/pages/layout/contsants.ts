import { FRONT_ROUTES } from '../../app/constants.ts';
import { IconCalendarCheck, IconChartBar, IconLayoutGrid, IconLogout2, IconUser } from '@tabler/icons-react';

export const TOP_LINKS = [
	{ href: FRONT_ROUTES.projects, label: 'Проекты', icon: IconLayoutGrid, activeRoutes: ['project', 'projects'] },
	{ href: FRONT_ROUTES.dashboard, label: 'Задачи', icon: IconCalendarCheck, activeRoutes: ['task', 'dashboard'] },
	{ href: '#', label: 'Статистика', icon: IconChartBar, activeRoutes: ['#'] },
];

export const BOTTOM_LINKS = [
	{ href: FRONT_ROUTES.profile, label: 'Профиль', icon: IconUser, activeRoutes: ['profile'] },
	{ href: 'logout', label: 'Выход', icon: IconLogout2, activeRoutes: [] },
];
