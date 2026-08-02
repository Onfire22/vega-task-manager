import { FRONT_ROUTES } from '@/app/constants.ts';
import { Briefcase, Cog, FolderKanban, LogOut, MessageCircleCheck, TrendingUp, User } from 'lucide-react';

export const TOP_LINKS = [
	{
		href: FRONT_ROUTES.projects,
		label: 'Проекты',
		icon: FolderKanban,
		activeRoutes: ['project', 'projects'],
		permission: '',
	},
	{
		href: FRONT_ROUTES.dashboard,
		label: 'Задачи',
		icon: Briefcase,
		activeRoutes: ['task', 'dashboard'],
		permission: '',
	},
	{ href: FRONT_ROUTES.chat, label: 'Чат', icon: MessageCircleCheck, activeRoutes: ['chat'], permission: '' },
	{ href: '#', label: 'Статистика', icon: TrendingUp, activeRoutes: ['#'], permission: '' },
	{
		href: FRONT_ROUTES.superAdmin,
		label: 'SU настройки',
		icon: Cog,
		activeRoutes: ['chat'],
		permission: 'isSuperUser',
	},
];

export const BOTTOM_LINKS = [
	{ href: FRONT_ROUTES.profile, label: 'Профиль', icon: User, activeRoutes: ['profile'], permission: '' },
	{ href: 'logout', label: 'Выход', icon: LogOut, activeRoutes: [], permission: '' },
];
